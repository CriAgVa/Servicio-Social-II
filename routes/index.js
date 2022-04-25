var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Satisfaccion de usuarios' });
});

router.get('/gestion', function(req, res, next) {
  res.render('encuestas_gestion', { title: 'Resultados de encuestas de gestion' });
});

router.get('/cultura', function(req, res, next) {
  res.render('encuestas_cultura', { title: 'Resultados de encuestas de cultura' });
});

router.get('/deporte', function(req, res, next) {
  res.render('encuestas_deporte', { title: 'Resultados de encuestas de deporte' });
});

router.get('/servicios', function(req, res, next) {
  res.render('encuestas_servicios', { title: 'Resultados de encuestas de servicios' });
});

router.get('/detalles/e:id/', function(req, res, next) {
  var encuesta = mongoose.model("M_encuestas");
  encuesta.findById({_id: req.params.id})
          .exec( function (error , resultado ){
            console.log(resultado);
            var dpt = "";
            if ( error === null ){
              if (resultado.departamento == "Gestion"){
                dpt = "GestionEscolar"
              }else if (resultado.departamento == "Servicios"){
                dpt = "Servicios"
              }else if (resultado.departamento == "Cultura"){
                dpt = "ActividadesCulturales"
              }else if (resultado.departamento == "Deporte"){
                dpt = "Deportivas"
              }
              res.render('detalles_encuesta', { title: 'Detalles de la encuesta' , departamento: dpt , id: req.params.id , enc: resultado, respuestas:resultado.preguntas});
            }else{
              res.json( { status: false , error : error } );
            }
  });
});

module.exports = router;
