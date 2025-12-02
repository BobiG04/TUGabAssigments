const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express(); 

app.listen(8080, () => { 
    console.log('Start listening on port 8080...') 
});

const url = 'mongodb://localhost:27017';
const dbName = 'users'; 
const collectionName = "logins";
const options = { 
    serverSelectionTimeoutMS: 3000, 
    connectTimeoutMS: 3000,  
    socketTimeoutMS: 3000,
};


/*app.post('/query', (req, res) => {
    let subject = req.body.subject;
    let grade = req.body.grade;
    res.send(`${subject}: ${grade}`); 
});*/

mongodb.MongoClient.connect(url, options)
    .then(client => {
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/', (request, response) => { 
            response.sendFile(__dirname + '/index.html');
        }); 
        app.post('/query', (req, res) => {


            const filter = {
                username: `${req.body.username}`,
                password: `${req.body.password}`
            };
            const projection = { _id: 0, name: 1 };
            const sort = { name: 1 };

            collection
                .find(filter, { projection: projection}, {sort: sort})
                .toArray()
                .then(docs => {
                    let result = ``;
                    if (docs.length === 0) {
                        result += "No users found.";
                    } else {
                        docs.forEach(doc => {
                            result += `OK`;
                        });
                    }
                    res.send(result);
                })
                .catch(err => {
                    console.error("Error querying MongoDB:", err);
                    res.status(500).send("Internal Server Error");
                });
        });
        app.listen(8080, () => { 
            console.log('Start listening on port 8080...') 
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
    }
);