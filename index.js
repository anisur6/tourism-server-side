const express = require('express')
//to connect to database
const { MongoClient } = require('mongodb');



const ObjectId = require('mongodb').ObjectId;



const cors = require('cors')
require('dotenv').config();








const app = express()
const port = process.env.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());

//database uri name and pass
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hkgq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



//main function start

async function run() {
    try {
        //connect server with database
        await client.connect();
        const database = client.db('travelAgent');
        const serviceCollection = database.collection('services')

        const bookingCollection = database.collection('bookings')
        // console.log('connected to database ya la la hoo ..!!');


        //get API
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })



        //get single services
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            // console.log('getting specific id');
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.json(service);
        })


        //post api
        app.post('/services', async (req, res) => {
            const service = req.body;

            console.log('hit the post', service);
            const result = await serviceCollection.insertOne(service);
            console.log(result);
            res.json(result)
        })

        //booking get API
        app.get('/bookings', async (req, res) => {
            const cursor = bookingCollection.find({});
            const booking = await cursor.toArray();
            res.send(booking);
        })




    }
    finally {
        //await cliant.close
    }
}
run().catch(console.dir);









//step 4
app.get('/', (req, res) => {
    res.send('Hello Hero..!!!!')
})

//step 5
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
















// name : travelAgency
//pass : NWqjNn9VpfDwv5mP










//------------------------------

