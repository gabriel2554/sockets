import Server from './clases/server';
import bodyParser from 'body-parser';
import { SERVER_PORT, DB_URL } from './global/environment';
import cors from 'cors';
import mongoose from 'mongoose';
import { Router } from 'express';
import router from './routes/router';


const server = Server.instance;


//BODY PARSER

server.app.use(bodyParser.urlencoded ({extended:true}));
server.app.use(bodyParser.json());

//CORS

server.app.use(cors ({origin:true, credentials:true}))

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

server.app.use('/', router);
server.start( () =>{
    console.log(`servidor corriendo en ${SERVER_PORT}`);
})
