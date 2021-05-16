const fs = require("fs");
const main = fs.readFileSync("./src/main.js","utf-8");
const undoredo = fs.readFileSync("./src/undoredo.js","utf-8");
const core = fs.readFileSync("./src/core.js","utf-8");


const dt = new Date();
const month = dt.getMonth()+1;
const date = 
    dt.getFullYear()+"."
    +month+"."
    +dt.getDate()+"."
    +dt.getHours()+":"
    +dt.getMinutes()+":"
    +dt.getSeconds();


//main->udoredo->core
const text = 
    "javascript:(function(){\n//build:"
    +date
    +"\n"
    +main
    +undoredo
    +core
    +"\n})();"


fs.writeFileSync("./build/webPainter.js",text,(err)=>{
    if(err) throw err;
});
console.log(date+"\nwebPainter.jsをビルドしました。")
