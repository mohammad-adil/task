const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskManager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) return console.log('unable to Connect to Database')


    const db = client.db(databaseName)

    db.collection('users').insertMany([{
        name: 'Shah Aadil',
        age: '26'
    },
    {
        name: 'Syed Adil',
        age: '26'
    }], (err, results) => {
        if (err) {
            return console.log('unable to Insert Data')
        }
        console.log(results.insertedIds)
    })

})