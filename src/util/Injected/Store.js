'use strict';

exports.ExposeStore = () => {
    window.Store = Object.assign({}, window.require('WAWebCollections'));
    window.Store.AppState = window.require('WAWebSocketModel').Socket;
    window.Store.BlockContact = window.require('WAWebBlockContactAction');
    window.Store.Conn = window.require('WAWebConnModel').Conn;
    window.Store.Cmd = window.require('WAWebCmd').Cmd;
    window.Store.DownloadManager = window.require('WAWebDownloadManager').downloadManager;
    window.Store.GroupQueryAndUpdate = window.require('WAWebGroupQueryJob').queryAndUpdateGroupMetadataById;
    window.Store.MediaPrep = window.require('WAWebPrepRawMedia');
    window.Store.MediaObject = window.require('WAWebMediaStorage');
    window.Store.MediaTypes = window.require('WAWebMmsMediaTypes');
    window.Store.MediaUpload = window.require('WAWebMediaMmsV4Upload');
    window.Store.MsgKey = window.require('WAWebMsgKey');
    window.Store.NumberInfo = window.require('WAPhoneUtils');
    window.Store.OpaqueData = window.require('WAWebMediaOpaqueData');
    window.Store.QueryProduct = window.require('WAWebBizProductCatalogBridge');
    window.Store.QueryOrder = window.require('WAWebBizOrderBridge');
    window.Store.SendClear = window.require('WAWebChatClearBridge');
    window.Store.SendDelete = window.require('WAWebDeleteChatAction');
    window.Store.SendMessage = window.require('WAWebSendMsgChatAction');
    window.Store.EditMessage = window.require('WAWebSendMessageEditAction');
    window.Store.SendSeen = window.require('WAWebUpdateUnreadChatAction');
    window.Store.User = window.require('WAWebUserPrefsMeUser');
    window.Store.ContactMethods = window.require('WAWebContactGetters');
    window.Store.UploadUtils = window.require('WAWebUploadManager');
    window.Store.UserConstructor = window.require('WAWebWid');
    window.Store.Validators = window.require('WALinkify');
    window.Store.VCard = window.require('WAWebFrontendVcardUtils');
    window.Store.WidFactory = window.require('WAWebWidFactory');
    window.Store.ProfilePic = window.require('WAWebContactProfilePicThumbBridge');
    window.Store.PresenceUtils = window.require('WAWebPresenceChatAction');
    window.Store.ChatState = window.require('WAWebChatStateBridge');
    window.Store.findCommonGroups = window.require('WAWebFindCommonGroupsContactAction').findCommonGroups;
    window.Store.StatusUtils = window.require('WAWebContactStatusBridge');
    window.Store.ConversationMsgs = window.require('WAWebChatLoadMessages');
    window.Store.sendReactionToMsg = window.require('WAWebSendReactionMsgAction').sendReactionToMsg;
    window.Store.createOrUpdateReactionsModule = window.require('WAWebDBCreateOrUpdateReactions');
    window.Store.EphemeralFields = window.require('WAWebGetEphemeralFieldsMsgActionsUtils');
    window.Store.MsgActionChecks = window.require('WAWebMsgActionCapability');
    window.Store.QuotedMsg = window.require('WAWebQuotedMsgModelUtils');
    window.Store.LinkPreview = window.require('WAWebLinkPreviewChatAction');
    window.Store.Socket = window.require('WADeprecatedSendIq');
    window.Store.SocketWap = window.require('WAWap');
    window.Store.SearchContext = window.require('WAWebChatMessageSearch').getSearchContext;
    window.Store.DrawerManager = window.require('WAWebDrawerManager').DrawerManager;
    window.Store.LidUtils = window.require('WAWebApiContact');
    window.Store.WidToJid = window.require('WAWebWidToJid');
    window.Store.JidToWid = window.require('WAWebJidToWid');
    window.Store.getMsgInfo = window.require('WAWebApiMessageInfoStore').queryMsgInfo;
    window.Store.pinUnpinMsg = window.require('WAWebSendPinMessageAction').sendPinInChatMsg;
    window.Store.QueryExist = window.require('WAWebQueryExistsJob').queryWidExists;
    window.Store.ReplyUtils = window.require('WAWebMsgReply');
    window.Store.Settings = window.require('WAWebUserPrefsGeneral');
    
    window.Store.ForwardUtils = {
        ...window.require('WAWebForwardMessagesToChat')
    };

    window.Store.StickerTools = {
        ...window.require('WAWebImageUtils'),
        ...window.require('WAWebAddWebpMetadata')
    };
    window.Store.GroupUtils = {
        ...window.require('WAWebGroupCreateJob'),
        ...window.require('WAWebGroupModifyInfoJob'),
        ...window.require('WAWebExitGroupAction'),
        ...window.require('WAWebContactProfilePicThumbBridge')
    };
    window.Store.GroupParticipants = {
        ...window.require('WAWebModifyParticipantsGroupAction'),
        ...window.require('WASmaxGroupsAddParticipantsRPC')
    };
    window.Store.GroupInvite = {
        ...window.require('WAWebGroupInviteJob'),
        ...window.require('WAWebGroupQueryJob')
    };
    window.Store.GroupInviteV4 = {
        ...window.require('WAWebGroupInviteV4Job'),
        ...window.require('WAWebChatSendMessages')
    };
    window.Store.MembershipRequestUtils = {
        ...window.require('WAWebApiMembershipApprovalRequestStore'),
        ...window.require('WASmaxGroupsMembershipRequestsActionRPC')
    };

    window.Store.ChannelUtils = {
        ...window.require('WAWebLoadNewsletterPreviewChatAction'),
        ...window.require('WAWebNewsletterMetadataQueryJob'),
        ...window.require('WAWebNewsletterCreateJob'),
        ...window.require('WAWebNewsletterCreateQueryJob'),
        ...window.require('WAWebEditNewsletterMetadataAction'),
        ...window.require('WAWebNewsletterDeleteAction'),
        ...window.require('WAWebNewsletterSubscribeAction'),
        ...window.require('WAWebNewsletterDirectorySearchAction'),
        ...window.require('WAWebMexMuteNewsletterJob'),
        ...window.require('WAWebMexUnmuteNewsletterJob'),
        ...window.require('WAWebMexAcceptNewsletterAdminInviteJob'),
        ...window.require('WAWebMexRevokeNewsletterAdminInviteJob'),
        ...window.require('WAWebDemoteNewsletterAdminAction'),
        countryCodesIso: {
            'AC': 'Ascension Island',
            'AD': 'Andorra',
            'AE': 'الإمارات العربية المتحدة',
            'AF': 'افغانستان',
            'AG': 'Antigua & Barbuda',
            'AI': 'Anguilla',
            'AL': 'Shqipëri',
            'AM': 'Հայաստան',
            'AO': 'Angola',
            'AR': 'Argentina',
            'AS': 'American Samoa',
            'AT': 'Österreich',
            'AU': 'Australia',
            'AW': 'Aruba',
            'AX': 'Åland',
            'AZ': 'Azərbaycan',
            'BA': 'Bosna i Hercegovina',
            'BB': 'Barbados',
            'BD': 'বাংলাদেশ',
            'BE': 'België',
            'BF': 'Burkina Faso',
            'BG': 'България',
            'BH': 'البحرين',
            'BI': 'Burundi',
            'BJ': 'Bénin',
            'BL': 'Saint-Barthélemy',
            'BM': 'Bermuda',
            'BN': 'Brunei',
            'BO': 'Bolivia',
            'BQ': 'Caribisch Nederland',
            'BR': 'Brasil',
            'BS': 'Bahamas',
            'BT': 'འབྲུག',
            'BW': 'Botswana',
            'BY': 'Беларусь',
            'BZ': 'Belize',
            'CA': 'Canada',
            'CC': 'Kepulauan Cocos (Keeling)',
            'CD': 'Congo-Kinshasa',
            'CF': 'République centrafricaine',
            'CG': 'Congo-Brazzaville',
            'CH': 'Schweiz',
            'CI': 'Côte d’Ivoire',
            'CK': 'Cook Islands',
            'CL': 'Chile',
            'CM': 'Cameroon',
            'CN': '中国',
            'CO': 'Colombia',
            'CR': 'Costa Rica',
            'CU': 'Cuba',
            'CV': 'Cabo Verde',
            'CW': 'Curaçao',
            'CX': 'Christmas Island',
            'CY': 'Κύπρος',
            'CZ': 'Česko',
            'DE': 'Deutschland',
            'DJ': 'Djibouti',
            'DK': 'Danmark',
            'DM': 'Dominica',
            'DO': 'República Dominicana',
            'DZ': 'الجزائر',
            'EC': 'Ecuador',
            'EE': 'Eesti',
            'EG': 'مصر',
            'ER': 'إريتريا',
            'ES': 'España',
            'ET': 'ኢትዮጵያ',
            'FI': 'Suomi',
            'FJ': 'Fiji',
            'FK': 'Falkland Islands',
            'FM': 'Micronesia',
            'FO': 'Føroyar',
            'FR': 'France',
            'GA': 'Gabon',
            'GB': 'United Kingdom',
            'GD': 'Grenada',
            'GE': 'საქართველო',
            'GF': 'Guyane française',
            'GG': 'Guernsey',
            'GH': 'Ghana',
            'GI': 'Gibraltar',
            'GL': 'Kalaallit Nunaat',
            'GM': 'Gambia',
            'GN': 'Guinée',
            'GP': 'Guadeloupe',
            'GQ': 'Guinea Ecuatorial',
            'GR': 'Ελλάδα',
            'GT': 'Guatemala',
            'GU': 'Guam',
            'GW': 'Guiné-Bissau',
            'GY': 'Guyana',
            'HK': '中國香港特別行政區',
            'HN': 'Honduras',
            'HR': 'Hrvatska',
            'HT': 'Haïti',
            'HU': 'Magyarország',
            'ID': 'Indonesia',
            'IE': 'Ireland',
            'IL': 'ישראל',
            'IM': 'Isle of Man',
            'IN': 'India',
            'IO': 'British Indian Ocean Territory',
            'IQ': 'العراق',
            'IR': 'ایران',
            'IS': 'Ísland',
            'IT': 'Italia',
            'JE': 'Jersey',
            'JM': 'Jamaica',
            'JO': 'الأردن',
            'JP': '日本',
            'KE': 'Kenya',
            'KG': 'Кыргызстан',
            'KH': 'កម្ពុជា',
            'KI': 'Kiribati',
            'KM': 'جزر القمر',
            'KN': 'St. Kitts & Nevis',
            'KP': '조선민주주의인민공화국',
            'KR': '대한민국',
            'KW': 'الكويت',
            'KY': 'Cayman Islands',
            'KZ': 'Қазақстан',
            'LA': 'ລາວ',
            'LB': 'لبنان',
            'LC': 'St. Lucia',
            'LI': 'Liechtenstein',
            'LK': 'ශ්‍රී ලංකාව',
            'LR': 'Liberia',
            'LS': 'Lesotho',
            'LT': 'Lietuva',
            'LU': 'Lëtzebuerg',
            'LV': 'Latvija',
            'LY': 'ليبيا',
            'MA': 'المغرب',
            'MC': 'Monaco',
            'MD': 'Republica Moldova',
            'ME': 'Црна Гора',
            'MF': 'Saint-Martin',
            'MG': 'Madagascar',
            'MH': 'Marshall Islands',
            'MK': 'Северна Македонија',
            'ML': 'Mali',
            'MM': 'မြန်မာ',
            'MN': 'Монгол',
            'MO': '中國澳門特別行政區',
            'MP': 'Northern Mariana Islands',
            'MQ': 'Martinique',
            'MR': 'موريتانيا',
            'MS': 'Montserrat',
            'MT': 'Malta',
            'MU': 'Mauritius',
            'MV': 'Maldives',
            'MW': 'Malawi',
            'MX': 'México',
            'MY': 'Malaysia',
            'MZ': 'Moçambique',
            'NA': 'Namibia',
            'NC': 'Nouvelle-Calédonie',
            'NE': 'Niger',
            'NF': 'Norfolk Island',
            'NG': 'Nigeria',
            'NI': 'Nicaragua',
            'NL': 'Nederland',
            'NO': 'Norge',
            'NP': 'नेपाल',
            'NR': 'Nauru',
            'NU': 'Niue',
            'NZ': 'New Zealand',
            'OM': 'عُمان',
            'PA': 'Panamá',
            'PE': 'Perú',
            'PF': 'Polynésie française',
            'PG': 'Papua New Guinea',
            'PH': 'Philippines',
            'PK': 'پاکستان',
            'PL': 'Polska',
            'PM': 'Saint-Pierre-et-Miquelon',
            'PR': 'Puerto Rico',
            'PS': 'الأراضي الفلسطينية',
            'PT': 'Portugal',
            'PW': 'Palau',
            'PY': 'Paraguay',
            'QA': 'قطر',
            'RE': 'La Réunion',
            'RO': 'România',
            'RS': 'Србија',
            'RU': 'Россия',
            'RW': 'U Rwanda',
            'SA': 'المملكة العربية السعودية',
            'SB': 'Solomon Islands',
            'SC': 'Seychelles',
            'SD': 'السودان',
            'SE': 'Sverige',
            'SG': 'Singapore',
            'SH': 'St. Helena',
            'SI': 'Slovenija',
            'SJ': 'Шпицберген и Ян-Майен',
            'SK': 'Slovensko',
            'SL': 'Sierra Leone',
            'SM': 'San Marino',
            'SN': 'Sénégal',
            'SO': 'Soomaaliya',
            'SR': 'Suriname',
            'SS': 'South Sudan',
            'ST': 'São Tomé e Príncipe',
            'SV': 'El Salvador',
            'SX': 'Sint-Maarten',
            'SY': 'سوريا',
            'SZ': 'Eswatini',
            'TC': 'Turks & Caicos Islands',
            'TD': 'Tchad',
            'TG': 'Togo',
            'TH': 'ไทย',
            'TJ': 'Тоҷикистон',
            'TK': 'Tokelau',
            'TL': 'Timor-Leste',
            'TM': 'Türkmenistan',
            'TN': 'تونس',
            'TO': 'Tonga',
            'TR': 'Türkiye',
            'TT': 'Trinidad & Tobago',
            'TV': 'Tuvalu',
            'TW': '台灣',
            'TZ': 'Tanzania',
            'UA': 'Україна',
            'UG': 'Uganda',
            'US': 'United States',
            'UY': 'Uruguay',
            'UZ': 'Oʻzbekiston',
            'VA': 'Città del Vaticano',
            'VC': 'St. Vincent & Grenadines',
            'VE': 'Venezuela',
            'VG': 'British Virgin Islands',
            'VI': 'U.S. Virgin Islands',
            'VN': 'Việt Nam',
            'VU': 'Vanuatu',
            'WF': 'Wallis-et-Futuna',
            'WS': 'Samoa',
            'XK': 'Kosovë',
            'YE': 'اليمن',
            'YT': 'Mayotte',
            'ZA': 'iNingizimu Afrika',
            'ZM': 'Zambia',
            'ZW': 'Zimbabwe'
        },
        currentRegion: 'US',
    };

    window.Store.SendChannelMessage = {
        ...window.require('WAWebNewsletterUpdateMsgsRecordsJob'),
        ...window.require('WAWebMsgDataFromModel'),
        ...window.require('WAWebNewsletterSendMessageJob'),
        ...window.require('WAWebMexCreateNewsletterAdminInviteJob'),
        ...window.require('WAMediaCalculateFilehash'),
    };

    window.Store.ChannelSubscribers = {
        ...window.require('WAWebMexFetchNewsletterSubscribersJob'),
        ...window.require('WAWebNewsletterSubscriberListAction'),
    };

    if (!window.Store.Chat._find || !window.Store.Chat.findImpl) {
        window.Store.Chat._find = e => {
            const target = window.Store.Chat.get(e);
            return target ? Promise.resolve(target) : Promise.resolve({
                id: e
            });
        };
        window.Store.Chat.findImpl = window.Store.Chat._find;
    }

    /**
     * Target options object description
     * @typedef {Object} TargetOptions
     * @property {string|number} module The target module
     * @property {string} function The function name to get from a module
     */
    /**
     * Function to modify functions
     * @param {TargetOptions} target Options specifying the target function to search for modifying
     * @param {Function} callback Modified function
     */
    window.injectToFunction = (target, callback) => {
        const module = window.require(target.module);
        const originalFunction = module[target.function];
        const modifiedFunction = (...args) => callback(originalFunction, ...args);
        module[target.function] = modifiedFunction;
    };

    window.injectToFunction({ module: 'WAWebBackendJobsCommon', function: 'mediaTypeFromProtobuf' }, (func, ...args) => { const [proto] = args; return proto.locationMessage ? null : func(...args); });

    window.injectToFunction({ module: 'WAWebE2EProtoUtils', function: 'typeAttributeFromProtobuf' }, (func, ...args) => { const [proto] = args; return proto.locationMessage || proto.groupInviteMessage ? 'text' : func(...args); });
};
