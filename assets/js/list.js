
function displayList() {
    var parent = document.getElementById("globalList");
    var tasks = getTaskList(0,0);
    clearList(parent);
    addTrToList(parent, [
        { tag: "th", text: ""},
        { tag: "th", text: "taskId"},           // Unique ID of the task
        { tag: "th", text: "parentId" },        // Parent of task when using subtasks
        { tag: "th", text: "prerequisiteIds" }, // Tasks that must be completed before this task is available
        { tag: "th", text: "status" },          // status of this task
        { tag: "th", text: "title" },           // Title of task
        { tag: "th", text: "description" },     // Description of task
        { tag: "th", text: "link" },            // Hyperlink this tasks references
        { tag: "th", text: "priority" },        // priority of this task
        { tag: "th", text: "due" },             // timestamp when task is due
    ]);
    tasks.data.forEach( (task, index) => {
        addTrToList(parent, [
            { tag: "td", attr: [ {key: "id", value: "list-task-controls-" + task.taskId.toString()}, { key: 'class', value: "list-task-controls"}]},
            { tag: "td", text: task.taskId.toString(), attr: [{key: "data-key", value: "taskId"}] },
            { tag: "td", text: task.parentId.toString(), attr: [{key: "data-key", value: "parentId"}] },
            { tag: "td", text: task.prerequisiteIds.toString(), attr: [{key: "data-key", value: "prerequisiteIds"}] },
            { tag: "td", text: task.status.toString(), attr: [{key: "data-key", value: "status"}] },
            { tag: "td", text: task.title.toString(), attr: [{key: "data-key", value: "title"}] },
            { tag: "td", text: task.description.toString(), attr: [{key: "data-key", value: "description"}] },
            { tag: "td", text: task.link.toString(), attr: [{key: "data-key", value: "link"}] },
            { tag: "td", text: task.priority.toString(), attr: [{key: "data-key", value: "priority"}] },
            { tag: "td", text: task.due.toString(), attr: [{key: "data-key", value: "due"}] },
        ], [{key: "id", value: "list-task-" + task.taskId.toString()}, { key: "data-index", value: index}]);
        addControlsToTr(task.taskId);
    });
}

function addTrToList(parent, line=[], attr=[], insertBefore=null) {
    var holder = document.createElement("tr");
    line.forEach( cell => {
        if (cell.tag) var elem = document.createElement(cell.tag);
        else var elem = document.createElement("td");
        if (cell.text) elem.appendChild(document.createTextNode(cell.text));
        if (cell.attr) cell.attr.forEach( a => { elem.setAttribute(a.key, a.value); });
        holder.appendChild(elem);
    })
    if (attr) attr.forEach( a => { holder.setAttribute(a.key, a.value); });
    if (insertBefore) parent.insertBefore(holder, insertBefore)
    else parent.appendChild(holder)
}

function addControlsToTr(taskId) {
    var imageHeight = "32"
    var parent = document.getElementById("list-task-controls-" + taskId.toString());
    deleteBtn = document.createElement("img");
    deleteBtn.setAttribute("height", imageHeight);
    deleteBtn.setAttribute("width", imageHeight);
    deleteBtn.setAttribute("src", "/assets/img/delete.png");
    deleteBtn.setAttribute("alt", "delete");
    deleteBtn.addEventListener("click", () => {deleteLine(taskId)} );
    parent.appendChild(deleteBtn);
    completeBtn = document.createElement("img");
    completeBtn.setAttribute("height", imageHeight);
    completeBtn.setAttribute("width", imageHeight);
    completeBtn.setAttribute("src", "/assets/img/done.png");
    completeBtn.setAttribute("alt", "complete");
    completeBtn.addEventListener("click", () => {updateLine(taskId, "status", "complete")} );
    parent.appendChild(completeBtn);
}

function updateLine(taskId, key, newValue) {
    updateTask(taskId, "status", "complete");
}

function deleteLine(taskId) {
    var elem = document.getElementById("list-task-" + taskId.toString());
    elem.parentElement.removeChild(elem);
    deleteTask(taskId);
}

function clearList(parent) {
    Array.from(parent.children).forEach( child => { parent.removeChild(child); });
}

document.getElementById("page-list").addEventListener("taskUpdate", event => {
    displayList();
    event.stopImmediatePropagation()
});