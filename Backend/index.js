require("dotenv").config()
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.URLPATH;
const dbName = 'mill';
const port = 3000;

let db;

const initializeDBAndServer = async () => {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db(dbName);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/", async (req, res) => {
  res.send("Hi from server side");
});

app.post("/register", async (request, response) => {
  try {
    const { username, email, companyName, gst, password } = request.body;

    // Input validation
    if (!username || !email || !companyName || !gst || !password) {
      return response.status(400).send({ display_msg: "All fields are required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).send({ display_msg: "Invalid email format" });
    }

    const userCollection = db.collection('register');
    const dbUser = await userCollection.findOne({ email });

    if (!dbUser) {
      await userCollection.insertOne({
        username,
        email,
        company_name: companyName,
        gst,
        password
      });
      response.send({ display_msg: "Registration Successful" });
    } else {
      response.status(400).send({ display_msg: "User already exists" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    response.status(500).send({ display_msg: "Internal server error during registration" });
  }
});

app.get("/register", async (req, res) => {
  const userCollection = db.collection('register');
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    // Input validation
    if (!email || !password) {
      return response.status(400).send({ display_msg: "Email and password are required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).send({ display_msg: "Invalid email format" });
    }

    const userCollection = db.collection('register');
    const dbUser = await userCollection.findOne({ email });

    if (!dbUser) {
      return response.status(400).send({ display_msg: "Invalid User" });
    }

    const isPasswordMatched = password === dbUser.password;
    if (isPasswordMatched) {
      const payload = { 
        email,
        username: dbUser.username,
        company_name: dbUser.company_name
      };
      const jwtToken = jwt.sign(payload, "jwt_token");
      return response.send({ 
        jwtToken, 
        display_msg: "Logged in Successful",
        user: {
          username: dbUser.username,
          email: dbUser.email,
          company_name: dbUser.company_name
        }
      });
    } else {
      return response.status(400).send({ display_msg: "Incorrect Password" });
    }
  } catch (error) {
    console.error("Error processing login request:", error);
    return response.status(500).send({ display_msg: "Internal Server Error" });
  }
});

app.get("/gram-products", async (req, res) => {
  const productCollection = db.collection('gram_products');
  const products = await productCollection.find({}).toArray();
  res.send(products);
});

app.get("/murmura-products", async (req, res) => {
  const productCollection = db.collection('murmura_products');
  const products = await productCollection.find({}).toArray();
  res.send(products);
});

app.get("/gram-products/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ display_msg: "Invalid product ID" });
  }
  const productCollection = db.collection('gram_products');
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  res.send(product);
});

app.get("/murmura-products/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ display_msg: "Invalid product ID" });
  }
  const productCollection = db.collection('murmura_products');
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  res.send(product);
});
