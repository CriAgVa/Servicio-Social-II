var express = require("express");
var router = express.Router()
const XLSX = require("xlsx");

router.post("/csv/", function(req, res) {
    var config = new Object;

    config = {
        delimiter: ",",
        newline: "\r\n",
        header: true,
        columns: ["Nombre", "Egreso", "Boleta", "Correo", "Pregunta_1", "Pregunta_2", "Pregunta_3", "Pregunta_4", "Pregunta_5", "Pregunta_6", "Pregunta_7", "Pregunta_8", "Pregunta_9", "Pregunta_10", "Pregunta_11", "Pregunta_12", "Pregunta_13", "Pregunta_14", "Pregunta_15", "Pregunta_16", "Pregunta_17", "Pregunta_18", "Pregunta_19", "Pregunta_20", "Pregunta_21", "Pregunta_22", "Pregunta_23", "Pregunta_24", "Pregunta_25", "Pregunta_26", "Pregunta_27", "Pregunta_28", "Pregunta_29", "Pregunta_30", "Pregunta_31", "Pregunta_32", "Pregunta_33", "Pregunta_34", "Pregunta_35", "Pregunta_36", "Pregunta_37", "Pregunta_38", "Pregunta_39", "Pregunta_40"],
        step: function(results, parser) {
            console.log("Row data:", results.data);
            console.log("Row errors:", results.errors);
        },
        complete: function(results, file) {
            console.log("Parsing complete:", results, file);
        }
    }

    console.log(Object.keys(req.body).length)
    var encuestaExcel = [];
    var aux = [];
    for (var i = 0; i < Object.keys(req.body).length; i++) {
        aux.push(req.body[i])
    }

    console.log(encuestaExcel)
    var csv = Papa.unparse(encuestaExcel, config);

    fs.writeFile("excel/encuestas.csv", csv, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File written successfully\n")
        }
    });
});

module.exports = router;