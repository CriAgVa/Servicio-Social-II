var express = require("express");
var router = express.Router();

//Conectando a la BD
var mongoose = require("mongoose");

//Utilizando un Modelo
var encuesta = mongoose.model("M_encuestas");

var contenidos = mongoose.model("M_contenidos")

router.get("/contenidos/servicio:s/", function(req, res){
    contenidos.find({nombre:req.params.s})
        .exec(function(error, resultado) {
            if (error === null) {
                res.json(resultado);
            } else {
                res.json({ status: false, error: error });
            }
        });
});

router.get("/contenidos/", function(req, res){
    contenidos.find()
        .exec(function(error, resultado) {
            if (error === null) {
                res.json(resultado);
            } else {
                res.json({ status: false, error: error });
            }
        });
});

router.get("/", function(req, res) {
    encuesta.find({})
        .sort({periodo: "asc"})
        .exec(function(error, resultado) {
            if (error === null) {
                res.json(resultado);
            } else {
                res.json({ status: false, error: error });
            }
        });
});

router.get("/id:id", function(req, res) {
    encuesta.find({_id:req.params.id})
        .exec(function(error, resultado) {
            if (error === null) {
                res.json(resultado);
            } else {
                res.json({ status: false, error: error });
            }
        });
});

router.get("/periodo:p/depto:d", function(req, res){
    encuesta.find({ $and:[ {periodo:req.params.p} , {departamento:req.params.d} ]} )
        .sort({periodo: "asc"})
        .exec(function(error, resultado) {
            if (error === null) {
                res.json(resultado);
            } else {
                res.json({ status: false, error: error });
            }
        });
});

module.exports = router;