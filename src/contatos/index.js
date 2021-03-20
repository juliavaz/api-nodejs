const express =  require("express");
const bodyParser =  require("body-parser");

const router = require("./router");

const app = express();
app.use(bodyParser.json({extended: true}));

app.use(router);

// exec servidor
const port = 3000;
app.listen(port, function() {
    console.log(`- - - -   Servidor iniciado em http://localhost:${port}/ !   - - - - `);
});