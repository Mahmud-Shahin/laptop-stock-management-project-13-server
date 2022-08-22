const express = require('express');
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// middleware
app.use(cors());
app.use(express.json());



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obkze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    const stockitemCollection =client.db('laptopStock').collection('stocksItem');

    
app.get('/stocksItem', async (req, res) => {

  const query = {};
  const cursor = stockitemCollection.find(query);
  const stocksItems = await cursor.toArray();
  res.send(stocksItems);
});

  app.get('/stocksItem/:id', async (req,res) =>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const stocksItem = await stockitemCollection.findOne(query);
    res.send(stocksItem);
  });

  // post 
  app.post('/stocksItem', async  (req,res) =>{
    const addstockitem = req.body;
    const result = await stockitemCollection. insertOne(addstockitem);
    res.send(result);
    
  } );

// delete
  app.delete('/stocksItem/:id' , async(req,res) =>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await stockitemCollection.deleteOne(query);
    res.send(result);


  });



     
  }
  finally{

  }

} 

run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('This is warehouse related website')
  })

app.listen(port, () => {
    console.log('listening to port', port)
  });