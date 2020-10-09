function addTaskToView(taskData={}) {
    if (taskData.lenght < 2) {
        console.error("Task Data", taskData, "is smaller than 2 elements");
        return false;
    }
    switch (taskData["type"]) {
        case 'Goal':    // contains tasks
            // add to galery view
            
            break;
        case 'Task':    // contains steps
            // add to corresponding goal
            break;
        case 'step':    // describe something to do
            // add to corresponding task
            break;
        default:
            // add to List
            break;
    }
    
}

function visual_addGoal(id, title, status) {
    var element = document.createElement("div");
    element.setAttribute("id", "visual-goal-" + id);
    element.className = "visual-goal";
    switch (status) {
        case "active":
        case "completed":
        case "locked":
            var parent = document.getElementById("container-visual-" + status);
            element.classList.add(status);
            break;
        default:
            var parent = document.getElementById("container-visual-unknown");
            element.classList.add("unkown-status");
    }
    var elementTitle = document.createElement("h3");
    elementTitle.className = "visual-goal-title";
    elementTitle.appendChild(document.createTextNode(title));
    element.appendChild(elementTitle);
    /** @todo add containers for tasks */
    parent.appendChild(element);
    return element;
}