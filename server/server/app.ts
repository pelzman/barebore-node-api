import http, { IncomingMessage, Server, ServerResponse } from "http";
import { createDataBase,getAllData, updateData, deleteData } from "./engine";
/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST" && req.url == "/data/add") {
     return createDataBase(req, res);
    }else if(req.method ==="GET" && req.url==="/data"){
      return getAllData(req , res)
    }
    else if(req.method === "PUT" && req.url ==="/data/update"){
      return updateData(req, res);
    } else if(req.method === "DELETE" && req.url ==="/data/delete"){
      return deleteData(req, res);
    }
 
  }
);

server.listen(3005, ()=>console.log( `server start running on port ${3005}`))
