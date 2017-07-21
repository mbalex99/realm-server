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
     * if both the server and the  
     */
    port?: number

    /**
     * the server to attach to, the port will be assumed from this server. this cannot be used with the port value
     */
    server?: http.Server | https.Server
}