var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    user: {type:String},
    password: {type:String}
});

mongoose.model("M_Users", UsersSchema, "Users");
//nombre del modelo, variable de estructura, Colección de mongo