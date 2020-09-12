
function displayList() {
    var parent = document.getElementById("globalList");
    clearList(parent);
    addTrToList(parent, [
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
}

function addTrToList(parent, line=[], attr=[], insertBefore=null) {
    var holder = document.createElement("tr");
    line.forEach( cell => {
        if (cell.tag) var elem = document.createElement(cell.tag);
        else var elem = document.createElement("td");
        if (cell.text) elem.appendChild(document.createTextNode(cell.text));
        if (cell.attr) cell.attr.forEach( a => { elem.setAttribute(a.name, a.value); });
        holder.appendChild(elem);
    })
    if (attr) attr.forEach( a => { holder.setAttribute(a.name, a.value); });
    if (insertBefore) parent.insertBefore(holder, insertBefore)
    else parent.appendChild(holder)
}

function clearList(parent) {
    Array.from(parent.children).forEach( child => { parent.removeChild(child); });
}

document.getElementById("page-list").addEventListener("taskUpdate", event => {
    displayList();
    // event.stopImmediatePropagation()
});
displayList();