const Router = require('koa-router');
let userRouter = new Router();
const mongoose = require('mongoose');

userRouter.get('/',async(ctx)=>{
  ctx.body = 'this is user / ';
});

userRouter.post('/register',async(ctx)=>{
  let postData = ctx.request.body;
  console.log(postData+'----test----');
  let User = mongoose.model('User')
  let newUser = new User(postData);

  await newUser.save().then(()=>{
    ctx.body = {
      code:200,
      message:'注册成功'
    }
  }).catch(error=>{
    ctx.body = {
      code:500,
      message:error
    }
  })

});

userRouter.post('/login',async(ctx)=>{
  let userLogin = ctx.request.body;
  let userName = userLogin.userName;
  let password = userLogin.password;
  const User = mongoose.model('User');
  await User.findOne({userName:userName}).exec().then(async(result)=>{
    if(result){
      let newUser = new User();
      await newUser.comparePassword(password,result.password)
      .then((isMatch)=>{
        ctx.body = {code:200,message:isMatch}
      })
      .catch(error=>{
        console.log(error);
        ctx.body = {
          code:500,message:error
        }
      })
    }else{
      ctx.body = {
        code:500,message:'userName is not existent'
      }
    }
  }).catch(error=>{
    console.log(error);
    ctx.body = {
      code:500,message:error
    }
  })
})

module.exports = userRouter;
