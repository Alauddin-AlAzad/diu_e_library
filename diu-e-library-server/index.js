const express = require('express')
const cors = require('cors')
const dns = require('dns')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5000
const app = express()

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

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

// কুকি অপশন: লোকালহোস্ট ও লাইভ উভয় জায়গাতেই পারফেক্ট কাজ করবে
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
}

// Global Connection Cache for Vercel
let dbClient
let db

async function getDB() {
  if (!dbClient) {
    dbClient = await client.connect()
    db = dbClient.db('library-db')
  }
  return db
}

// verifyToken Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).send({ message: "unauthorized access" })

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" })
    }
    req.user = decoded
    next()
  })
}

// Base Route
app.get('/', (req, res) => {
  res.send('Hello from Library Server....')
})

// Generate JWT
app.post('/jwt', async (req, res) => {
  try {
    const email = req.body
    const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: '365d' })
    res.cookie('token', token, cookieOptions).send({ success: true })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Logout
app.get('/logout', async (req, res) => {
  try {
    res.clearCookie('token', { ...cookieOptions, maxAge: 0 }).send({ success: true })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Get all books
app.get('/books', async (req, res) => {
  try {
    const database = await getDB()
    const result = await database.collection('books').find().toArray()
    res.send(result)
  } catch (error) {
    console.error("Error fetching books:", error)
    res.status(500).send({ message: error.message })
  }
})

// Search, filter and sort
app.get('/all-books', async (req, res) => {
  try {
    const database = await getDB()
    const filter = req.query.filter
    const search = req.query.search || ''

    let query = {
      bookName: {
        $regex: search,$options: 'i'
      }
    }
    if (filter && filter !== 'Filter by Category') query.category = filter
    const result = await database.collection('books').find(query).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Single book data
app.get('/book/:id', async (req, res) => {
  try {
    const database = await getDB()
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await database.collection('books').findOne(query)
    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Add book
app.post('/add-book', async (req, res) => {
  try {
    const database = await getDB()
    const bookData = req.body
    const result = await database.collection('books').insertOne(bookData)
    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Borrow book
app.post('/borrow-book', async (req, res) => {
  try {
    const database = await getDB()
    const borrowdata = req.body
    const query = { email: borrowdata.email, bookId: borrowdata.bookId }
    const alreadyBorrow = await database.collection('borrow').findOne(query)

    if (alreadyBorrow) return res.status(400).send("You Already borrow this book")
    
    const result = await database.collection('borrow').insertOne(borrowdata)

    const filter = { _id: new ObjectId(borrowdata.bookId) }
    const update = { $inc: { quantity: -1 } }
    await database.collection('books').updateOne(filter, update)

    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Get my borrow books
app.get('/my-borrow-book/:email', verifyToken, async (req, res) => {
  try {
    const database = await getDB()
    const decodedEmail = req?.user?.email
    const email = req.params.email

    if (decodedEmail !== email) return res.status(401).send({ message: "unauthorized access" })
    const query = { email: email }
    const result = await database.collection('borrow').find(query).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Return book
app.delete('/return-book/:id', async (req, res) => {
  try {
    const database = await getDB()
    const borrowId = req.params.id
    const bookId = req.query.bookId
    const query = { _id: new ObjectId(borrowId) }
    const result = await database.collection('borrow').deleteOne(query)

    const filter = { _id: new ObjectId(bookId) }
    const update = { $inc: { quantity: 1 } }
    const updateBook = await database.collection('books').updateOne(filter, update)

    res.send({ result, updateBook })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app