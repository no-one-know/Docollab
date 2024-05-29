const {MongoClient}=require('mongodb')
const url='mongodb://0.0.0.0:27017'
const client=new MongoClient(url)

async function connect(){
    try{
        await client.connect()
        console.log("Connection established successfully")
    }
    catch(e){
        console.log("Error occured while connecting to MongoDb",e)
    }
}

async function close(){
    try{
        await client.close()
        console.log("Disconnected successfully from MongoDb")
    }
    catch(e){
        console.log("Error occured while disconnecting")
    }
}

module.exports={connect,close,client}