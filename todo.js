let inputel= document.getElementById("inputodo");
let btn = document.getElementById("addbtn");
let ulcont = document.getElementById("unorder");
let savebtn= document.getElementById("save");

function getitemlocalstorage(){
    let stringtodo=localStorage.getItem("todolist");
    let parsedtodo= JSON.parse(stringtodo);
    if(parsedtodo===null){
        return [];
    }
    else{
        return parsedtodo;
    }
}
let todoList=getitemlocalstorage();
savebtn.onclick=function(){
    localStorage.setItem("todolist",JSON.stringify(todoList));
}

function appendtodo(todo){
    let inputid="checkbox"+todo.uniquenum;
    let labid= "label"+todo.uniquenum;  
    let todoid= "todo"+todo.uniquenum;  

    let list= document.createElement("li");
    list.id= todoid;
    list.classList.add("tod-cont","d-flex","flex-row");
    ulcont.appendChild(list);

    let inputel= document.createElement("input");
    inputel.type="checkbox";
    inputel.id=inputid;
    inputel.checked=todo.checked;
    inputel.classList.add("label-cont");
    list.appendChild(inputel);

    
    let divcont= document.createElement("div");
    divcont.classList.add("lab", "d-flex","flex-row");
    list.appendChild(divcont);

    let labelel = document.createElement("label");
    labelel.setAttribute("for",inputid);
    labelel.textContent=todo.text;
    labelel.id=labid;
    if(todo.checked===true){
        labelel.classList.add("checked");
    }
    labelel.classList.add("checkbox-label");
    divcont.appendChild(labelel);
    
    inputel.onclick=function(){
        strikethrough(labid);
    }


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    divcont.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick=function(){
        deltodo(todoid);
    }
}

for(let todo of todoList){
    appendtodo(todo);
}

function strikethrough(id){
    let element=document.getElementById(id);
    element.classList.toggle("checked");
    let index= todoList.findIndex(function(eachtodo){
        let eachtodoid = "label"+eachtodo.uniquenum; 
        if(eachtodoid===id){
            return true;
        }
        else{
            return false;
        }
    })
    let todobj= todoList[index];
    if(todobj.checked===false){
        todobj.checked=true;
    }
    else{
        todobj.checked=false;
    }
}
function addtodo(v){
    v=inputel.value;
    if(v===""){
        alert("Enter a Valid task!");
        return;
    }
    else{
        let id= todoList.length+1;
        newtodo={
            text:inputel.value,
            uniquenum:id,
            checked:false
        };
        todoList.push(newtodo);
        appendtodo(newtodo);
        inputel.value="";
}
}
btn.onclick=function(){
    addtodo(inputel);
};
function deltodo(todoid){
    let element= document.getElementById(todoid);
    ulcont.removeChild(element);
    let index = todoList.findIndex(function(eachtodo){
        let eachtodoid="todo"+eachtodo.uniquenum;
        if(eachtodoid===todoid){
            return true;
        }
        else{
            return false;
        }
    });
    console.log(index);
    todoList.splice(index,1);
}