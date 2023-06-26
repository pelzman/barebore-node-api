"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const puppeteer_1 = __importDefault(require("puppeteer"));
/*
implement your server code here
*/
// async function scrapping (){
//   const browser = await puppeteer.launch()
//    const page = await browser.newPage()
//      await page.goto("https://andela.com/careers/")
//     //  const titleName = await page.evaluate(()=>{
//     //   return Array.from(document.querySelectorAll("title")).map(x=>x.textContent)
//     //  })
//     //  await fs.writeFile("tit.txt", titleName.join("\r\n"))
//      const description = await page.evaluate(()=>{
//       return Array.from(document.querySelectorAll("div:nth-child(1) > p")).map(x=>x.textContent)
//      })
//      await fs.writeFile("tit.txt", description.join("\r\n"))
//     //  const images = await page.evaluate(()=>{
//     //   return Array.from(document.querySelectorAll("figure img")).map(x => x.textContent).join()
//     //  } )
//     //  for(let image of images){
//     //   const allImages: string | any= await page.goto(image)
//     //   await fs.writeFile(image , await allImages.buffer())
//     //  }
//      await browser.close()
// }
// scrapping()
const server = http_1.default.createServer((req, res) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", async () => {
        let url = JSON.parse(data);
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const title = await page.title();
        const imageUrl = await page.evaluate(() => {
            let link = Array.from(document.querySelectorAll("img")).map((x) => x.getAttribute("src"));
            return link;
        });
        let result = {
            title: title,
            imageUrl: imageUrl
        };
        await browser.close();
        return result;
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify({
          
            result: result
        }));
    });
});
server.listen(3001);
