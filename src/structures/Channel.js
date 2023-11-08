'use strict';

const Base = require('./Base');
const Message = require('./Message');

/**
 * Channel ID structure
 * @typedef {Object} ChannelId
 * @property {string} server
 * @property {string} user
 * @property {string} _serialized
 */

/**
 * Represents a Channel on WhatsApp
 * @extends {Base}
 */
class Channel extends Base {
    constructor(client, data) {
        super(client);

        if (data) this._patch(data);
    }

    _patch(data) {
        this.channelMetadata = data.channelMetadata;

        /**
         * ID that represents the channel
         * @type {ChannelId}
         */
        this.id = data.id;

        /**
         * Title of the channel
         * @type {string}
         */
        this.name = data.name;

        /** 
         * The channel description
         * @type {string}
         */
        this.description = data.description;

        /**
         * Indicates if it is a Channel
         * @type {boolean}
         */
        this.isChannel = data.isChannel;

        /**
         * Indicates if it is a Group
         * @type {boolean}
         */
        this.isGroup = data.isGroup;

        /**
         * Indicates if the channel is readonly
         * @type {boolean}
         */
        this.isReadOnly = data.isReadOnly;

        /**
         * Amount of messages unread
         * @type {number}
         */
        this.unreadCount = data.unreadCount;

        /**
         * Unix timestamp for when the last activity occurred
         * @type {number}
         */
        this.timestamp = data.t;

        /**
         * Indicates if the channel is muted or not
         * @type {boolean}
         */
        this.isMuted = data.isMuted;

        /**
         * Unix timestamp for when the mute expires
         * @type {number}
         */
        this.muteExpiration = data.muteExpiration;

        /**
         * Last message in the channel
         * @type {Message}
         */
        this.lastMessage = data.lastMessage ? new Message(super.client, data.lastMessage) : undefined;

        return super._patch(data);
    }

    /** Enum for sort field property in {@link Client.searchChannels} */
    static SortField = {
        CREATION_TIME: 'creation_time',
        SUBSCRIBERS: 'subscribers'
    };

    /** Enum for sort order property in {@link Client.searchChannels} */
    static SortOrder = {
        DESCENDING: 'desc',
        ASCENDING: 'asc'
    };

    /** Enum for view type property in {@link Client.searchChannels} */
    static ViewType = {
        RECOMMENDED: 'RECOMMENDED',
        MOST_ACTIVE: 'TRENDING',
        POPULAR: 'POPULAR',
        NEW: 'NEW',
        FEATURED: 'FEATURED'
    };

    /**
     * Updates the channel subject
     * @param {string} newSubject 
     * @returns {Promise<boolean>} Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.
     */
    async setSubject(newSubject) {
        const success = await this._setChannelMetadata({ name: newSubject }, { editName: true });
        success && (this.name = newSubject);
        return success;
    }

    /**
     * Updates the channel description
     * @param {string} newDescription 
     * @returns {Promise<boolean>} Returns true if the operation completed successfully, false otherwise
     */
    async setDescription(newDescription) {
        const success = await this._setChannelMetadata({ description: newDescription }, { editDescription: true });
        success && (this.description = newDescription);
        return success;
    }

    /**
     * Updates the channel profile picture
     * @param {MessageMedia} newProfilePicture 
     * @returns {Promise<boolean>} Returns true if the operation completed successfully, false otherwise
     */
    async setProfilePicture(newProfilePicture) {
        return await this._setChannelMetadata({ picture: newProfilePicture }, { editPicture: true });
    }

    /**
     * Updates available reactions to use in the channel
     * 
     * Valid values for passing to the method are:
     * 0 for ALL reactions to be available
     * 1 for BASIC reactions to be available: 👍, ❤️, 😂, 😮, 😢, 🙏
     * 3 for NONE reactions to be avaliable
     * @param {number} reactionCode 
     * @returns {Promise<boolean>} Returns true if the operation completed successfully, false otherwise
     */
    async setReactionSetting(reactionCode) {
        if (reactionCode === 2) return false;
        const success = await this._setChannelMetadata(
            { reactionCodesSetting: reactionCode },
            { editReactionCodesSetting: true }
        );
        success && (this.channelMetadata.reactionCodesSetting = reactionCode);
        return success;
    }

    /**
     * Message options
     * @typedef {Object} MessageSendOptions
     * @property {?string} caption Image or video caption
     * @property {?string[]} mentions User IDs of user that will be mentioned in the message
     * @property {?MessageMedia} media Image or video to be sent
     */

    /**
     * Sends a message to this channel
     * @param {string|MessageMedia} content
     * @param {?MessageSendOptions} options
     * @returns {Promise<Message>} Message that was just sent
     */
    async sendMessage(content, options) {
        return this.client.sendMessage(this.id._serialized, content, options);
    }

    /**
     * Deletes the channel you created
     * @returns {Promise<boolean>} Returns true if the operation completed successfully, false otherwise
     */
    async deleteChannel() {
        return await this.client.pupPage.evaluate(async (channelId) => {
            const channel = await window.WWebJS.getChatOrChannel(channelId, { getAsModel: false });
            if (!channel) return false;
            try {
                await window.Store.ChannelUtils.deleteNewsletterAction(channel);
                return true;
            } catch (err) {
                if (err.name === 'ServerStatusCodeError') return false;
                throw err;
            }
        }, this.id._serialized);
    }

    /**
     * Internal method to change the channel metadata
     * @param {string|number|MessageMedia} value The new value to set
     * @param {string} property The property of a channel metadata to change
     * @returns {Promise<boolean>} Returns true if the operation completed successfully, false otherwise
     */
    async _setChannelMetadata(value, property) {
        return await this.client.pupPage.evaluate(async (channelId, value, property) => {
            const channel = await window.WWebJS.getChatOrChannel(channelId, { getAsModel: false });
            if (!channel) return false;
            if (property.editPicture) {
                value.picture = value.picture
                    ? await window.WWebJS.cropAndResizeImage(value.picture, {
                        asDataUrl: true,
                        mimetype: 'image/jpeg',
                        size: 640,
                        quality: 1
                    })
                    : null;
            }
            try {
                await window.Store.ChannelUtils.editNewsletterMetadataAction(channel, property, value);
                return true;
            } catch (err) {
                if (err.name === 'ServerStatusCodeError') return false;
                throw err;
            }
        }, this.id._serialized, value, property);
    }
}

module.exports = Channel;