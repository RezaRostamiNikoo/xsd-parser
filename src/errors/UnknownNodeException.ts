export class UnknownNodeException extends Error {
    constructor(node: string) {
        super(`${node} is Unknown Node`)
    }
}