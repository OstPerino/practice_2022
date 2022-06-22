const express = require("express");
const app = express();

app.get("/", function(request, response){
    response.send("<p>Hello!</p>");
});
app.listen(3000);
