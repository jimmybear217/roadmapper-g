let DB = false;
let openRequest = false;
if (indexedDB) {
    let openRequest = indexedDB.open("tasks", 1);
    openRequest.onupgradeneeded = (ev) => { ev.target.result.createObjectStore('tasks', {keyPath: 'taskId', autoIncrement: true}); };
    openRequest.onerror = (err) => { console.error("Unable to init IndexedDB:", err); };
    openRequest.onsuccess = function() {
        DB = openRequest.result;
        DB.onversionchange = (ev) => { dbDeleteTaskTable(ev.target.result) };
        console.debug("IndexedDB is ready:", DB);
        dbWriteTask("PUT", {
            taskId: 0,
            parentId: false,
            prerequisiteIds: false,
            status: "active",
            title: "Welcome to ReoadMapper-G",
            description: "This is your first ever task",
            link: "",
            priority: 0,
            due: false,
        })
        .oncomplete = () => {loadAllTasks()};
    };
    openRequest.onblocked = function() {
        console.error("Unable to init IndexedDB: connection blocked.");
        // it means that there's another open connection to same database and it wasn't closed after DB.onversionchange triggered for them
    };
    DB.oncomplete = loadAllTasksCompleted;
    DB.onerror = () => {
        console.error("An error happened on the database:", DB.error)
    }
}

let allTasks = [];

function getTaskList(count=25, step=0) {
    if (count == 0 && step == 0) {
        total = allTasks.length;
        return {data: allTasks, pagination: {totalItems: total, totalPages: 0, itemsPerPage: total, currentPage: 0}};
    } else {
        total = allTasks.length;
        pages = Math.floor(total / count)
        // step 0 is first page, items 0-25
        start = step * count;
        if (start < 0) start = 0;
        end = (step+1) * count;
        if (end > total) end = total;
        return {data: allTasks.slice(step * count, (step+1) * count), pagination: {totalItems: total, totalPages: pages, itemsPerPage: count, currentPage: step}};
    }
}

function updateTask(taskId, action="update", updates = []) {
    if (DB) {
        allTasks = updateTaskInDB(taskId, action, updates);
    } else {
        allTasks = updateTaskInLegacy(taskId, action, updates);
    }
}


function loadAllTasks() {
    console.log("Loading Tasks");
    if (DB) {
        loadAllTaskListFromDB()
        .oncomplete = loadAllTasksCompleted;
    } else {
        loadAllTaskListLegacy();
    }
}
function loadAllTasksCompleted() {
    console.log("All tasks loaded")
    document.getElementById("page-list").dispatchEvent(new Event("taskUpdate"));
}

function dbDeleteTaskTable(dbHanlde=DB) {
    // DROP TABLE IF EXISTS tasks
    if (dbHanlde.objectStoreNames.contains('tasks')) DB.deleteObjectStore('tasks');
    console.log("Deleted 'tasks' table if existed");
}

function dbWriteTask(method="ADD", tuple={}) {

    if (!tuple.hasOwnProperty("taskId") && method != "ADD")     tuple.taskId = undefined;
    if (!tuple.hasOwnProperty("parentId"))                      tuple.parentId = false;
    if (!tuple.hasOwnProperty("prerequisiteIds"))               tuple.prerequisiteIds = false;
    if (!tuple.hasOwnProperty("status"))                        tuple.status = "active";
    if (!tuple.hasOwnProperty("title"))                         tuple.title = "";
    if (!tuple.hasOwnProperty("description"))                   tuple.description = "";
    if (!tuple.hasOwnProperty("link"))                          tuple.link = "";
    if (!tuple.hasOwnProperty("priority"))                      tuple.priority = 0;
    if (!tuple.hasOwnProperty("due"))                           tuple.due = false;

    var transaction = DB.transaction('tasks', "readwrite");
    var objectStore = transaction.objectStore("tasks");
    if (method == "ADD") {
        var request = objectStore.add(tuple);
    } else if (method == "PUT") {
        var request = objectStore.put(tuple);
    } else {
        console.error("Unknown write method:", method);
    }
    request.onsuccess = () => { console.debug("Task added: ", request.result); }
    transaction.onerror = () => { console.warn("Transaction failed:", transaction.error); }
    return transaction;
}

function loadAllTaskListFromDB() {
    var transaction = DB.transaction('tasks', "readonly");
    var tasks = transaction.objectStore("tasks");
    request = tasks.getAll();
    request.onsuccess = () => {
        allTasks = request.result
    }
    transaction.onerror = () => {
        console.error("Unable to get all tasks from DB:", transaction.error);
        transaction.error.stopPropagation();
    }
    return transaction;
}
function updateTaskInDB(taskId, action, updates) {
    // var transaction = DB.transaction('tasks', "readwrite");
    // PUT query?
}
function createTaskListLegacy() {};
function loadAllTaskListLegacy() {}
function updateTaskInLegacy(taskId, action, updates) {}


document.getElementById("addTuple").addEventListener("click", () => {dbWriteTask("ADD", {parentId: false, prerequisiteIds: false, status: "active", title: "Welcome to ReoadMapper-G", description: "This is your first ever task", link: "", priority: 0, due: false }).oncomplete = () => {loadAllTasks()}});