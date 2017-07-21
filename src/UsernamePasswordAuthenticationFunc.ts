import { AuthenticationFunc } from './AuthenticationFunc';

const usernamePassword: AuthenticationFunc = function(body: any): Promise<{userId: string, isAdmin: boolean}> {
    const username = body.username as string
    const password = body.password as string

    return new Promise((resolve, reject) => {
        throw new Error('not yet implemented')
    })
}

export default usernamePassword;