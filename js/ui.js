// Render Tasks

function renderTasks(taskArray){

    const taskList =
    document.getElementById("taskList");

    taskList.innerHTML = "";

    if(taskArray.length === 0){

        taskList.innerHTML = `

        <div class="feature-card">

            <h3>No Tasks Available</h3>

            <p>Add your first task.</p>

        </div>

        `;

        updateDashboard();
        updateDeadlines();
        updateChart();

        return;
    }

    taskArray.forEach(task => {

        let priorityClass = "";

        if(task.priority === "High"){

            priorityClass = "high";

        }else if(task.priority === "Medium"){

            priorityClass = "medium";

        }else{

            priorityClass = "low";

        }

        const card =
        document.createElement("div");

        card.classList.add("task-card");

        card.innerHTML = `

        <div class="task-info">

            <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${task.id})">

            <div>

                <h4 class="${task.completed ? "completed" : ""}">

                    ${task.text}

                </h4>

                <small>

                    📅 ${formatDate(task.dueDate)}

                </small>

            </div>

            <span class="priority ${priorityClass}">

                ${task.priority}

            </span>

        </div>

        <div class="task-actions">

            <button onclick="editTask(${task.id})">

                ✏️

            </button>

            <button onclick="deleteTask(${task.id})">

                🗑️

            </button>

        </div>

        `;

        taskList.appendChild(card);

    });

    updateDashboard();
    updateDeadlines();
    updateChart();
}

enableDragAndDrop();

function enableDragAndDrop(){

    const cards =
    document.querySelectorAll(
        ".task-card"
    );

    let draggedCard = null;

    cards.forEach(card => {

        card.addEventListener(
            "dragstart",
            () => {

                draggedCard =
                card;

            }
        );

        card.addEventListener(
            "dragover",
            (e) => {

                e.preventDefault();

            }
        );

        card.addEventListener(
            "drop",
            () => {

                if(
                    draggedCard !== card
                ){

                    const draggedId =
                    Number(
                        draggedCard.dataset.id
                    );

                    const targetId =
                    Number(
                        card.dataset.id
                    );

                    const draggedIndex =
                    tasks.findIndex(
                        task =>
                        task.id === draggedId
                    );

                    const targetIndex =
                    tasks.findIndex(
                        task =>
                        task.id === targetId
                    );

                    const temp =
                    tasks[draggedIndex];

                    tasks[draggedIndex] =
                    tasks[targetIndex];

                    tasks[targetIndex] =
                    temp;

                    saveTasks(tasks);

                    renderTasks(tasks);

                }

            }
        );

    });

}


// Dashboard

function updateDashboard(){

    const total = tasks.length;

    const completed =
    tasks.filter(
        task => task.completed
    ).length;

    const pending =
    total - completed;

    const percentage =
    calculatePercentage(
        total,
        completed
    );

    // Dashboard

    document.getElementById(
        "totalTasks"
    ).textContent = total;

    document.getElementById(
        "completedTasks"
    ).textContent = completed;

    document.getElementById(
        "pendingTasks"
    ).textContent = pending;

    document.getElementById(
        "completionRate"
    ).textContent =
    percentage + "%";

    // Statistics cards

    const statsTotal =
    document.getElementById(
        "statsTotal"
    );

    const statsCompleted =
    document.getElementById(
        "statsCompleted"
    );

    const statsPending =
    document.getElementById(
        "statsPending"
    );

    const statsRate =
    document.getElementById(
        "statsRate"
    );

    if(statsTotal) statsTotal.textContent = total;
    if(statsCompleted) statsCompleted.textContent = completed;
    if(statsPending) statsPending.textContent = pending;
    if(statsRate) statsRate.textContent = percentage + "%";

    const progressBar =
    document.getElementById(
        "progressBar"
    );

    const progressText =
    document.getElementById(
        "progressText"
    );

    if(progressBar){

        progressBar.style.width =
        percentage + "%";

    }

    if(progressText){

        progressText.textContent =
        percentage + "% Completed";

    }

}

// Calendar Deadlines

function updateDeadlines(){

    const deadlineList =
    document.getElementById(
        "deadlineList"
    );

    deadlineList.innerHTML = "";

    const upcoming =
    tasks.filter(
        task => task.dueDate
    );

    if(upcoming.length === 0){

        deadlineList.innerHTML =
        "<p>No deadlines available</p>";

        return;
    }

    upcoming.forEach(task => {

        const item =
        document.createElement("p");

        item.innerHTML = `
            <div class="deadline-item">
                <span class="deadline-task">
                    📅 ${task.text}
                </span>
                <span class="deadline-date">
                    ${formatDate(task.dueDate)}
                </span>
            </div>
            `;

        deadlineList.appendChild(
            item
        );

    });

}

// Current Date

function updateDate(){

    document.getElementById(
        "currentDate"
    ).textContent =
    getCurrentDate();

}

// Sidebar Navigation

function showSection(sectionId){

    const sections =
    document.querySelectorAll(
        ".section"
    );

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });

    document
    .getElementById(sectionId)
    .classList.add(
        "active-section"
    );

    const navItems =
    document.querySelectorAll(
        ".nav-item"
    );

    navItems.forEach(item => {

        item.classList.remove(
            "active"
        );

    });

    event.currentTarget.classList.add(
        "active"
    );

}

// Statistics Chart

let taskChart;

function updateChart(){

    const chartCanvas =
    document.getElementById(
        "taskChart"
    );

    if(!chartCanvas){

        return;

    }

    const completed =
    tasks.filter(
        task => task.completed
    ).length;

    const pending =
    tasks.length - completed;

    if(taskChart){

        taskChart.destroy();

    }

    taskChart = new Chart(
        chartCanvas,
        {

            type: "doughnut",

            data: {

                labels: [
                    "Completed",
                    "Pending"
                ],

                datasets: [{

                    data: [
                        completed,
                        pending
                    ],

                     backgroundColor: [
                            "#10b981",
                            "#3b82f6"
                    ],

                    borderWidth: 0

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}

const card =
document.createElement("div");

card.classList.add("task-card");

card.setAttribute(
    "draggable",
    "true"
);

card.dataset.id =
task.id;