const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());


const uri = "mongodb+srv://wwwmhmizan09:0KAl2MUZYv9CF6ZV@cluster0.73k110p.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("usersDB");
    const userCollection = database.collection("users");
    app.get('/users',async (req,res)=>{
        const cursor = userCollection.find()

        const result = await cursor.toArray();
        res.send(result);
    })

    app.post ('/users', async(req,res)=>{
        const user = req.body;
        console.log('new user',user);
        const result = await userCollection.insertOne(user);
        res.send(result);
    })
    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id;
        console.log('please delete from database',id);
        const query ={_id: new ObjectId(id)}
        const result = await userCollection.deleteOne(query);
        const result =  await userCollection.deleteMany(query);
        res.send(result);
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res) =>{
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port,()=>{
    console.log(`SIMPLE CRUD IS RUNNING ON PORT ,${port}`);
})