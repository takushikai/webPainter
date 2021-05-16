const fs = require("fs");
const main = require("./src/main","utf-8");
const undoredo = require("./src/undoredo","utf-8");
const core = require("./src/core","utf-8");


var dt = new Date();

const date = 
    dt.getFullYear()+"."
    +dt.getMonth()+1+"."
    +dt.getDate()+"."
    +dt.getHours()+"."
    +dt.getMinutes()+"."
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

