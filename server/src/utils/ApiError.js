class ApiError extends Error{
    constructor(
        statusCode, 
        success, 
        message= "Something went wrong",
        error = [],
        statck = ""){
            super(message)
            this.statusCode=statusCode
            this.data=null
            this.success=success
            this.message=message
            this.errors = errors

            if(statck){
                this.stack = statck;
            } else{
                Error.captureStackTrace(this, this.constructor);
            }
    }
}

export {ApiError}