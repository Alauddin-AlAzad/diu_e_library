const express = require('express')
const cors = require('cors')
const dns = require('dns')
const fs = require('fs')
const path = require('path')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionalSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ISP DNS problem hole Atlas SRV lookup fail kore — tai custom DNS
const dnsServers = (process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1')
  .split(',')
  .map(server => server.trim())
  .filter(Boolean)

if (dnsServers.length) dns.setServers(dnsServers)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0juy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const db = client.db('library-db')
    const bookCollection = db.collection('books')
    const borrowCollection = db.collection('borrow')

    // save book data in db
    app.post('/add-book', async (req, res) => {
      const bookData = req.body
      const result = await bookCollection.insertOne(bookData)
      res.send(result)
    })


    // old frontend alias
    // app.post('/add-job', async (req, res) => {
    //   const bookData = req.body
    //   const result = await bookCollection.insertOne(bookData)
    //   res.send(result)
    // })

    // get all books from db
    app.get('/books', async (req, res) => {
      const result = await bookCollection.find().toArray()
      res.send(result)
    })
    // get a single book data from db
    app.get('/book/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await bookCollection.findOne(query)
      res.send(result)
    })

    // save a   borrow data in db
    app.post('/borrow-book', async (req, res) => {
      const borrowdata = req.body
      const query = { email: borrowdata.email, bookId: borrowdata.bookId }
      const alreadyBorrow = await borrowCollection.findOne(query)

      if (alreadyBorrow) return res.status(400).send("You Already borrow this book")
      const result = await borrowCollection.insertOne(borrowdata)

      //  increse borrow book in bookCollection

      const filter = { _id: new ObjectId(borrowdata.bookId) }
      const update = {

        $inc: { quantity: -1 },

      }
      const updateBook = await bookCollection.updateOne(filter, update)


      res.send(result)

    })

    // get all bids data in db
    app.get('/my-borrow-book/:email', async (req, res) => {
      const email = req.params.email
      const query = { userEmail: email }
      const result = await borrowCollection.find(query).toArray()
      res.send(result)


    })


    // return the book
    app.delete('/return-book/:id', async (req, res) => {
      const borrowId = req.params.id
      const bookId = req.query.bookId
      const query = { _id: new ObjectId(borrowId) }
      const result = await borrowCollection.deleteOne(query)

      //update quantity
      const filter={_id : new ObjectId(bookId)}

      const update={
        $inc: {
          quantity:1
        }
      }
      const updateBook = await bookCollection.updateOne(filter, update)
      res.send(result,updateBook)
    })

  



    // save borrow data in db
    // app.post('/add-borrow', async (req, res) => {
    //   const borrowData = req.body

    //   if (borrowData.returnDate) {
    //     borrowData.returnDate = new Date(borrowData.returnDate)
    //   }

    // // if a user already borrowed this book
    // const query = { email: borrowData.email, bookId: borrowData.bookId }
    // const alreadyExist = await borrowCollection.findOne(query)
    // if (alreadyExist) {
    //   return res.status(400).send('You already borrowed this book')
    // }

    // const result = await borrowCollection.insertOne(borrowData)

    //   // here updated borrow_count
    //   const filter = { _id: new ObjectId(borrowData.bookId) }
    //   const updated = {
    //     $inc: { borrow_count: 1, quantity: -1 },
    //   }
    //   await bookCollection.updateOne(filter, updated)

    //   res.send(result)
    // })

    // // // display borrow data of a specific user
    // // app.get('/borrows/:email', async (req, res) => {
    // //   const email = req.params.email
    // //   const query = { email }
    // //   const result = await borrowCollection.find(query).toArray()
    // //   res.send(result)
    // // })

    // // here update the status (borrowed / returned)
    // // app.patch('/borrow-status-update/:id', async (req, res) => {
    // //   const id = req.params.id
    // //   const { cuStatus } = req.body

    // //   const filter = { _id: new ObjectId(id) }
    // //   const updated = {
    // //     $set: { status: cuStatus },
    // //   }
    // //   const result = await borrowCollection.updateOne(filter, updated)
    // //   res.send(result)
    // // })

    // // here work for search, filter and sort
    // app.get('/all-books', async (req, res) => {
    //   const { filter, search, sort } = req.query

    //   let query = {}

    //   if (search) {
    //     query.title = { $regex: search, $options: 'i' }
    //   }

    //   if (filter) {
    //     query.category = filter
    //   }

    //   let options = {}
    //   if (sort === 'asc') options.sort = { title: 1 }
    //   if (sort === 'desc') options.sort = { title: -1 }

    //   const result = await bookCollection.find(query, options).toArray()
    //   res.send(result)
    // })

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from Library Server....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))