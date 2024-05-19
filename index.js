const fs=require('fs');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');

let HOST=5000;

const app=express();
app.use(cors());
app.use(bodyParser.json());

fs.readFile('./data.json','utf8',(err,data)=>{
    if(!err){
        let appleProducts=JSON.parse(data);
        console.log(appleProducts);
        app.get('/getProducts', (req, res) => {
            let limit = parseInt(req.query.limit) || 5; // default limit i set as 5
            let offset = parseInt(req.query.offset) || 0; // default offset i set as 0
    
            let paginatedProducts = appleProducts.slice(offset, offset + limit);
            res.send(paginatedProducts);
        });

        app.get('/getProducts/:id',(req,res)=>{
            let searchingId=req.params.id;
            let findedProduct=appleProducts.find((item)=>item.id==searchingId);
            if(!findedProduct){
                res.status(404).send('There is no such a id in our products');
            }else{
                res.send(findedProduct);
            }
        })
    }else{
        console.error('Error reading this file:',err);
    }
});


app.listen(HOST,function(){
    console.log(`localhost:${HOST}`);
});

