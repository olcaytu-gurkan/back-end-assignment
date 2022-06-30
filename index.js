const app = require("express")();
const {MongoClient} = require("mongodb");
require("dotenv").config();

// Credentials
const DBNAME = process.env.DBNAME;
const COLLECTIONNAME = process.env.COLLECTIONNAME;
const HOST = process.env.BROWSERHOST;
const PORT = process.env.BROWSERPORT;
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri);
try {
    client.connect((err) => {
        app.listen(
            PORT, () => console.log("API running at " + HOST + ":" + PORT)
        );  

        app.set("json spaces", 2); // Formatting purposes.

        app.get("/countries", (req, res) => { // Endpoint.
            client.db(`${DBNAME}`).collection(`${COLLECTIONNAME}`).find({}, {projection: {_id: 0, name: 1, region: 1}}).toArray(function(err, result) {
                if (err) throw err;
                res.status(200).json(result); // Send the result as JSON Object.
            });
        });
    });
} catch (e) { // Error handling.
    console.error(e);
    client.close();
}