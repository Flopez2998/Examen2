//Obtengo nuestra base de datos conectada
const { Timestamp } = require('mongodb');
const db = require('../db');
var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;

//definimos una estructura

//Definimos nuestra clase
class ProductsModel{

    //definimos un cosntructor por que es poo
    constructor(){
      this.collection = null;
      MongoDB.getDb()
      .then(
          (db)=>{
              this.collection = db.collection("ordenes");
          }
      ).catch((ex)=>{
        console.log(ex);
        throw(ex);
      });
    }

    //metodo para optener todas las colleciones de la base 
    async getAll(){
        try{
        let  rstls = await this.collection.find({}).toArray();
        return rstls;
        }catch(ex){
            console.log(ex);
            throw(ex);
        }
    }

    async getById(id){
        try{
            const _id = new ObjectID(id);
            let oneDoc = await this.collection.findOne({_id});
            return oneDoc;
        }catch(ex){
            throw(ex);
        }
    }

   
}
module.exports = ProductsModel;