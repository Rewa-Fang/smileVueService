const Router = require('koa-router');
let userRouter = new Router();

userRouter.get('/',async(ctx)=>{
  ctx.body = 'this is user / ';
});

userRouter.post('/register',async(ctx)=>{
  let postData = ctx.request.body;
  console.log(postData+'----test----');
  ctx.body= postData;
});


module.exports = userRouter;
