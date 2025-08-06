document.addEventListener('DOMContentLoaded', () => {
const storedTasks = JSON.parse(localStorage.getItem('tasks'))
if(storedTasks){
   storedTasks.forEach((task) => tasks.push(task));
   updateTasksList();
   updateStatus();
}
})
const tasks = [];
document.getElementById('new_task').addEventListener('click', function (e){
    e.preventDefault();
    addTask();
})

// saved task to localstorage..
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// add task
const addTask = () => {
    const inputTask = document.getElementById('input_task');
    const text = inputTask.value.trim();
    if(text){
        tasks.push({task:text, completed:false});
        inputTask.value = "";
        updateTasksList();
        updateStatus();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStatus();
    saveTasks();

};

//editTask 
const editTask = (index) => {
const editInputTask = document.getElementById('input_task');
editInputTask.value = tasks[index].task;
tasks.splice(index, 1);
updateTasksList();
updateStatus();
saveTasks();
};

// deleteTask
const deleteTask = (index) => {
 tasks.splice(index,1);
 updateTasksList();
 updateStatus();
 saveTasks();
};

// update status
const updateStatus = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    document.getElementById('number').innerText = `${completedTasks} / ${totalTasks}`;
    const progress = (completedTasks / totalTasks)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

};

//update task
const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="task_item">
           <div class="task ${task.completed ? 'completed' : ""}">
             <input type="checkBox" class= "check_box" ${task.completed? "checked": ''}/>
             <p>${task.task}</p>
            </div>
            <div class= "icons">
              <i id="edit" class="fa-regular fa-pen-to-square" onClick="editTask(${index})"></i>
              <i id="delete" class="fa-solid fa-trash" onClick="deleteTask(${index})"></i>
            </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index))
        taskList.appendChild(listItem);

    });
};
