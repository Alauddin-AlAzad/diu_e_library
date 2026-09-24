const express = require('express')
const cors = require('cors')
const dns = require('dns')
const fs = require('fs')
const path = require('path')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000
const app = express()
const cookieParser = require('cookie-parser')
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://diu-library-f6c58.web.app',
    'https://diu-library-f6c58.firebaseapp.com'
  ],
  credentials: true,
  optionalSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

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

// veriytoken
const verifyToken = (req, res, next) => {

  console.log("Hello I am a middle ware ")
  const token = req.cookies?.token
  if (!token) return res.status(401).send({ message: " unauthorized acces" })
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: " unauthorized acces" })
    }

    req.user = decoded
    next()
  })

}

async function run() {
  try {
    const db = client.db('library-db')
    const bookCollection = db.collection('books')
    const borrowCollection = db.collection('borrow')

    // generate jwt
    app.post('/jwt', async (req, res) => {
      // create token
      const email = req.body
      const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: '365d' })
      console.log(token)
      res.cookie('token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      }).send({ succes: true })
    })

    // logout || clear cookie rom browser
    app.get('/logout', async (req, res) => {
      res.clearCookie('token', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 0,
      })
        .send({ success: true })
    })
    // save book data in db
    app.post('/add-book', async (req, res) => {
      const bookData = req.body
      const result = await bookCollection.insertOne(bookData)
      res.send(result)
    })


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

    // get all borrow  data in db
    app.get('/my-borrow-book/:email', verifyToken, async (req, res) => {
      const decodedEmail = req?.user?.email
      const email = req.params.email
      

      console.log('email from token ---> ', decodedEmail)
      console.log('email from params ---> ', email)
      if (decodedEmail !== email) return res.status(401).send({ message: " unauthorized acces" })
        const query = { email: email }
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
      const filter = { _id: new ObjectId(bookId) }

      const update = {
        $inc: {
          quantity: 1
        }
      }
      const updateBook = await bookCollection.updateOne(filter, update)
      res.send(result, updateBook)
    })


    // here work for search, filter and sort

    app.get('/all-books', async (req, res) => {
      const filter = req.query.filter
      const search = req.query.search
      console.log(search)
      let query = {
        bookName: {
          $regex: search, $options: 'i'
        }
      }
      if (filter && filter !== 'Filter by Category') query.category = filter
      const result = await bookCollection.find(query).toArray()

      res.send(result)
    })




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