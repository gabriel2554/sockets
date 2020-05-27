"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const environment_1 = require("./global/environment");
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
const server = server_1.default.instance;
//BODY PARSER
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//MOGOOSE
/*mongoose.connect( `mongodb://${DB_URL }`),{
    useCreateIndex: true,  useNewUrlParser: true, useUnifiedTopology: true
},
(err:any ) => {
    if (err) throw err;
    
    const DB = DB_URL.split('/');
    const DB_NAME = DB[DB.length -1];
    
    console.log(`Conectando a la base de datos:${DB_NAME}`);
}*/
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`servidor corriendo en ${environment_1.SERVER_PORT}`);
});
