const mongoose = require('mongoose'); //引入mongoose
const Schema = mongoose.Schema;     //引入Schema模型
const bcrypt = require('bcrypt'); // 引入bcrypt加盐加密
const SALT_WORK_FACTOR = 10; // 定义加盐的字符长度
let ObjectId = Schema.Types.ObjectId; // 定义用户ID

// 定义user模型
const userSchema = new Schema({
  userId:ObjectId,
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
});

//每次存储数据时都要执行
userSchema.pre("save",function(next){
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{ //加盐
    if(err) return next(err);
    bcrypt.hash(this.password,salt,(err,hash)=>{  //hash加密
        if(err) return next(err); 
        this.password = hash; //改变密码为加密后的字符
        next();
    })
  })
})


//发布模型  
mongoose.model('User',userSchema);  