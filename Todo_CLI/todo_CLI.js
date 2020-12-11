
//require readline to use in the application.
const readLine = require('readline');

const rl =readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
//create class Todo to contain all the functions.
class ToDo{
    constructor(){
        this.list = [];
    }
//function to start the application screen.
    welcome() {
        console.log('Welcome to Todo CLI!');
        console.log('---------------------');    
    }
//function to keep an application to be interactive with users.
    task(){
        console.log(`(v)View ∙ (n)New ∙ (cX)Complete ∙ (dX)Delete ∙ (q)Quit`);
        rl.question('', (line)=>{
            if(line.toLowerCase() === 'v'){
            return this.view();
            }else if(line.toLowerCase() === 'n'){
                return this.add();
            }else if(line[0].toLowerCase() === 'c' ){
                return this.check(line);
            }else if(line[0].toLowerCase() === 'd' ){
                return this.del(line);
            }else if(line.toLowerCase() === 'q'){
                console.log('See you soon! 😄');
                rl.close();
            }else{
                console.log('Command is not found.');
                this.task();
            }
        })
    }
//function to add to do list when a user called command 'n'.   
    add(){
        rl.question("what? \n", (todo)=>{
            this.list.push('[ ] '+todo);
            this.task();
            })
    return this.list;
    }
//function to check what lists are still pending and what lists are done when users called 'v'.    
    view(){
        let list = this.list;
        ///check if the list is empty
        if(list.length===0){
        console.log('List is empty...');
        }
        for(let i =0;i<list.length;i++){
        console.log(`${i} ${list[i]}`)
        }
    this.task();
    return this.list;
    }
//function to delete a list when users called 'dX'.    
    del(input){
        let deleted = input.slice(1,input.length)
        let list = this.list;
        let IntDeleted = parseInt(deleted);
        if(isNaN(deleted) || IntDeleted >= list.length){
            console.log('!Invalid input. Please put a new command')
        }else{
            let item = list[IntDeleted];
            let itemList = item.slice(4, item.length);
            console.log(`Deleted "${itemList}"`)
            this.list.splice(IntDeleted,1);
        }
    this.task();
    return this.list;
    }
//function to check out a list when it is done. if users call 'cX'.  
    check(input){
        let completed = input.slice(1,input.length)
        let list = this.list;
        let IntCompleted = parseInt(completed);
        if(isNaN(completed) || IntCompleted >= list.length){
            console.log('!Invalid input. Please put a new command')
        }else{
            let item = list[IntCompleted];
            let itemList = item.slice(4, item.length);
            console.log(`Completed ${itemList}`)
            list[IntCompleted] = '[√] '+itemList;
        }
    this.task();
    return this.list
    }
}

//create a new class and call to start the application 
let todo = new ToDo;
todo.welcome();
todo.task();

