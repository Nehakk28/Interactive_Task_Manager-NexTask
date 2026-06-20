let tasks = loadTasks();
let editId = null;

/* INITIAL LOAD */

updateDate();
renderTasks(tasks);

/* ADD / UPDATE TASK */

document
.getElementById("addBtn")
.addEventListener("click", addTask);

function addTask(){

    const taskInput =
    document.getElementById("taskInput");

    const priority =
    document.getElementById("priority").value;

    const dueDate =
    document.getElementById("dueDate").value;

    const text =
    taskInput.value.trim();

    if(text === ""){

        showToast("Enter a task");

        return;
    }

    if(editId){

        tasks = tasks.map(task => {

            if(task.id === editId){

                task.text = text;
                task.priority = priority;
                task.dueDate = dueDate;

            }

            return task;

        });

        editId = null;

        document
        .getElementById("addBtn")
        .innerHTML =
        '<i class="fa-solid fa-plus"></i> Add Task';

        showToast("Task Updated");

    }
    else{

        tasks.push({

            id: generateId(),
            text: text,
            priority: priority,
            dueDate: dueDate,
            completed: false

        });

        showToast("Task Added");

    }

    saveTasks(tasks);

    renderTasks(tasks);

    taskInput.value = "";
    document.getElementById("dueDate").value = "";

}

/* EDIT */

function editTask(id){

    const task =
    tasks.find(
        task => task.id === id
    );

    if(!task) return;

    document.getElementById(
        "taskInput"
    ).value = task.text;

    document.getElementById(
        "priority"
    ).value = task.priority;

    document.getElementById(
        "dueDate"
    ).value = task.dueDate;

    editId = id;

    document
    .getElementById("addBtn")
    .innerHTML =
    '<i class="fa-solid fa-pen"></i> Update Task';

}

/* DELETE */

function deleteTask(id){

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks(tasks);

    renderTasks(tasks);

    showToast("Task Deleted");

}

/* COMPLETE */

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            task.completed =
            !task.completed;

        }

        return task;

    });

    saveTasks(tasks);

    renderTasks(tasks);

}

/* FILTERS */

document
.getElementById("allBtn")
.addEventListener("click", () => {

    renderTasks(tasks);

});

document
.getElementById("activeBtn")
.addEventListener("click", () => {

    const activeTasks =
    tasks.filter(
        task => !task.completed
    );

    renderTasks(activeTasks);

});

document
.getElementById("completedBtn")
.addEventListener("click", () => {

    const completedTasks =
    tasks.filter(
        task => task.completed
    );

    renderTasks(completedTasks);

});

/* SEARCH */

document
.getElementById("searchInput")
.addEventListener("keyup", function(){

    const value =
    this.value.toLowerCase();

    const filtered =
    tasks.filter(task =>

        task.text
        .toLowerCase()
        .includes(value)

    );

    renderTasks(filtered);

});

/* DARK MODE */

document
.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body
    .classList.toggle("dark");

});

/* CLEAR ALL MODAL */

const modal =
document.getElementById(
    "customModal"
);

document
.getElementById("clearBtn")
.addEventListener("click", () => {

    modal.style.display =
    "flex";

});

document
.getElementById("cancelDelete")
.addEventListener("click", () => {

    modal.style.display =
    "none";

});

document
.getElementById("confirmDelete")
.addEventListener("click", () => {

    tasks = [];

    clearTasks();

    renderTasks(tasks);

    modal.style.display =
    "none";

    showToast(
        "All Tasks Deleted"
    );

});

/* CLOSE MODAL ON OUTSIDE CLICK */

window.addEventListener(
    "click",
    (e) => {

        if(e.target === modal){

            modal.style.display =
            "none";

        }

    }
);

// Keyboard Shortcut

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Enter" &&
        document.activeElement.id === "taskInput"
    ) {

        addTask();

    }

});

// Import / Restore Task


document
.getElementById("importBtn")
.addEventListener("click", () => {

    document
    .getElementById("importFile")
    .click();

});

document
.getElementById("importFile")
.addEventListener("change", function(){

    const file =
    this.files[0];

    if(!file){

        return;

    }

    const reader =
    new FileReader();

    reader.onload = function(e){

        try{

            const importedTasks =
            JSON.parse(
                e.target.result
            );

            tasks =
            importedTasks;

            saveTasks(tasks);

            renderTasks(tasks);

            showToast(
                "Tasks Imported"
            );

        }catch{

            alert(
                "Invalid JSON File"
            );

        }

    };

    reader.readAsText(file);

});

// priority Filter

document
.getElementById("priorityFilter")
.addEventListener("change", function(){

    const value = this.value;

    if(value === "All"){

        renderTasks(tasks);
        return;

    }

    renderTasks(
        tasks.filter(
            task => task.priority === value
        )
    );

});