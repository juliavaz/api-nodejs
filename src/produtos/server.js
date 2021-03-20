const express =  require("express");
const bodyParser =  require("body-parser");

const app = express();
app.use(bodyParser.json({}));

// chamando os métodos
const router = require("./router");
app.use(router);

// exec servidor
const port = 3000;
app.listen(port, function() {
    console.log(`- - - -   Servidor iniciado em http://localhost:${port}/ !   - - - - `);
});
