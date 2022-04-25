var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contenidosSchema = new Schema({
    preguntas : [{type:Object}],
    respuestas: [{type:Object}],
    tramiteServicio: [{type:Object}],
    nombre: {type:String}
});

mongoose.model("M_contenidos", contenidosSchema, "contenidos");
//nombre del modelo, variable de estructura, Colección de mongo