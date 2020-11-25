const express = require("express");
const fs = require("fs");
let router = express.Router();

let productosArray = [];

const writeToFile = ()=>{
fs.writeFileSync('productos.json', JSON.stringify(productosArray));
}

const readFromFile = ()=>{
try{
let tmpJsonStr = fs.readFileSync('productos.json');
productosArray = JSON.parse(tmpJsonStr);
} catch(ex){
    productosArray = [];
}
}


router.get('/all', (req, res)=>{
res.status(200).json(productosArray);
} );

router.get('/one/:id', (req, res)=>{
    let { id } = req.params;
    id = Number(id);
    let products = productosArray.find((o, i)=>{
    return o.id === id;
    })
    res.status(200).json(products);

});


module.exports = router;
