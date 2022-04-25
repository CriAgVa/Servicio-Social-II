var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foliosSchema = new Schema({
    comentarios: [{type:Object}],
    departamento: {type:String},
    tramite: {type:String},
    folio : {type:Number},
    identificacion: {type:String},
    conteoInsatisfactorio: {type:Number},
    conteoMalo: {type:Number},
    conteoRegular: {type:Number},
    conteoBueno: {type:Number},
    conteoSatisfactorio: {type:Number}
});

mongoose.model("M_folios", foliosSchema, "folios");
//nombre del modelo, variable de estructura, Colección de mongo