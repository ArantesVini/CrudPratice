// const fs = require("fs");
import fs from  "fs";
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

function create(content: string) {
    // save content on system
    fs.writeFileSync(DB_FILE_PATH, content)
    return content;
}

console.log(create("Creating some content, now with Typescript!"));