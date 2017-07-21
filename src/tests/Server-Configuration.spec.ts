import { RealmObjectServer } from '../'
import { expect } from 'chai'

import * as http from 'http'

describe('RealmObjectServer - Configuration Tests ', function () {

    let ros: RealmObjectServer = null

    afterEach(async function () {
        if (ros) {
            await ros.stop();
            ros = null;
        }

    })

    it('should start on port 9080 if port is ommitted', async function () {
        ros = new RealmObjectServer()
        await ros.start()
        expect(ros.configuration.port).to.equal(9080)
    })

    it('should be able to specify a port', async function () {
        ros = new RealmObjectServer({
            port: 7890
        })
        await ros.start()
        expect(ros.configuration.port).to.equal(7890)
    })

    it('should throw an error if attempting to supply both a port and server', async function () {
        const server = http.createServer()
        expect(() => {
            ros = new RealmObjectServer({
                port: 7890,
                server: server
            })
        }).to.throw()
    })
})