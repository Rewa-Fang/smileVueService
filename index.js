const Koa = require('koa');
const app = new Koa;
const mongoose = require('mongoose')
const {connect,initSchemas}  = require('./database/init.js'); // 引入init.js

//立即执行
;(async()=>{
  await connect(); //连接数据库
  initSchemas(); // 引入schema模型
  const User = mongoose.model('User'); // 定义User模型 对应数据库中users 集合
  let oneUser = new User({userName:'rewaFang',password:'456789'}); //定义一个User模型实例
  oneUser.save().then(()=>{ //保存 插入数据库
    console.log('insert success');
  });
  let users = await User.find({}).exec();  // 查询所有User模型数据
  console.log('---------------');
  console.log(users);
  console.log('---------------');
  
})();

app.use(async(ctx)=>{
  ctx.body = '<h1>Hello world!  smileVueService</h1>'
});

app.listen(3000,()=>{
  console.log('welcome to koa wolrd.');
})