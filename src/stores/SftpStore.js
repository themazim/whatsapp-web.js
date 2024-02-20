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
            await this.client.connect(this.config);
            await this.disconnect(); // Close immediately; we just want to test authentication
        } catch (err) {
            throw new Error('Invalid SFTP credentials: ' + err.message);
        }
    }

    async connect() {
        if (!this.isConnected) {
            await this.client.connect(this.config);
            this.isConnected = true;
        }
    }

    async disconnect() {
        this.isConnected = false;
        await this.client.end();
    }

    async sessionExists(options) {
        try {
            await this.connect(); // Ensure connection before operation
            await this.client.exists(`${options.session}.zip`);
            return true;
        } catch (err) {
            // Connection errors likely require explicit recovery
            this.disconnect(); // Forcefully close if error occurs
            throw err; // Propagate the error 
        }
    }

    async save(options) {
        try {
            await this.connect();
            await this.client.fastPut(`${options.session}.zip`, `${options.session}.zip`);
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
        } catch (err) {
            // Connection errors likely require explicit recovery
            this.disconnect(); // Forcefully close if error occurs
            throw err; // Propagate the error 
        }
    }
}

module.exports = SftpStore;