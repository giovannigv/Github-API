import { Request } from "express";

class RepositoryMiddleware {

    verifyAcceptHeader(accept : string): void {
        if (accept !== 'application/json') {
            throw {
                status: 406,
                Message: 'Invalid Accept Header'
            }
        }
    }
}

export default new RepositoryMiddleware();