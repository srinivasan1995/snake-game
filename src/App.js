import React, { Component } from 'react';
import './App.css';
import Popup from './Popup.js'

const {Paper,Rect,Text} = require('react-raphael');

const ARROW_KEY_LEFT = 37;
const ARROW_KEY_UP = 38;
const ARROW_KEY_RIGHT = 39;
const ARROW_KEY_DOWN = 40;
const CONTINUE = 89;

//Position class contains snake's position in terms of its X and Y Coordinates .
class Position{    
    constructor( x , y){
        this.x = x;
        this.y = y;
    }
}

//Snake's position related information is stored here . it contains list of position Object.
class Snake{
    constructor(){
        this.pos = [];
        var position = new Position(0,0);
        this.pos.push(position);
        this.width=10;
        this.height =10;
    }
    
}

//Food class has info related to position where food needs to appear .
class Food{
    constructor(width,height){
        this.x=Math.round((Math.random()*this.width));
        this.y =Math.round((Math.random()*this.height));
    }
}

//Direction class is responsible for direction in which snake needs to move .
class Direction{
    constructor(){
        this.x=1;
        this.y=0;
    }
}


//Main class responsible for rendering graphics for snake game .
class App extends Component {
    
    state = {
        snakeData : new Snake(),
        foodData : new Food(),
        directionData : new Direction(),
        score : 0,
        out :false
    }

//initialises the state variables 
    setInitialState = () => {
        var tempWidth = Math.round(Math.random()*this.width);
        var tempHeight = Math.round(Math.random()*this.height);
        var tempFoodData = new Food(); tempFoodData.x=tempWidth;tempFoodData.y=tempHeight;
        this.setState({
        snakeData : new Snake(),
        foodData : tempFoodData,
        directionData : new Direction(),
        score : 0,
        out : false
    });
    }

    
//constuctor for initialising width and height of canvas 
    constructor(){
        super();
        //Height and width of the Canvas , could be modified to change the resolution of the canvas .
        this.height = 500;
        this.width = 500;
    }
    //added for debugging purpose to print snake's coordinates in canvas .
    print = () => {
        var length = this.state.snakeData.pos.length;
        console.log("length of Snake  = " + length)
        console.log("direction X = " + this.state.directionData.x + " directionY = " + this.state.directionData.y);
        for(var i =0 ;i <length ; i++){
            console.log("position i " + i + " XCoord: " +this.state.snakeData.pos[i].x + " YCoord: "+ this.state.snakeData.pos[i].y );
        }
    }

//checks whether any collision happens within the snake or not  if Yes resets the entire state variables.
    snakeCollisionHappnenedOrNot = (snakeTempData) => {
        var length = snakeTempData.pos.length;
        var position = new Position(snakeTempData.pos[length-1].x,snakeTempData.pos[length-1].y);
        for(var i=0;i<length-1;i++){
            if(snakeTempData.pos[i].x == position.x && snakeTempData.pos[i].y == position.y ){
                this.setState({out:true});
            }
        }
        
        
    }
    
//to check whether snake has hit the wall which is specified by height and width of canvas .
  snakeHitWallOrNot = (snakeTempData) => {
      var length = snakeTempData.pos.length;
        for(var i=0;i<length;i++){
            if(snakeTempData.pos[i].x > this.width || snakeTempData.pos[i].x < 0 ||  snakeTempData.pos[i].y > this.height || snakeTempData.pos[i].y < 0 ){
                this.setState({out:true});
                
            }
        }
      
  }

//checks whether food is eaten or not , if yes , increases snake size.
    foodEatenOrNot = () => {
        var temp = this.state.snakeData;
        var tempFoodData = this.state.foodData;
        var delta_x = temp.pos[temp.pos.length -1 ].x-tempFoodData.x;
        var delta_y = temp.pos[temp.pos.length -1 ].y-tempFoodData.y;
        var distance = Math.sqrt(delta_x*delta_x + delta_y*delta_y);
        this.count++;

        if(distance <= 10){
            this.setState({score:this.state.score+1});
                var lengthOfSnake = temp.pos.length;
                 var pos = new Position(temp.pos[lengthOfSnake-1].x,temp.pos[lengthOfSnake-1].y);
                var tempDirectionX = this.state.directionData.x;
                var tempDirectionY = this.state.directionData.y;
             if(tempDirectionX == 1 && tempDirectionY == 0 ){
                    pos.x=pos.x+10;
                }else if(tempDirectionX == 0 && tempDirectionY == 1){
                    pos.y=pos.y+10;
                }else if(tempDirectionX == -1 && tempDirectionY == 0){
                    pos.x=pos.x-10;
                }else {
                    pos.y=pos.y-10;
                }
            
            temp.pos.push(new Position(pos.x,pos.y));
           
            this.setState({snakeData : temp});
            var tempWidth = Math.round(Math.random()*this.width);
            var tempHeight = Math.round(Math.random()*this.height);
             tempFoodData = new Food(); tempFoodData.x=tempWidth;tempFoodData.y=tempHeight;
            this.setState({foodData : tempFoodData});

            
        }
        
    }

//main function responsible for updating snake's position for every given interval .
    snakeUpdateFunction = () =>{
        if(!this.state.out){
                var tempDirectionX = this.state.directionData.x;
                var tempDirectionY = this.state.directionData.y;
                 var temp = this.state.snakeData;
                var i;
               for(i =0;i<temp.pos.length-1;i++){
                    temp.pos[i].x =  temp.pos[i+1].x;
                   temp.pos[i].y =  temp.pos[i+1].y;
               }
            
             if(tempDirectionX == 1 && tempDirectionY == 0 ){
                    temp.pos[i].x=temp.pos[i].x+10;
                }else if(tempDirectionX == 0 && tempDirectionY == 1){
                    temp.pos[i].y=temp.pos[i].y+10;
                }else if(tempDirectionX == -1 && tempDirectionY == 0){
                    temp.pos[i].x=temp.pos[i].x-10;
                }else {
                    temp.pos[i].y=temp.pos[i].y-10;
                }

//TODO :  to enable both snake game with and without wall and give user option to switch between the modes .
                
//                temp.pos[i].x = temp.pos[i].x%this.width;
//                temp.pos[i].y = temp.pos[i].y%this.height;
            
//                if(temp.pos[i].y <0){
//                    temp.pos[i].y = this.height+temp.pos[i].y;
//                }
//
//                if(temp.pos[i].x <0){
//                    temp.pos[i].x = this.width+temp.pos[i].x;
//                }

                
              this.setState({snakeData : temp});

             this.foodEatenOrNot();
            
            this.snakeHitWallOrNot(temp);

            this.snakeCollisionHappnenedOrNot(temp);
        }else{
            this.setState({directionData : new Direction()})
        }  
  
    }
 
//Main function to start rendering of snake 
    componentDidMount(){
         document.addEventListener("keydown", this.keyPressHandler);
        var tempWidth = Math.round(Math.random()*this.width);
        var tempHeight = Math.round(Math.random()*this.height);
        var tempFoodData = new Food(); tempFoodData.x=tempWidth;tempFoodData.y=tempHeight;
        this.setState({foodData : tempFoodData});
        setInterval(this.snakeUpdateFunction,70);
        
            
    }

//to detect key presses for direction keys and update the direction of snake to move.
    keyPressHandler = (e) => {
        var keyValue = e.keyCode;
        var tempDirData = this.state.directionData;
        
        switch(keyValue){
            case ARROW_KEY_DOWN : {
            if(!this.state.out)
            tempDirData.x =0;tempDirData.y=1;
             break;   
            }
            case ARROW_KEY_LEFT : {
            if(!this.state.out)
            tempDirData.x =-1;tempDirData.y=0;
                break;
            }
            case ARROW_KEY_RIGHT : {
            if(!this.state.out)
            tempDirData.x =1;tempDirData.y=0;
                break;
            }
            case ARROW_KEY_UP : {
            if(!this.state.out)                
            tempDirData.x =0;tempDirData.y=-1;
                break;
            }
            case CONTINUE: {
               this.setInitialState();
                break;
            }
            default :{
                console.log("failure key clicked = " + keyValue);
            }
            
        }
        this.setState({directionData : tempDirData});
        
        
        
    }

  render() {

      var finalRender = [];
      var gameOut = this.state.out;
      var gameOutResult  =[] ;
      if(gameOut){
          gameOutResult.push(<p>please press Y to start the game again</p>);
      }
     
      for(var i =0 ; i< this.state.snakeData.pos.length;i++){
        finalRender.push(<Rect x={this.state.snakeData.pos[i].x%this.width} y={this.state.snakeData.pos[i].y%this.height} width={10} height={10} attr={{"fill":"yellow"}}/>);    
      }
          return (
        <div>
        <div id ="snakeRender">
        <Paper width={this.width} height={this.height} attr={{"fill":"red"}}>
                         
        {finalRender}
      <Rect x={this.state.foodData.x} y={this.state.foodData.y} width={10} height={10} attr={{"fill":"red"}}/>
                         
        <Text x={this.width-50} y={30} text={"Score : " + this.state.score.toString()} attr={{"fill":"red","font-size":"20px"}}/>
                         
        </Paper>
        </div>
        <div>
            { gameOut == true ? (<Popup text="please enter Y to restart the game"  />) : null }
        </div>
       </div>
    
    );
  }
}
export default App;
