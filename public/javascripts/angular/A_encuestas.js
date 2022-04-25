(function() {
    var app = angular.module("SSII", []);

    app.controller("EncuestasCtrl", function($scope, $http, $window) {
        $scope.hola = "Lector de encuestas";
        $scope.encuestas = [];
        $scope.respuestas = [];
        $scope.encuestasGestion = [];
        $scope.encuestasServicios = [];
        $scope.encuestasCultura = [];
        $scope.encuestasDeporte = [];
        $scope.periodos = [];
        $scope.periodo = {};
        $scope.departamento = {};

        $scope.preguntas = [];
        $scope.encuesta = [];
        $scope.encuesta_activa = {};

        $scope.valor_respuestas = [];

        $scope.respuestas_visibility = false;
        $scope.tabla_visibility = true;

        $scope.encuestas_reporte = [];
        $scope.encuestas_reporte_preguntas = [];

        $scope.obtener_valores = function(){
            var obj_respuesta = new Object();
            var enc = [];
            if ($scope.departamento == "GestionEscolar"){
                $scope.encuestasGestion.forEach(element => {
                    enc.push(element);
                });
            }else if ($scope.departamento == "Servicios"){
                $scope.encuestasServicios.forEach(element => {
                    enc.push(element);
                });
            }else if ($scope.departamento == "ActividadesCulturales"){
                $scope.encuestasCultura.forEach(element => {
                    enc.push(element);
                });
            }else if ($scope.departamento == "Deportivas"){
                $scope.encuestasDeporte.forEach(element => {
                    enc.push(element);
                });
            }
            for (var i = 0; i < enc.length; i++){
                obj_respuesta = {}
                var preguntas = enc[i].preguntas;
                var P = [];
                var PR = new Object();
                preguntas.forEach(element => {
                    PR = {}
                    PR.pregunta = element.indexPregunta;
                    switch (element.respuesta){
                        case "Insatisfactorio":
                            PR.valor = 1;
                        break;
                        case "Malo":
                            PR.valor = 2;
                        break;
                        case "Regular":
                            PR.valor = 3;
                        break;
                        case "Bueno":
                            PR.valor = 4;
                        break;
                        case "Satisfactorio":
                            PR.valor = 5;
                        break;
                    }
                    P.push(PR)
                });
                obj_respuesta.pregunta = P;
                obj_respuesta.folio = enc[i].folio//2
                obj_respuesta.comentario = enc[i].comentarios//3
                $scope.encuestas_reporte.push(obj_respuesta); //4
            }

            $scope.encuestas_reporte.forEach(element => {
                element.pregunta.sort((a, b)=>{
                    return a.pregunta - b.pregunta
                })
            });

            $scope.respuestas_visibility = true;
            $scope.tabla_visibility = false;
        }

        $scope.prueba = function(){
            $http.get("/encuestas/id"+$scope.encuesta_activa.id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrio un error")
                    }else{
                        $scope.respuestas = respuesta.data[0].preguntas
                        for (var i = 0; i < $scope.respuestas.length; i++){
                            for (var j = 0; j < $scope.preguntas.length; j++){  
                                var idxP = j+1;
                                if ($scope.respuestas[i].indexPregunta == idxP){
                                    var PR = {pregunta: $scope.preguntas[j].pregunta, respuesta: $scope.respuestas[i].respuesta}
                                    switch ($scope.respuestas[i].respuesta){
                                        case "Insatisfactorio":
                                            PR.valor = 1;
                                        break;
                                        case "Malo":
                                            PR.valor = 2;
                                        break;
                                        case "Regular":
                                            PR.valor = 3;
                                        break;
                                        case "Bueno":
                                            PR.valor = 4;
                                        break;
                                        case "Satisfactorio":
                                            PR.valor = 5;
                                        break;
                                    }
                                    $scope.encuesta.push(PR) ;
                                    j = $scope.preguntas.length
                                }
                            }
                        }
                    }
                 });

        }




        $scope.getPreguntas = function(){
            $http.get("/encuestas/contenidos/servicio"+$scope.departamento)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrio un error")
                    }else{
                        var stringPrueba = respuesta.data[0].preguntas[0];
                        var keys = Object.keys(stringPrueba)
                        keys.forEach(pregunta =>{
                            $scope.preguntas.push({
                                pregunta: stringPrueba[pregunta]
                            })
                        });
                        
                        console.log($scope.preguntas)
                    }
                 });
        }

        $scope.enviar = function(idx){
            var id = "";
            if($scope.departamento == "GestionEscolar"){
                id = $scope.encuestasGestion[idx]._id
            }else if($scope.departamento == "Servicios") {
                id = $scope.encuestasServicios[idx]._id
            }else if($scope.departamento == "ActividadesCulturales") {
                id = $scope.encuestasCultura[idx]._id
            }else if($scope.departamento == "Deportivas") {
                id = $scope.encuestasDeporte[idx]._id
            }

            $http.get("/encuestas/id"+id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrio un error")
                    }else{
                        $window.location.href = '/detalles/e'+id;
                    }
                 });
        }

        $scope.encontrar_encuesta = function(){
            console.log(encuesta_activa.id)
        }

        $scope.filtrar = function(){
            $scope.encuestasGestion = [];
            $scope.encuestasServicios = [];
            $scope.encuestasCultura = [];
            $scope.encuestasDeporte = [];

            $scope.valor_respuestas = [];

            

            for (var i = 0; i < $scope.encuestas.length; i++){
                if ($scope.encuestas[i].periodo == $scope.periodo && $scope.encuestas[i].departamento == "Gestion"){
                    $scope.encuestasGestion.push($scope.encuestas[i]);
                    
                    //obj_respuesta.pregunta = $scope.encuestasGestion[i].preguntas//1
                    //obj_respuesta.folio = $scope.encuestasGestion[i].folio//2
                    //obj_respuesta.comentario = $scope.encuestasGestion[i].comentarios//3
                    //respuestas.push(obj_respuesta); //4
                }else if ($scope.encuestas[i].periodo == $scope.periodo && $scope.encuestas[i].departamento == "Servicios"){
                    $scope.encuestasServicios.push($scope.encuestas[i]);  
                }else if ($scope.encuestas[i].periodo == $scope.periodo && $scope.encuestas[i].departamento == "Cultura"){
                    $scope.encuestasCultura.push($scope.encuestas[i]);
                }else if ($scope.encuestas[i].periodo == $scope.periodo && $scope.encuestas[i].departamento == "Deporte"){
                    $scope.encuestasDeporte.push($scope.encuestas[i]);
                }
                
            }
            
        }

        $scope.getEncuesta = function(){
            $http.get("/encuestas/")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrio un error")
                    }else{
                        $scope.encuestas = respuesta.data;
                        for (var i = 0 ; i < $scope.encuestas.length ; i++){
                            if($scope.encuestas[i].departamento == "Gestion"){
                                $scope.encuestasGestion.push($scope.encuestas[i]) ;
                            }else if ($scope.encuestas[i].departamento == "Servicios"){
                                $scope.encuestasServicios.push($scope.encuestas[i]);
                            }else if ($scope.encuestas[i].departamento == "Cultura"){
                                $scope.encuestasCultura.push($scope.encuestas[i]);
                            }else if($scope.encuestas[i].departamento == "Deporte"){
                                $scope.encuestasDeporte.push($scope.encuestas[i]);
                            }
                            if (!($scope.periodos.includes($scope.encuestas[i].periodo))){
                                $scope.periodos.push($scope.encuestas[i].periodo)
                            }
                            
                        }
                        //$scope.respuestas = $scope.encuestasGestion[0].preguntas
                    }
                 });
        }

        $scope.getEncuesta();
    });
})();