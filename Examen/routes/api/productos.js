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

router.post('/new', (req, res)=>{
    const {id, name, email, phone, prod, pay, state} = req.body;
    const id = productosArray.length + 1;
    productosArray.push({ id, name, email, phone, prod, pay, state });
    writeToFile();
    res.status(200).json({ id, name, email, phone, prod, pay, state });
});

router.put('/upd/:id', (req, res)=>{
    let {id} = req.params;
    id = Number(id);
    let {state} = req.body;
    state = Number(state);


    let modified = false;
    let product = null;
    let newProductosArray = productosArray.map( (o,i)=>{
    if( o.id === id) {
        modified = true;
        o.state = state;
        product = o;
    }
    return o;
    } );
    writeToFile();
    productosArray = newProductosArray;

    res.status(200).json({modified, product});
});

readFromFile();
module.exports = router;
