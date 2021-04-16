import express from "express";
import router from "./router.js";

import './database/connection.js'

class Index {
    constructor() {
        this.index = express();
        this.middlewares();
        this.router();
    }
    middlewares() {
        this.index.use(express.json());
    }
    router() {
        this.index.use(router);
    }
}

export default new Index().index;