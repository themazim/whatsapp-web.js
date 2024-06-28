const Client = require('ssh2-sftp-client');

class SftpStore {

    constructor({host, username, password, port = 22} = {}) {
        this.client = new Client();
        this.config = {host, username, password, port};
        this.isConnected = false;
        this.validateCredentials();
    }

    async validateCredentials() {
        try {
            await this.connect();
            await this.disconnect();
        } catch (err) {
            await this.disconnect(); // Close immediately; we just want to test authentication
            throw new Error('Invalid SFTP credentials: ' + err.message);
        }
    }

    async connect() {

        if (!this.isConnected) {
            try {
                await this.client.connect(this.config);
                this.isConnected = true;
            } catch (err) {
                console.error('[SFTPStore] SSH failed to connect', err);
                this.isConnected = false;
            }
        } else {
            // check and re-connect if necessary
            try {
                await this.client.lstat('.');
            } catch (err) {
                this.isConnected = false;
                this.connect();
            }
        }
    }

    async disconnect() {
        this.isConnected = false;
        try {
            await this.client.end();
        } catch (err) {
            console.error('[SFTPStore] SSH failed to disconnect', err);
        }

    }

    async sessionExists(options) {
        try {
            await this.connect(); // Ensure connection before operation
            const exists = await this.client.exists(`${options.session}.zip`);
            await this.disconnect();
            return exists;
        } catch (err) {
            // Connection errors likely require explicit recovery
            this.disconnect(); // Forcefully close if error occurs
            return false;
        }
    }

    async save(options) {
        try {
            await this.connect();
            await this.client.fastPut(`${options.session}.zip`, `${options.session}.zip`);
            await this.disconnect();
        } catch (err) {
            // Connection errors likely require explicit recovery
            this.disconnect(); // Forcefully close if error occurs
            throw err; // Propagate the error 
        }
    }

    async extract(options) {
        try {
            await this.connect();
            await this.client.fastGet(`${options.session}.zip`, options.path);
            await this.disconnect();
        } catch (err) {
            // Connection errors likely require explicit recovery
            this.disconnect(); // Forcefully close if error occurs
            throw err; // Propagate the error 
        }
    }

    async delete(options) {
        try {
            await this.connect();
            await this.client.delete(`${options.session}.zip`);
            await this.disconnect();
        } catch (err) {
            // Connection errors likely require explicit recovery
            this.disconnect(); // Forcefully close if error occurs
            throw err; // Propagate the error 
        }
    }
}

module.exports = SftpStore;