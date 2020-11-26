//Obtengo nuestra base de datos conectada
const { Timestamp } = require('mongodb');
//const db = require('../db');
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

    async addOne(document) {
        try{
          var result = await this.collection.insertOne(document);
          return result;
        }catch(ex){
          throw(ex);
        }
      }

      async updateById(id, estado){
        try{
          const _id = new ObjectID(id);
          // UPDATE TABLE SET attr = val, attr = val where attr = val;
          const updOps = {"$set":{"estadoOrd":estado}};
          let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal:false});
          return updDoc;
        }catch(ex){
          throw(ex);
        }
      }


   
}
module.exports = ProductsModel;