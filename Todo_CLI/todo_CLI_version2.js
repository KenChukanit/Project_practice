
//require readline to use in the application.
const readLine = require('readline');
//require fileSystem
const fs = require("fs");

const rl =readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

//default for JSON file
const TODO_JSON_PATH = "./myTodos.json";
const pathFile = process.argv[2];

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
        console.log(`(v)View ∙ (n)New ∙ (cX)Complete ∙ (dX)Delete ∙ (s)Save ∙ (q)Quit`);
        rl.question('', (line)=>{
            if(line=== 'v'){
                return this.view();
            }else if(line === 'n'){
                return this.add();
            }else if(line[0] === 'c' ){
                return this.check(line);
            }else if(line[0]=== 'd' ){
                return this.del(line);
            }else if(line === 's'){
                return this.save();
            }else if(line === 'q'){
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
///function to set lists to data in JSON form.
    setData(data){
    let set =[];
    for(let i =0; i<data.length;i++){
    let jsonValue 
    let item = data.slice(i,i+1)
    let itemlength = item.join('').length
    let itemName = item.join('').substring(4,itemlength+1)
        if(item.join('')[1] === '√'){
            jsonValue = {"completed": "true", "title": itemName};
            set.push(JSON.stringify(jsonValue));
        }else{
            jsonValue = {'completed': "false", "title": itemName};
            set.push(JSON.stringify(jsonValue));
        }
    }
    return '['+set.toString()+']'
    }

//function to get data from JSON file to list in application
//if myTodos.json exists it will automatically load the file as default even we did not enter the path.
    getData(path =TODO_JSON_PATH){
//the application will find if the path we put in exists.
    if(fs.existsSync(path)){
	fs.readFile(path, 'utf8',(err,data)=>{
        //make json data to object
        let obj =JSON.parse(data);
        if(err){
            throw err;
        }else{
            let convert = [];
            for (let i=0; i< obj.length; i++){
                let listFromSave ='';
                if(obj[i]["completed"] === "true"){
                    listFromSave = '[√] '+obj[i]["title"];
                    convert.push(listFromSave);
                }else{
                    listFromSave = '[ ] '+obj[i]["title"];
                    convert.push(listFromSave);
                }
            }
            this.task();
            this.list =convert;
        return this.list;
        }});
    }else{
        this.task();
    }
}


//function to save the current lists when users call 's'.
    save(){
        console.log("where?(myTodos.json)/n")
        rl.question('', (path)=>{
        //check if myTodos.json exists if not. enter default path to be myTodos.json
        if(!path){
            path = TODO_JSON_PATH;
        }
        //call setData function to change to JSON form
        let data = (this.setData(this.list));
       //call fs Exists and fs writeFile to create new JSON save file or overwrite the old myToDos.json
        fs.exists(TODO_JSON_PATH, (exists)=>{
            if(exists){
                fs.writeFile(TODO_JSON_PATH, data, (err)=>{
                    if(err){
                        console.log('File cannot be saved! Please try again')
                        console.log(err)
                    }else{
                        console.log(`List save to ${path}`);
                        }
                        this.task();
                    })
                    //create new file name if the path has been entered
                    }else{
                        fs.writeFile(path, data,(err)=>{
                        if(err){
                            console.log('File cannot be saved! Please try again')
                            console.log(err)
                        }else{
                            console.log(`List save to ${path}`);
                            this.task();
                            
                        }
                    })
                }
                
            })
        }
    )}
}


//create a new class and call to start the application 
let todo = new ToDo;
todo.welcome();
todo.getData(pathFile)

