import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import {recipe} from './recipe.class';
import {item_ingredient} from './item_ingredient.class';

module.exports = add;

let recipeList: Array<recipe> = [];

//create app instance
let app = express();
//port number
const port = process.env.PORT || 3000;

function add(x : number, y : number){
    return x+y;
}

var corsOptions = {
    origin: '*', //Allow all origins
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(bodyParser.json()); //Parse json http bodies
let store = "";
app.param('store', function(res,req, next, value){
  (<any> req).data = (<any> req).data || {}; //Js magic, adding a data property
  (<any>req).data.store = value;  //JS magx, store the store
  next(); //Allows for redirection if store doesn't exist or something.
});

app.get("/test",function(req, res){
    //Good to have a simple one just to make
    //sure things work.
    res.send('{"test": 1 }');
    //event handler for echo endpoint
});

//GET recipelist. no parameters, returns recipe object list in json
app.get("/recipelist",function(req, res){
    res.header("Content-Type","application/json");
    //console.log(recipeList);
    res.send({recipes : recipeList});
});

//GET retrieve recipelist. recipe name as parameter, returns recipe object in json
app.get("/retrieverecipe:recipename",function(req, res){

    let recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);

    for(let i=0; i<recipeList.length; i++){
        if(recipeList[i].recipeName == recipeNameParameter){
            res.header("Content-Type","application/json");
            res.send({recipe : recipeList[i]});
            break;
        }
    }
    res.header("Content-Type","application/json");
    res.send({error : 'recipe not found'});
});

//GET deletes recipe from parameter name
app.get("/deleterecipe:recipename",function(req, res){

    let recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);

    for(let i=0; i<recipeList.length; i++){
        if(recipeList[i].recipeName == recipeNameParameter){
            console.log(recipeList[i].recipeName + " equals " + recipeNameParameter);
            res.header("Content-Type","application/json");
            res.send({recipe : recipeList[i]});
            recipeList.splice(i, 1);
            break;
        }
    }
    res.header("Content-Type","application/json");
    res.send({error : 'recipe not found'});
});

//POST adds recipe from object
app.post("/add",function(req, res){
    console.log("body",req.body); //should be request body
    recipeList.push(req.body);
    res.header("Content-Type","application/json");
    res.send({error : 'recipe added'});
});

//serve app at the given port
app.listen(port, () => {
    //callback successful
    console.log(`Listening at http://localhost:${port}/`);
});

//populate recipe list
let brocolli = new item_ingredient("brocolli");
brocolli.quantity = 3;
let tomato = new item_ingredient("tomato");
tomato.quantity = 1;
let onion = new item_ingredient("onion");
onion.quantity = 1;
let cabbage = new item_ingredient("cabbage");
cabbage.quantity = 1;
let celery = new item_ingredient("celery");
celery.quantity = 1;
let honeydew = new item_ingredient("honeydew");
honeydew.quantity = 1;

let chillSalad = new recipe('chill salad', 100000);
chillSalad.addInstruction('mix ingredients in bowl');
chillSalad.addItem(brocolli);
chillSalad.addItem(celery);
chillSalad.addItem(cabbage);
let salad = new recipe('salad', 100001);
salad.addInstruction('mix ingredients in bowl');
salad.addInstruction('add some salad dressing');
salad.addItem(brocolli);
salad.addItem(celery);
salad.addItem(cabbage);
salad.addItem(tomato);
salad.addItem(onion);
let fruitsalad = new recipe('fruit salad', 100002);
fruitsalad.addInstruction('mix fruits together in bowl');
fruitsalad.addItem(tomato);
fruitsalad.addItem(honeydew);

recipeList.push(chillSalad);
recipeList.push(salad);
recipeList.push(fruitsalad);