"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var recipe_class_1 = require("./recipe.class");
var item_ingredient_class_1 = require("./item_ingredient.class");
module.exports = add;
var recipeList = [];
//create app instance
var app = express();
//port number
var port = process.env.PORT || 3000;
function add(x, y) {
    return x + y;
}
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); //Parse json http bodies
var store = "";
app.param('store', function (res, req, next, value) {
    req.data = req.data || {}; //Js magic, adding a data property
    req.data.store = value; //JS magx, store the store
    next(); //Allows for redirection if store doesn't exist or something.
});
app.get("/test", function (req, res) {
    //Good to have a simple one just to make
    //sure things work.
    res.send('{"test": 1 }');
    //event handler for echo endpoint
});
//GET recipelist. no parameters, returns recipe object list in json
app.get("/recipelist", function (req, res) {
    res.header("Content-Type", "application/json");
    //console.log(recipeList);
    res.send({ recipes: recipeList });
});
//GET retrieve recipelist. recipe name as parameter, returns recipe object in json
app.get("/retrieverecipe:recipename", function (req, res) {
    var recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);
    for (var i = 0; i < recipeList.length; i++) {
        if (recipeList[i].recipeName == recipeNameParameter) {
            res.header("Content-Type", "application/json");
            res.send({ recipe: recipeList[i] });
            break;
        }
    }
    res.header("Content-Type", "application/json");
    res.send({ error: 'recipe not found' });
});
//GET deletes recipe from parameter name
app.get("/deleterecipe:recipename", function (req, res) {
    var recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);
    for (var i = 0; i < recipeList.length; i++) {
        if (recipeList[i].recipeName == recipeNameParameter) {
            console.log(recipeList[i].recipeName + " equals " + recipeNameParameter);
            res.header("Content-Type", "application/json");
            res.send({ recipe: recipeList[i] });
            recipeList.splice(i, 1);
            break;
        }
    }
    res.header("Content-Type", "application/json");
    res.send({ error: 'recipe not found' });
});
//POST adds recipe from object
app.post("/add", function (req, res) {
    console.log("body", req.body); //should be request body
    recipeList.push(req.body);
    res.header("Content-Type", "application/json");
    res.send({ error: 'recipe added' });
});
//serve app at the given port
app.listen(port, function () {
    //callback successful
    console.log("Listening at http://localhost:" + port + "/");
});
//populate recipe list
var brocolli = new item_ingredient_class_1.item_ingredient("brocolli");
brocolli.quantity = 3;
var tomato = new item_ingredient_class_1.item_ingredient("tomato");
tomato.quantity = 1;
var onion = new item_ingredient_class_1.item_ingredient("onion");
onion.quantity = 1;
var cabbage = new item_ingredient_class_1.item_ingredient("cabbage");
cabbage.quantity = 1;
var celery = new item_ingredient_class_1.item_ingredient("celery");
celery.quantity = 1;
var honeydew = new item_ingredient_class_1.item_ingredient("honeydew");
honeydew.quantity = 1;
var chillSalad = new recipe_class_1.recipe('chill salad', 100000);
chillSalad.addInstruction('mix ingredients in bowl');
chillSalad.addItem(brocolli);
chillSalad.addItem(celery);
chillSalad.addItem(cabbage);
var salad = new recipe_class_1.recipe('salad', 100001);
salad.addInstruction('mix ingredients in bowl');
salad.addInstruction('add some salad dressing');
salad.addItem(brocolli);
salad.addItem(celery);
salad.addItem(cabbage);
salad.addItem(tomato);
salad.addItem(onion);
var fruitsalad = new recipe_class_1.recipe('fruit salad', 100002);
fruitsalad.addInstruction('mix fruits together in bowl');
fruitsalad.addItem(tomato);
fruitsalad.addItem(honeydew);
recipeList.push(chillSalad);
recipeList.push(salad);
recipeList.push(fruitsalad);
