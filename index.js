const Koa = require('koa');
const app = new Koa;

app.use(async(ctx)=>{
  ctx.body = '<h1>Hello world!  smileVueService</h1>'
});

app.listen(3000,()=>{
  console.log('welcome to koa wolrd.');
})