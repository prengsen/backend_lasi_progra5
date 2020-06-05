class HttpError extends Error {
    constructor(message, errrCode){
        super(message); //agregamos mensaje.
        this.code = errrCode;
    }

}

module.exports = HttpError;