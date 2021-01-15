const onX = '━';
const onY = '┃';
const onZero =  '╂';
const walkPoint = '☻';
const empty = ' ';


class Turtle{
    //define the starting point
    constructor(x,y) {
        this.x = x;
        this.y = y;
        //default facing direction is East
        this.face ='E';
        this.position = [x,y]
        this.previous ;
        this.record =[];
    }

forward(step){
    this.previous =[this.x, this.y];
    this.record.push(this.previous);
    if(this.face === 'E'){
        this.x = this.x+step;
    }else if(this.face === 'S'){
        this.y = this.y+step;
    }else if(this.face === 'W'){
        this.x = this.x-step;
    }else{
        this.y=this.y-step;
    }
    this.position = [this.x,this.y]

/////if x,y is minus return invalid input


////create record
let arr = this.record;
let arrLength = arr.length;
let lastArr = arr[arrLength -1];
// if there is a change in x
if(lastArr[0] !== this.x){
if(this.face === 'E'){
    let diffX = this.x - lastArr[0];
    for(let i = 1; i< diffX; i++){
        this.record.push([lastArr[0]+i,this.y]);
        
    }
}else{//else there is a change in y
    let diffX = lastArr[0] - this.x;
    for(let i = 1; i< diffX; i++){
        this.record.push([lastArr[0]-i,this.y]);
    }
}}else{
if(this.face === 'S'){
    let diffY = this.y - lastArr[1];
    for(let i=1; i< diffY; i++){
        this.record.push([this.x,lastArr[1]+i])
    }
}else{
    let diffY = lastArr[1] - this.y;
    for(let i=1; i< diffY; i++){
        this.record.push([this.x,lastArr[1]-i])
    }
}

}

    return this
}

right(){
let newFace 
if(this.face ==='N'){
    newFace = 'E';
}else if(this.face === 'E'){
    newFace = 'S';
}else if(this.face === 'S'){
    newFace = 'W';
}else{
    newFace = 'N';
}
        this.face=newFace;
return this
}

left(){
    let newFace 
    if(this.face ==='N'){
        newFace = 'W';
    }else if(this.face === 'E'){
        newFace = 'N';
    }else if(this.face === 'S'){
        newFace = 'E';
    }else{
        newFace = 'S';
    }
            this.face=newFace;
    return this
    }

allPoint(){
   
   this.record.push(this.position)

    return this

    }

    print(){

        let arr =this.record
    ///function to check if array in array
    const isArrayInA =(a1,a2)=>{
        let a1_string = JSON.stringify(a1)
        let contains = a2.some(e=>{
            return JSON.stringify(e) === a1_string
        })
        return contains
    }

        let arrY = arr.map((y)=> y[1]);
        let yMax = Math.max.apply(null, arrY);
        let yMin = Math.min.apply(null, arrY);
        let arrX = arr.map((x)=> x[0]);
        let xMax = Math.max.apply(null,arrX);
        let xMin = Math.min.apply(null,arrX);
        if(parseInt(xMin) > xMax){
            xMax = parseInt(xMin)
        }
        if(parseInt(yMin) > yMax){
            yMax = parseInt(yMin)
        }

        // let westMax = [negate(xMax),0]
        // let eastMax = [xMax,0]
        // let northMax = [0,yMax]
        // let southMax = [0,negate(yMax)]
        let draw = '';

        for(let j= -yMax*2; j<=yMax*2; j++){
        for(let i = -xMax*2; i <= xMax*2; i++){

            if(isArrayInA([i,j],this.record)){
                draw += walkPoint 
            }else if(i === 0 && j !==0 && !isArrayInA([i,j],this.record)){
                draw += onY
            }else if(j === 0 && i !==0 && !isArrayInA([i,j],this.record)){
                draw += onX
            }else if(i === 0 && j === 0 && !isArrayInA([i,j],this.record)){
                draw += onZero
            }else{
                draw += empty
            } 
            }
        draw = draw+'\n';
        }
    
    return draw;
    }
}

///Test
let leonardo = new Turtle (2,1);
leonardo.forward(10).right().right().forward(10).left().forward(5).left().forward(10).right().forward(5).right().forward(11)
// f10-r-r-f10-l-f5-l-f10-r-f5-r-f11
console.log(leonardo.allPoint())
console.log(leonardo.print())
// t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5
let rafael = new Turtle (5,5).forward(10).right().forward(5).right().forward(10).right().forward(5)
                        .right().forward(2).right().forward(5).left().forward(2).left().forward(5)
console.log(rafael.allPoint())
console.log(rafael.print())
