const mongoose = require('mongoose'); //引入moogoose
const db = "mongodb://localhost/smile_db"; //定义数据库连接地址
const glob = require('glob'); //node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件
const {resolve} = require('path'); //引入path模块 将一系列路径或路径段解析为绝对路径。

exports.initSchemas = ()=>{
  //引入所有的schema
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require); 
}

//连接数据库
exports.connect = ()=>{
  mongoose.connect(db);
  let maxConnectTimes = 0; //设置数据库
  return new Promise((resolve,reject)=>{
    mongoose.connection.on('disconnected',()=>{ //监听数据库连接断开
      console.log('***********MongoDB connect disconnected ************');
      if(maxConnectTimes < 3){ 
        mongoose.connect(db);
        maxConnectTimes++;
      }else{
        reject();
        throw new Error('MongoDB connection is error by disconnected')
      }
    })

    mongoose.connection.on('error',(err)=>{ //监听数据库连接错误
      console.log('***********MongoDB connect error ************');
      if(maxConnectTimes < 3){
        mongoose.connect(db);
        maxConnectTimes++;
      }else{
        reject(err);  
        throw new Error('MongoDB connection is error by error')
      }
    })

    mongoose.connection.on('open',()=>{ //监听数据库连接成功
      console.log('******* MongoDB connect is successfully ********');
      resolve();
    })
  });
  
}