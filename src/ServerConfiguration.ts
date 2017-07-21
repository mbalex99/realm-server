import * as http from 'http'
import * as https from 'https'
import { AuthenticationFunc } from './AuthenticationFunc';

export interface SyncWorkerOptions {
    storageRootPath: string
    network: {
        sync: {
            host: string
            port: number
        }
    }
    backup: {
        masterSlaveSharedSecret: string
        masterAddress: string
        masterPort: number
        operatingMode: 'master_with_synchronous_slave' | 'master_with_asynchronous_slave' | 'slave'
    }
}

export interface SSLConfiguration {
    key?: string
    cert?: string
    passphrase?: string
    pfx?: string
}


export default interface ServerConfiguration {
    
    sslConfiguration?: SSLConfiguration

    /**
     * secret, a string that can be used to sign for encryption. useful for development
     * highly discouraged in production 
     * this cannot be used in conjusting with a privateKey
     * @optional secret
     */
    secret?: string

    /**
     * Accept only connections and requests at this path
     */
    path?: string

    /**
     * port to attach to. this must be undefined if the server value exists
     */
    port?: number

    /**
     * port to attach to. this must be undefined if the server value exists
     */
    hostName?: string

    /**
     * the server to attach to, the port will be assumed from this server. this cannot be used with the port value
     */
    server?: http.Server | https.Server

    /**
     * If omitted this will default to debug
     * If omitted but NODE_ENV=production this will default to `'error'`
     */
    logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error'

    syncWorkerOptions?: SyncWorkerOptions

    authentication?: AuthenticationFunc
}