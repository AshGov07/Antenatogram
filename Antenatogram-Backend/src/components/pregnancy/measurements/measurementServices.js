import {
    findEntry,
    addEntry,
    removeEntry,
    updateEntry,
    fetchEntries
} from "../../../../database/pregnancy/sub/measurementMethods.js";
import { DBError, LogicError } from "../../../utils/Errors.js";
import { pool } from "../../../../database/db.js";

async function add(req, res, next){
    const data = req.body.data;
    const type = req.body.type;
    const pregnancyID = req.body.pregnancyID;
    const adding = await addEntry({type, pregnancyID, data});
    if(adding instanceof Error) return next(adding);
    return res.send({ message: "measurements added" });
}
async function update(req, res, next) {
    const { type, data, pregnancyID } = req.body; // Ensure pregnancyID is passed in the request body
    let connection;

    if (!pregnancyID) {
        return next(new DBError("Pregnancy ID is undefined"));
    }

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            for (const item of data) {
                const query = `
                    UPDATE measurement 
                    SET type = ?, date = ?, value = ?, value2 = ? 
                    WHERE pregnancy_id = UUID_TO_BIN(?) AND measurement_id = UUID_TO_BIN(?)
                `;

                const [result] = await connection.query(query, [
                    type.toLowerCase(),
                    item.date,
                    item.value,
                    item.value2 || null,
                    pregnancyID,
                    item.measurementID
                ]);

                if (result.affectedRows !== 1) {
                    throw new Error('Failed to update measurement');
                }
            }

            await connection.commit();
            res.json({ message: "Measurements updated successfully" });
        } catch (error) {
            await connection.rollback();
            throw error;
        }
    } catch (error) {
        next(new DBError("Failed to update measurements", error));
    } finally {
        if (connection) connection.release();
    }
}
async function remove(req, res, next){
    let data,length;
    try{
        data = req.body.data;
        length = data.length; // this is only to check if there is some data, otherwise, raise error
    }
    catch (e){
        return next(new LogicError("no data received"));
    }

    try{
        const finding = await findEntry(data.map(entry => entry.measurementID));
        if(finding instanceof Error) return next(finding);
        const deleting = await removeEntry(data);
        if(deleting instanceof Error) return next(deleting);
        return res.json({"message": "users deleted successfully"});
    }catch (e) {
        console.log(e);
        return next(new DBError("could not delete values"))
    }
}
async function fetch(req, res, next){
    let type = req.query.type;
    let pregnancyID = req.query.pregnancyID;
    try {
        const fetching = await fetchEntries({type, pregnancyID});
        if(fetching instanceof Error) return next(fetching);
        return res.json({"data" : fetching});
    }catch (e) {
        console.log(e);
        return next(new DBError("could not fetch entries"));
    }
}

export const measurementServices = { add, update, remove, fetch };
