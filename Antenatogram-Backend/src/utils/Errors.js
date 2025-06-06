export class AuthenticationError extends Error {
    err;
    constructor(message, error=''){
        super(message);
        this.name = "AuthenticationError";
        this.err = error;
    }
}

export class DBError extends Error{
    err;
    constructor(message='', error=''){
        super(message);
        this.name = "DBError";
        this.err = error;
    }   
}

export class LogicError extends Error{
    err;
    constructor(message='', error=''){
        super(message);
        this.name = "LogicError";
        this.err = error;
    }
}