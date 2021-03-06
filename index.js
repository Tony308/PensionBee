const http = require('http');
const fs = require('fs');
require('dotenv').config();

const readFile = async (file) => {
    return await new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

const replaceContent = async (data, contentFile) => {
    let lines = data;
    
    // const lines = data.split("\n");
    let content = await readFile(contentFile)
    .catch(err => err);
    const ans = lines.replace("{{content}}", content);
    return ans;
    // return lines.map((line) => {
    //     if (line.includes(`{{content}}`)) {
    //         return content;
    //     } else {
    //         return line;
    //     }
    // }).join("\n");
    
}

const app = http.createServer(async (req, res) => {
    const {url} = req;
    let data;
        try {
            data = await readFile("./template.html");
        } catch (err) {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/html"});
            res.write(err);
            return res.end();            
        }

    if (url === "/about-page") {
        res.writeHead(200, {"Content-Type": "text/html"});
        const page = await replaceContent(data, "./content/about-page/index.md");
        res.write(page);
        return res.end();
        
    } else if (url === "/blog/june/company-update") {
        res.writeHead(200, {"Content-Type": "text/html"});
        const page = await replaceContent(data, "./content/blog/june/company-update/index.md");
        res.write(page);
        return res.end();
        
    } else if (url === "/jobs") {
        res.writeHead(200, {"Content-Type": "text/html"});
        const page = await replaceContent(data, "./content/jobs/index.md");

        res.write(page);
        return res.end();

    } else if (url === "/valves") {
        res.writeHead(200, {"Content-Type": "text/html"});
        const page = await replaceContent(data, "./content/valves/index.md");

        res.write(page);
        return res.end();

    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("<h1>RESOURCE NOT FOUND</h1>");
        return res.end();
    }
   
}).listen(process.env.PORT);

module.exports = app;