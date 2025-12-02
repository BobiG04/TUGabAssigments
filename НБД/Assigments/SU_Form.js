console.log("SU_Form.js loaded");

const url = 'mongodb://localhost:27017';
const dbName = 'Students'; 
const collectionName = "data1"; 
const options = { 
    serverSelectionTimeoutMS: 3000, 
    connectTimeoutMS: 3000,  
    socketTimeoutMS: 3000,
}; 

