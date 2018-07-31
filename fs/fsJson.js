const fs = require('fs');

fs.readFile('goods.json','utf8',function(err,data){
    let newData = JSON.parse(data);
    let i = 0;
    let pushData = [];
    newData.RECORDS.map((value,index)=>{
        if(value.IMAGE1){
            i++;
            console.log(value.NAME);
            pushData.push(value);
        }
    })
    console.log(i);
    // console.log(pushData);

    fs.writeFile('./newGoods.json',JSON.stringify(pushData),(err)=>{
        if(err){
            console.log('fail');
        }else{
            console.log('success');
        }
    });
})
