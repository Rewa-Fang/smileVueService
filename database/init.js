const mongoose = require('mongoose');
const db = "mongodb://localhost/smile_db";

exports.connect = ()=>{
  mongoose.connect(db);
  let maxConnectTimes = 0;
  return new Promise((resolve,reject)=>{
    mongoose.connection.on('disconnected',()=>{
      console.log('***********MongoDB connect disconnected ************');
      if(maxConnectTimes < 3){
        mongoose.connect(db);
        maxConnectTimes++;
      }else{
        reject();
        throw new Error('MongoDB connection is error by disconnected')
      }
    })

    mongoose.connection.on('error',(err)=>{
      console.log('***********MongoDB connect error ************');
      if(maxConnectTimes < 3){
        mongoose.connect(db);
        maxConnectTimes++;
      }else{
        reject(err);  
        throw new Error('MongoDB connection is error by error')
      }
    })

    mongoose.connection.on('open',()=>{
      console.log('******* MongoDB connect is successfully ********');
      resolve();
    })
  });
  
}