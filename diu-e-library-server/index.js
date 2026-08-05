const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dns = require('dns');

// middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const dnsServers = (process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

if (dnsServers.length > 0) {
    dns.setServers(dnsServers);
}

const dbName = process.env.DB_NAME || 'library-db';

// Build MongoDB connection URI. Priority:
// 1. MONGO_URI env var (explicit full connection string)
// 2. DB_USER + DB_PASS (+ optional DB_HOST/DB_CLUSTER) -> Atlas-style URI
// 3. Local fallback
let mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    const dbHost = process.env.DB_HOST || process.env.DB_CLUSTER || '';

    if (dbUser && dbPass && dbHost) {
        mongoUri = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
    } else if (dbUser && dbPass) {
        mongoUri = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@cluster0.w0juy.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    } else {
        // fallback to local MongoDB
        mongoUri = 'mongodb://127.0.0.1:27017/' + dbName;
    }
}

let client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let bookCollection;
let borrowCollection;

async function seedBooksIfEmpty() {
    const bookCount = await bookCollection.countDocuments();

    if (bookCount > 0) {
        return;
    }

    const seedBooks = await readBooksFile();
    if (!seedBooks.length) {
        return;
    }

    const normalizedBooks = seedBooks.map(({ _id, ...book }) => ({
        ...book,
    }));

    await bookCollection.insertMany(normalizedBooks);
}

async function getAllBooks() {
    if (!bookCollection) throw new Error('Database not initialized');
    return bookCollection.find().toArray();
}

async function getBookById(id) {
    return bookCollection.findOne({ _id: new ObjectId(id) });
}

async function insertBook(bookData) {
    return bookCollection.insertOne(bookData);
}

const addBookHandler = async (req, res) => {
    try {
        const bookData = req.body;
        const result = await insertBook(bookData);

        res.status(201).json({
            message: 'Book added successfully to MongoDB.',
            insertedId: result.insertedId,
        });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Failed to insert book to database' });
    }
};

app.post('/add-job', addBookHandler);
app.post('/add-book', addBookHandler);

app.get('/books', async (req, res) => {
    try {
        const result = await getAllBooks();
        res.send(result);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ message: 'Failed to fetch books.' });
    }
});

app.get('/book/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getBookById(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.send(result);
    } catch (error) {
        console.error('Failed to fetch single book:', error);
        res.status(500).json({ message: 'Invalid ID or DB error' });
    }
});

async function run() {
    try {
        await client.connect();
    } catch (error) {
        // If SRV DNS lookup failed (querySrv) and DB_HOSTS is provided, try a non-SRV fallback
        const isSrv = mongoUri && mongoUri.startsWith('mongodb+srv:');
        const hostsList = process.env.DB_HOSTS; // comma-separated host:port entries
        const user = process.env.DB_USER;
        const pass = process.env.DB_PASS;

        if (isSrv && hostsList && user && pass && error && /querySrv|ECONNREFUSED/.test(error.message || error.code || '')) {
            console.warn('SRV DNS lookup failed — attempting non-SRV fallback using DB_HOSTS');
            const fallbackUri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${hostsList}/${dbName}?retryWrites=true&w=majority`;

            try {
                // close previous client and create a new one with fallback URI
                try { await client.close(); } catch (e) {}
                client = new MongoClient(fallbackUri, {
                    serverApi: {
                        version: ServerApiVersion.v1,
                        strict: true,
                        deprecationErrors: true,
                    }
                });
                await client.connect();
                mongoUri = fallbackUri; // update for logging
            } catch (fallbackError) {
                console.error('Fallback connection failed:', fallbackError);
                process.exit(1);
            }
        } else {
            const maskedUri = mongoUri ? mongoUri.replace(/:\/\/.+?:.+?@/, '://***:***@') : mongoUri;
            console.error('MongoDB connection error connecting to', maskedUri);
            console.error(error);
            process.exit(1);
        }
    }

    const db = client.db(dbName);
    bookCollection = db.collection('books');
    borrowCollection = db.collection('borrow');

    await seedBooksIfEmpty();

    const maskedUri = mongoUri.replace(/:\/\/.+?:.+?@/, '://***:***@');
    console.log(`Successfully connected to MongoDB at ${maskedUri}`);

    // Start HTTP server only after MongoDB is ready.
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start listening only after DB initialization inside run()

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('SIGINT received — closing server and MongoDB client');
    try { await client.close(); } catch (e) {}
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('SIGTERM received — closing server and MongoDB client');
    try { await client.close(); } catch (e) {}
    process.exit(0);
});