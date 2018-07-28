// const fs = require('fs');

// fs.readFile('.goods.json','utf8',function(err,data){
//     let newData = JSON.parse(data);
//     let i = 0;
//     let pushData = [];
//     newData.RECORDS.map((value,index)=>{
//         if(value.IMAGE1){
//             i++;
//             console.log(value.NAME);
//             pushData.push(value);
//         }
//     })
//     console.log(i);
//     console.log(pushData);
// })

const fs = require('fs')


fs.readFile('.goods.json', 'utf8', function(err, data){

    let newData= JSON.parse(data)
    let i=0
    let pushData=[]
    newData.RECORDS.map(function(value,index){
        if(value.IMAGE1!=null){
            i++
            console.log(value.NAME)
            pushData.push(value)
        }  
    })
    console.log(i)
    console.log(pushData)
});