
var dog,sadDog,happyDog;
var database;
var position;
var lastFed;
var foodObj;
var fedTime;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj = new Food();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
   foodStock.on("value",readStock);
}
function draw() {
  background(46,139,87);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM" ,350,30);
  }else if(lastFed==0){
    text("Last feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed%12 + "AM" ,350,30);
  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  drawSprites();
  foodObj.display();
}

//function to read food Stock
function feedDog() {
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()+0);
    }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
  }
  function readStock(data){ 
    foodS=data.val();
     foodObj.updateFoodStock(foodS);
     }
    // FUNCTION TO ADD FOOD IN STOCK
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
//function to update food Stock and last fed time
function feedDog() {
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
