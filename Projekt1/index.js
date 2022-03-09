var express = require('express');
var app = express();
app.get('/', function (req, res) {
    var operator = req.query.operator;
    var num1 = +req.query.num1;
    var num2 = +req.query.num2;
    var result = null;
    if (operator == "dodaj")
        result = num1 + num2;
    else if (operator == "usun")
        result = num1 - num2;
    else if (operator == "podziel")
        result = num1 / num2;
    else if (operator == "pomnoz")
        result = num1 * num2;
    res.send(result.toString());
});
app.listen(3000);
