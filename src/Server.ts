import * as EventEmitter from 'events';
import * as http from 'http';
import * as https from 'https';
import * as Realm from 'realm';

import Service from './Service'
import ServerConfiguration from './ServerConfiguration'

import usernamePassword from './usernamePassword'

export class RealmObjectServer extends EventEmitter {

    private _httpServer: http.Server | https.Server
    private _services: Service[] = []
    private _configuration: ServerConfiguration

    /**
     * Returns the Services that are already register. Do not mutate this
     */
    get services(): Service[] {
        return this._services
    }

    /**
     * Returns the configuration 
     */
    get configuration(): ServerConfiguration {
        return this._configuration
    }

    constructor(configuration: ServerConfiguration = {}) {
        super()
        if (configuration.port && configuration.server) {
            throw new Error('You cannot supply both a port and a configuration')
        }
        if (!configuration.port && !configuration.server) {
            configuration.port = 9080
        }
        if (!configuration.server && configuration.sslConfiguration) {
            this._httpServer = https.createServer(configuration.sslConfiguration, (req, res) => {
                const body = http.STATUS_CODES[426];
                res.writeHead(426, {
                    'Content-Length': body.length,
                    'Content-Type': 'text/plain'
                });
                res.end(body);
            });
        } else {
            this._httpServer = http.createServer((req, res) => {
                const body = http.STATUS_CODES[426];
                res.writeHead(426, {
                    'Content-Length': body.length,
                    'Content-Type': 'text/plain'
                });
                res.end(body);
            });
        }
        if (!configuration.authentication) {
            configuration.authentication = usernamePassword
        }
        this._configuration = configuration
    }

    start(): Promise<RealmObjectServer> {
        return new Promise((resolve, reject) => {
            this._httpServer.listen(
                this.configuration.port,
                this.configuration.hostName, (err) => {
                    if (err) {
                        reject(err)
                    }else {
                        resolve(this)
                    }
                })
        })
    }

    stop(): Promise<RealmObjectServer> {
        return new Promise((resolve, reject) => {
            this._httpServer.close((err) => {
                if (err) { reject(err) }
                else {
                    resolve(this)
                }
            })
        })
    }

    /**
     * 
     * @param service a RealmObjectServer 
     */
    registerService(service: Service) {
        this._services.push(service)
        service.init(this)
    }

    /**
     * Find the service that you would like to detach
     * This method can throw if something is still occuring
     * @param service 
     */
    unregister(service: Service) {
        const foundService = this._services.find(s => s === service)
        if (foundService) {
            foundService.deinit()
        }
    }

    getRealmByPath(path: string): Promise<Realm | null | undefined> {
        throw new Error('not implemented')
    }



}