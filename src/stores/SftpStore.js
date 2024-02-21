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
            await this.client.connect({...this.config, debug: console.log});
            console.log('*** SFTP Connection validated ' + Date.now());
        } catch (err) {
            await this.disconnect(); // Close immediately; we just want to test authentication
            throw new Error('Invalid SFTP credentials: ' + err.message);
        }
    }

    async connect() { 
        if (!this.isConnected) {
            await this.client.connect({...this.config, debug: console.log});
            this.isConnected = true;
        }
    }

    async disconnect() {
        this.isConnected = false;
        await this.client.end();
    }

    async sessionExists(options) {
        console.log('*** checking session exists start ' + Date.now());
        try {
            await this.connect(); // Ensure connection before operation
            console.log('*** checking session exists connect done ' + Date.now());

            const exists = await this.client.exists(`${options.session}.zip`);
            console.log('*** zip file checked ' + Date.now());
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