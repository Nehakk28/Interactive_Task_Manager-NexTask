// Save Tasks to Local Storage

function saveTasks(tasks){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

// Load Tasks from Local Storage

function loadTasks(){

    const storedTasks =
    localStorage.getItem(
        "tasks"
    );

    return storedTasks
        ? JSON.parse(
            storedTasks
          )
        : [];

}

// Clear All Tasks

function clearTasks(){

    localStorage.removeItem(
        "tasks"
    );

}