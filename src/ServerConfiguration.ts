import * as http from 'http'
import * as https from 'https'

export default interface ServerConfiguration {
    /**
     * the string of the public key
     */
    publicKey?: string
    /**
     * the string of the private key
     */
    privateKey?: string
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
}