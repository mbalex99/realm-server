import { RealmObjectServer } from './Server'

export default interface Service {
    
    /**
     * an optional path to bind this service to an endpoint
     */
    path?: string
    /**
     * Called when the Server has called the `use` method 
     */
    init(server: RealmObjectServer)
    /**
     * Called when the Server is ready to dispose
     */
    deinit()
}