// JS use for styling effect
let todoHeadingEl = document.getElementById("todoHeading");
let cursorElm = document.getElementById("cursorElm");

todoHeadingEl.addEventListener("mouseenter", () => {
    todoHeadingEl.style.cursor = "pointer";
    todoHeadingEl.style.transform = "scaleX(2)";
    todoHeadingEl.style.transitionDuration = "1s";
    cursorElm.style.width = "60px";
    cursorElm.style.height = "60px";
    cursorElm.style.backgroundColor = "transparent";
    cursorElm.style.border = "3px solid white";

});
todoHeadingEl.addEventListener("mouseleave", () => {
    todoHeadingEl.style.transform = "scaleX(1)";
    todoHeadingEl.style.transitionDuration = "1s";
    cursorElm.style.width = "30px";
    cursorElm.style.height = "30px";
    cursorElm.style.backgroundColor = "rgb(131, 187, 93)";
    cursorElm.style.border = "none";
});

document.addEventListener("mousemove", function(details) {
    console.log(details.clientY);
    cursorElm.style.left = details.x + "px";
    cursorElm.style.top = details.y + "px";
    cursorElm.style.transitionDuration = "0.2s";
});

// **** Todo tasks functionality ****

let tasksContainerElm = document.getElementById("tasksContainer");
let addButtonElm = document.getElementById("addButton");
let saveButtonElm = document.getElementById("saveButton");


// localStorage.clear("todoList");
// Actual Seventh step - get todolist from local storage ****
function getTodoListFromLocalStorage () {
    let stringifyTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifyTodoList);
    if(parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

// First Step - Creating a list of Multiple Todo object with name and it's id ****
// let todoList = [
//     {text: "Learn HTML", uniqueNo: 1, isChecked: false},
//     {text: "Learn CSS", uniqueNo: 2, isChecked: false},
//     {text: "Learn JavaScript", uniqueNo: 3, isChecked: false},
//     {text: "Learn Math", uniqueNo: 4, isChecked: false},
// ];

// Extracting todoList from local storage ****
let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;

// Actual Six step - Save the todo items in Local storage ****
saveButtonElm.onclick = function() {
    // localStorage.clear();
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

// Actual Fourth step - Function call of checking todo is checked or not onTodoStatusChange() ****
function onTodoStatusChange(checkboxId, lableId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let lableTextElement = document.getElementById(lableId);

    lableTextElement.classList.toggle("todo-isChecked");

    let todoObjIndex = todoList.findIndex(function(eachTodo) {
        console.log(eachTodo);
        let eachTodoId = eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        }
        else {
            return false;
        }
    });
    console.log(todoObjIndex);
    let todoObject = todoList[todoObjIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    }
    else {
        todoObject.isChecked = true;
    }
    // if (checkboxElement.checked === true) {
    // } else {
    //     lableTextElement.classList.remove("todo-isChecked");
    // }
}


// Actual Fifth step - Function call of deleting todo todoElementDeleteFunction() ****
function todoElementDeleteFunction(todoId) {
    let totalTodoElmContianer = document.getElementById(todoId);

    tasksContainerElm.removeChild(totalTodoElmContianer);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}





// Actual Third step - Function call of creating todo createAndAppendTodo() ****
function createAndAppendTodo(todo) {
    let todoId = todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let lableId = "lable" + todo.uniqueNo;


    //Creating single todo item in dynamically ***
    
    // 1. Creating todoListsContainerEl  ****
    let todoListsContainerEl = document.createElement("li");
    todoListsContainerEl.classList.add("todo-lists-container");
    todoListsContainerEl.id = todoId;  // todo Id with uniqueNo ***
    tasksContainerElm.appendChild(todoListsContainerEl);
    
    // 2. Creating inputElm  ****
    let inputElm = document.createElement("input");
    inputElm.type = "checkbox";
    inputElm.classList.add("checkbox-style");
    inputElm.id = checkboxId;  // todo checkbox Id with uniqueNo ***
    inputElm.checked = todo.isChecked;
    inputElm.onclick = function() {
        onTodoStatusChange(checkboxId, lableId, todoId);   // 2.
    }
    todoListsContainerEl.appendChild(inputElm);
    
    // 3. Creating lableContainerElm  ****
    let lableContainerElm = document.createElement("div");
    lableContainerElm.classList.add("lable-container");
    todoListsContainerEl.appendChild(lableContainerElm);
    
    // 4. Creating lableTextElm  ****
    let lableTextElm = document.createElement("lable");
    lableTextElm.classList.add("todos-style");
    lableTextElm.setAttribute("for", checkboxId);
    lableTextElm.id = lableId;
    lableTextElm.textContent = todo.text;  // todo text assign ***
    if(todo.isChecked === true) {
        lableTextElm.classList.add("todo-isChecked");
    }
    lableContainerElm.appendChild(lableTextElm);

    let timeTextElm = document.createElement("span");
    timeTextElm.textContent = todo.dateTime;
    timeTextElm.classList.add("timer-style");
    lableContainerElm.appendChild(timeTextElm);
    
    // 5. Creating icosnContainerElm  ****
    let icosnContainerElm = document.createElement("div");
    icosnContainerElm.classList.add("icon-container");
    todoListsContainerEl.appendChild(icosnContainerElm);
    
    // 6. Creating iconImageEl  ****
    let deleteIconImageEl = document.createElement("img");
    deleteIconImageEl.src = "png/icons8-delete-100.png";
    deleteIconImageEl.classList.add("delete-icon-style");
    deleteIconImageEl.onclick = function() {
        todoElementDeleteFunction(todoId);  // 3.
    }
    icosnContainerElm.appendChild(deleteIconImageEl);
}




// Actual Second step - Accessing user input value ****


function onAddTodo() {
    let textInputElm = document.getElementById("textInput");
    let userInputTextValue = textInputElm.value;
    if(userInputTextValue === "") {
        alert("Enter Valid Text");
        return;
    }
    
    todoCount = todoCount + 1;
    let newDateTime = new Date().toJSON().substring(0, 19).replace("T", " ");
    let newTodo = {
        text: userInputTextValue,
        uniqueNo: todoCount,
        isChecked: false,
        dateTime: newDateTime
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    textInputElm.value = "";
}

// Actual First step - ADD button onclick event ****

addButtonElm.onclick = function() {
    onAddTodo();
}


// Second step - Appending the todo items with for--of loop
for(let todo of todoList) {
    createAndAppendTodo(todo);   // 1.
}