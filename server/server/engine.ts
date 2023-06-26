import fs from "fs"
import path from "path"
import { IncomingMessage, ServerResponse } from "http"


export const createDataBase = (req:IncomingMessage, res:ServerResponse) =>{

    interface organizations {
        
            organization: string;
            createdAt: string;
            updatedAt: string;
            products: string[];
            marketValue: string;
            address: string;
            ceo: string;
            country: string;
            id: number;
            noOfEmployees:number;
            employees:string[]
          
    }
   let data = ""
   req.on("data", (chunk)=>{
    data += chunk
   })
   req.on("end", ()=>{
    let order = JSON.parse(data);
   //    create database folder and file

 const dataBaseFolder = path.join(__dirname, "database");
 const dataBaseFile = path.join(dataBaseFolder, "database.json")

//  create dynamic database
if(!fs.existsSync(dataBaseFolder)){
    fs.mkdirSync(dataBaseFolder)
}
if(!fs.existsSync(dataBaseFile)){
    fs.writeFileSync(dataBaseFile, "")
}


return fs.readFile(dataBaseFile, "utf-8" ,(err, info)=>{
  if(err) {
    res.writeHead(500,{
        "Content-Type": "application/json",       
    })
    res.end(JSON.stringify({
        success: false,
        error: err
    }))
  } else{
    let organization : organizations[] =[];
    try {
       organization = JSON.parse(info) 
    } catch (parseError) {
      organization = []
    }
    order.createdAt = new Date()
    order.updatedAt = new Date()

     order.noOfEmployees = order.employees.length;
     if(organization.length === 0){
        order.id = 1
     }else{
        let ids = organization.map((a =>a.id));
        let newId = Math.max(...ids)
        order.id = newId + 1
     }
     organization.push(order)
    


    fs.writeFile(dataBaseFile, JSON.stringify(organization, null, 2),( err)=>{
      if(err) {
       res.writeHead(500,{ "Content-Type": "application/json"}) 
       res.end(JSON.stringify({
        success: false,
        error : err
       }))
      }else{
        res.writeHead(200,{ "Content-Type": "application/json"}) 
       res.end(JSON.stringify({
        success: true,
        message : order
       }))
      }     
    })
  }

})

   })


}

// GET ALL DATA 

export const getAllData = (req:IncomingMessage, res:ServerResponse)=>{

 return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8",(err, info)=>{
      if(err){
        res.writeHead(500, {"Content-Type":"application/json"})
        res.end(JSON.stringify({
          success : false,
          error : err
        }))
      }else{
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(JSON.stringify({
          success : true,
          data : JSON.parse(info)
        }))
        
      }
 })}

//  UPDATE DATA

export const updateData = (req:IncomingMessage, res:ServerResponse)=>{
  interface organizations {
        
    organization: string;
    createdAt: string;
    updatedAt: string;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id: number;
    noOfEmployees:number;
    employees:string[]
  
}
let data = ""
req.on("data", (chunk)=>{
data += chunk
})
req.on("end",()=>{
  let order = JSON.parse(data)

  return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, info)=>{
    if(err){
      res.writeHead(500,{
        "Content-Type": "application/json",       
    })
    res.end(JSON.stringify({
        success: false,
        error: err
    }))
    }else{
      let organization:organizations[] = JSON.parse(info)
      let dataUpdate = organization.findIndex((x => x.id === order.id))
      organization[dataUpdate] = order
      order.updatedAt = new Date()
   fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2),(err)=>{
    if(err) {
      res.writeHead(500,{ "Content-Type": "application/json"}) 
      res.end(JSON.stringify({
       success: false,
       error : err
      }))
     
     }else{
       res.writeHead(200,{ "Content-Type": "application/json"}) 
      res.end(JSON.stringify({
       success: true,
       message : order
      }))
     }     
   })
    }
   
  })
})

}




// DELETE DATA

export const deleteData = (req:IncomingMessage, res:ServerResponse)=>{
  interface organizations {
        
    organization: string;
    createdAt: string;
    updatedAt: string;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id: number;
    noOfEmployees:number;
    employees:string[]
  
}
let data = ""
req.on("data", (chunk)=>{
data += chunk
})
req.on("end",()=>{
  let order = JSON.parse(data)

  return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, info)=>{
    if(err){
      res.writeHead(500,{
        "Content-Type": "application/json",       
    })
    res.end(JSON.stringify({
        success: false,
        error: err
    }))
    }else{
      let organization:organizations[] = JSON.parse(info)
      let findeDataIndex = organization.findIndex((x => x.id === order.id))
        organization.splice(findeDataIndex, 1)
        
     
   fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2),(err)=>{
    if(err) {
      res.writeHead(500,{ "Content-Type": "application/json"}) 
      res.end(JSON.stringify({
       success: false,
       error : err
      }))
     }else{
       res.writeHead(200,{ "Content-Type": "application/json"}) 
      res.end(JSON.stringify({
       success: true,
       message : order
      }))
     }     
   })
    }
   
  })
})

}