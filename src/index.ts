import * as EventEmitter from 'events';
import * as http from 'http'
import * as https from 'https'

export class RealmServer extends EventEmitter {

    httpServer: http.Server | https.Server

    constructor(options?) {
        super()
    }
}