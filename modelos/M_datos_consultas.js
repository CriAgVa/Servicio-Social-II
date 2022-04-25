var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datos_consultasSchema = new Schema({
    Documento : {type:String},
    clave_documento: {type:String},
    fecha_emision: {type:Date},
    emision: {type:String},
    periodo: {type:String}
});

mongoose.model("M_datos_consultas", datos_consultasSchema, "datos_consultas");
//nombre del modelo, variable de estructura, Colección de mongo