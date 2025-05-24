import {AuthenticationError, DBError, LogicError} from "../utils/Errors.js";

export async function errorHandler(err, req, res, next) {
    let type;
    if(err instanceof DBError) type = "DBERROR";
    if(err instanceof AuthenticationError) type = "AuthenticationError";
    if(err instanceof LogicError) type = "LogicError";

    // Log the full error and stack trace
    console.error("Custom error handler:", err);
    if (err && err.stack) {
        console.error("Stack trace:", err.stack);
    }

    return res.status(500).send({"error": {"type" : `${type}`, "message" : `${err.message}`}});
}
