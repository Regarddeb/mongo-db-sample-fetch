require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const uri = process.env.MONGO_URI

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
  const dbName = process.env.DB_NAME
  try {
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection("users")

    const clientData = await collection.findOne(
      { _id: new ObjectId("59b99db4cfa9a34dcd7885b6") },
      { projection: { _id: 0, address: 1, phoneNumber: 1, emailAddress: 1 } }
    )

    console.log(clientData)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
