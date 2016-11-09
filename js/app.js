//Problem: User interaction doesn't provide desire results.
//Solution: Add interactivity so the user can manage daily task.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");; //completed-tasks


//New Task List Item
var createNewTaskElement = function(taskString){
    //Create list item
    var listItem = document.createElement('li');
    //input checkbox
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement('label');
    //input text
    var editInput = document.createElement('input');
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //Each elements needs modify
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;
    
    
    //Each elemnts needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};
//Add a new task
var addTask = function(){
    console.log('add task..')
 //Create a new list item withe the text from #new-task
     var listItem = createNewTaskElement(taskInput.value);
    
//Append ListItem to inCompleteTasksHolder    
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    
    
};

//Edit an existing task
var editTask = function(){
    console.log('edit task..');
    var listItem = this.parentNode;
    
    var editInput = listItem.querySelector('input[type="text"]');
    var label = listItem.querySelector('label');
    //if the class of the parent is .editMode
    if(listItem.classList.contains("editMode")){
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
        
    } else {
         //Switch to .editMode
        editInput.value = label.innerText;
        //input value become the label text
    };
       
    //Toggle .editMode on the parent
    listItem.classList.toggle('editMode');

};
    

//Delete an existing task
var deleteTask = function(){
    console.log('delete task..');
    //Remove the parent list item from the ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
};

    


//Mark a task as complete
var taskCompleted = function(){
    console.log("completed task...")
     var listItem = this.parentNode
     completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
     
};
    //When the checkbox is checked
    //Append the task list item to the #completed-tasks list

//Mark a task as incomplete
var taskIncomplete = function(){
    console.log("incomplete task...")
     var listItem = this.parentNode
     incompleteTasksHolder.appendChild(listItem);
     bindTaskEvents(listItem,taskCompleted);
};
    //When the checkbox is unchecked
    //Append the task list item to the #incompleted-tasks list
    
var bindTaskEvents = function(taskListItem, checkboxEventHandler){
    console.log('bind list item');
     //selecet it's children
        //bind editTask to edit button
        var editButton = taskListItem.querySelector('button.edit')
        editButton.onclick = editTask;
        //bind deleteTask to delete button
        var deleteButton = taskListItem.querySelector('button.delete')
        deleteButton.onclick = deleteTask;
        //bind taskCompleted to checkbox
        var checkbox = taskListItem.querySelector('input[type="checkbox"]');
        checkbox.onchange = checkboxEventHandler;
    
        
};

//Set the click handler to the addTask function
addButton.onclick = addTask;

//cycle over incompletetaskholder ul list item
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
    
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
    
};

for(var i=0; i < completedTasksHolder.children.length; i++ ){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
    //for each list item
       
        

//cycle over completetaskholder ul list item
    //for each list item
        //selecet it's children
        //bind editTask to edit button
        //bind deleteTask to delete button
        //bind taskIncomplete to checkbox