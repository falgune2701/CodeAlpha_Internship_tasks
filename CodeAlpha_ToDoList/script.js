document.addEventListener('DOMContentLoaded', () => {
const storedTasks = JSON.parse(localStorage.getItem('tasks'))
if(storedTasks){
   storedTasks.forEach((task) => tasks.push(task));
   updateTasksList();
   updateStats();
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
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();

};

//editTask 
const editTask = (index) => {
const editInputTask = document.getElementById('input_task');
editInputTask.value = tasks[index].task;
tasks.splice(index, 1);
updateTasksList();
updateStats();
saveTasks();
};

// deleteTask
const deleteTask = (index) => {
 tasks.splice(index,1);
 updateTasksList();
 updateStats();
 saveTasks();
};

// update stats
const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    document.getElementById('number').innerText = `${completedTasks} / ${totalTasks}`;
    const progress = (completedTasks / totalTasks)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    
    if(tasks.length && completedTasks == totalTasks){
        blaskConfetti();
    }

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

const blaskConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
