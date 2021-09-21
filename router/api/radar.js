const router = require('express').Router();

//comprobar si llega la peticion api/radar
router.get('/', (req, res) => {
    const valor = '{correcto: ok}';
    res.send(valor);

});

/**
 * Ejemplos de prueba:
 * 
 * {"protocols":["closest-enemies"],"scan":[{"enemies":{"number":10,"type":"soldier"},"coordinates":{"y":35,"x":5}},{"enemies":{"number":20,"type":"soldier"},"coordinates":{"y":30,"x":10}}]}
 * 
 * {"protocols":["closest-enemies"],"scan":[{"coordinates":{"x":89,"y":13},"enemies":{"type":"mech","number":1}},{"coordinates":{"x":11,"y":35},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":19,"y":49},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":38,"y":21},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":10,"y":39},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":13,"y":38},"enemies":{"type":"soldier","number":15}},{"coordinates":{"x":13,"y":15},"enemies":{"type":"soldier","number":60}},{"coordinates":{"x":30,"y":19},"enemies":{"type":"soldier","number":40}},{"coordinates":{"x":30,"y":11},"enemies":{"type":"soldier","number":20}},{"coordinates":{"x":15,"y":19},"enemies":{"type":"soldier","number":80}},{"coordinates":{"x":22,"y":15},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":10,"y":19},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":94,"y":11},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":10,"y":19},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":90,"y":18},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":80,"y":51},"enemies":{"type":"soldier","number":15}},{"coordinates":{"x":70,"y":91},"enemies":{"type":"soldier","number":60}},{"coordinates":{"x":30,"y":11},"enemies":{"type":"soldier","number":40}},{"coordinates":{"x":30,"y":95},"enemies":{"type":"mech","number":20}},{"coordinates":{"x":1,"y":89},"enemies":{"type":"soldier","number":80}},{"coordinates":{"x":3,"y":11},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":54,"y":19},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":22,"y":38},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":3,"y":10},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":43,"y":13},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":51,"y":13},"enemies":{"type":"soldier","number":15}},{"coordinates":{"x":91,"y":30},"enemies":{"type":"soldier","number":60}},{"coordinates":{"x":11,"y":30},"enemies":{"type":"soldier","number":40}},{"coordinates":{"x":91,"y":15},"enemies":{"type":"soldier","number":20}},{"coordinates":{"x":51,"y":22},"enemies":{"type":"soldier","number":80}},{"coordinates":{"x":91,"y":10},"enemies":{"type":"mech","number":10}},{"coordinates":{"x":11,"y":84},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":91,"y":65},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":81,"y":53},"enemies":{"type":"mech","number":30}},{"coordinates":{"x":15,"y":70},"enemies":{"type":"soldier","number":30}},{"coordinates":{"x":19,"y":83},"enemies":{"type":"soldier","number":15}},{"coordinates":{"x":11,"y":46},"enemies":{"type":"soldier","number":60}},{"coordinates":{"x":59,"y":26},"enemies":{"type":"soldier","number":40}},{"coordinates":{"x":98,"y":57},"enemies":{"type":"soldier","number":20}},{"coordinates":{"x":11,"y":58},"enemies":{"type":"mech","number":80}},{"coordinates":{"x":91,"y":39},"enemies":{"type":"mech","number":10}},{"coordinates":{"x":83,"y":37},"enemies":{"type":"soldier","number":10}},{"coordinates":{"x":0,"y":11},"enemies":{"type":"mech","number":1}}]}
 * 
 * {"protocols":["furthest-enemies"],"scan":[{"enemies":{"number":10,"type":"soldier"},"coordinates":{"y":35,"x":5}},{"enemies":{"number":20,"type":"soldier"},"coordinates":{"y":30,"x":10}}]}
 * 
 * 
 */
router.post('/', async (req, res) => {
    const respuesta = await req.body;

    var miarray = [];
    const valor = respuesta;
    const valor2 = valor.protocols[0];
    var final;

    if ('closest-enemies' == valor2) {

        for (var i = 0; i < respuesta.scan.length; i++) {
            const tmp = respuesta.scan[i].coordinates.x;
            miarray.push(tmp);
        }

        var numMenorX = Math.min(...miarray);
        var numY;

        for (var j = 0; j < miarray.length; j++) {
            if (miarray[j] == numMenorX) {
                if (respuesta.scan[j].coordinates.x == numMenorX) {
                    numY = respuesta.scan[j].coordinates.y
                }
            }
        }
        final = `{ "x":${numMenorX}, "y":${numY} }`
    }

    if ('furthest-enemies' == valor2) {

        for (var i = 0; i < respuesta.scan.length; i++) {
            const tmp = respuesta.scan[i].coordinates.x;
            miarray.push(tmp);
        }

        var numMaxX = Math.max(...miarray);
        var numY;

        for (var j = 0; j < miarray.length; j++) {
            if (miarray[j] == numMaxX) {
                if (respuesta.scan[j].coordinates.x == numMaxX) {
                    numY = respuesta.scan[j].coordinates.y
                }
            }
        }
        final = `{ "x":${numMaxX}, "y":${numY} }`

    }

    res.send(final);

});

module.exports = router;