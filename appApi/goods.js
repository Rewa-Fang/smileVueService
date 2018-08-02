const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

//插入所有good info 
router.get('/isnertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value,index)=>{
            let newGoods = new Goods(value);
            newGoods.save().then(()=>{
                saveCount++;
                console.log('success'+saveCount);
            }).catch(err=>{
                console.log('error' + err);
            })
        })
    })
    ctx.body = 'start insert data';
});
//插入分类数据
router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./category.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value,index)=>{
            let newCategory = new Category(value);
            newCategory.save().then(()=>{
                saveCount++;
                console.log('success'+saveCount);
            }).catch(err=>{
                console.log('error' + err);
            })
        })
    })
    ctx.body = 'start insert data';
});
////插入子类数据
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功插入'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        }) 
    })
    ctx.body="开始导入数据"
});
//根据goodsId 获取goodsInfo
router.post('/getDetailGoodsInfo',async(ctx)=>{
    try {
        let goodsId = ctx.request.body.goodsId;
        const goods = mongoose.model('Goods');
        let result=await goods.findOne({ID:goodsId}).exec();
        ctx.body = {code:200,message:result}
    } catch(error) {
        ctx.body = {code:500,message:error}
    }
});

//获取商品大类别
router.get('/getCategoryList',async(ctx)=>{
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {code:200,message:result};
    } catch (error) {
        ctx.body = {code:200,message:error}
    }
});

//根据大类别id 获取子类列表
router.post('/getCategorySubList',async(ctx)=>{
    try {
        const CategorySub = mongoose.model('CategorySub');
        let categoryID = ctx.request.body.categoryID;
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryID}).exec();
        ctx.body = {code:200,message:result};
    } catch (error) {
        ctx.body = {code:500,message:error};
    }
});
// 根据子类别id 获取商品列表
router.get('/getGoodsListByCategorySubID',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods');
        // let categorySubID = ctx.request.body.categorySubID;
        let categorySubID = '402880e86016d1b5016016e549710020';
        let result = await Goods.find({SUB_ID:categorySubID}).exec();
        ctx.body = {code:200,message:result};
    } catch (error) {
        ctx.body = {code:500,message:error};
    }
});

module.exports = router;
