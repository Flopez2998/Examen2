// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

//nombre cliente
//correo cliente
//telefono
//producto
//forma pago
//estado orden


//let productModel = require('../../models/productos.model')();

const ProductModelClass = require('../../models/productos/productos.models');
const mdbProductModel = new ProductModelClass();

router.get('/all', async (req, res)=>{
  try{
    const rslt = await mdbProductModel.getAll();
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({"msg":"Algo Paso Mal."});
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbProductModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.post('/new', async (req, res)=>{
  try{
    let { nombre, correo, telefono, producto, formaPago, estadoOrd} = req.body;
    
    var rslt = await mdbProductModel.addOne({ nombre, correo, telefono, producto, formaPago, estadoOrd}); 
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let {estadoOrd} = req.body;
    let rslt = await mdbProductModel.updateById(id, estadoOrd);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});
module.exports = router;
