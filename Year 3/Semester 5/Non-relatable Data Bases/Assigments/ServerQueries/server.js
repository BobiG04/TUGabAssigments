const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const ExpressBrute = require('express-brute');

const store = new ExpressBrute.MemoryStore();

const bruteforce = new ExpressBrute(store, {
    freeRetries: 3,            
    minWait: 15 * 60 * 1000,    
    maxWait: 15 * 60 * 1000,    
    failCallback: function (req, res, next, nextValidRequestDate) {
        res.status(429).send({
            error: "Too many failed attempts",
            message: "Account locked for 15 minutes. Please try again later."
        });
    }
});

// start listening after routes are set up (below)

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

        // Apply express-brute middleware to protect this route.
        app.post('/query', bruteforce.prevent, (req, res) => {
            const username = (req.body.username || '').toString();
            const password = (req.body.password || '').toString();

            if (!username) return res.status(400).send('Username is required');

            const filter = { username: username, password: password };

            // Check credentials in MongoDB
            collection.findOne(filter)
                .then(doc => {
                    if (!doc) {
                        // Let express-brute count this failure (handled by middleware). Respond 401.
                        return res.status(401).send('Login Failed!');
                    }

                    // successful login -> reset brute force counters for this request
                    if (req.brute && typeof req.brute.reset === 'function') {
                        req.brute.reset();
                    }

                    return res.send('Login Successful!');
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
    });

