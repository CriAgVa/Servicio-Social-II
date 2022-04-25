var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var encuestasSchema = new Schema({
    preguntas : [{type:Object}],
    folio   : {type:Number},
    periodo: {type:String},
    tramite: {type:String},
    departamento: {type:String},
    comentarios: {type:String},
    fecha:{type:Date}
});

mongoose.model("M_encuestas", encuestasSchema, "encuestas");
//nombre del modelo, variable de estructura, Colección de mongo