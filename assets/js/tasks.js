let tasksDB = false;
if (indexedDB) {
    let openRequest = indexedDB.open("tasks", 1);
    openRequest.onupgradeneeded = () => { console.error("Unable to init IndexedDB: Dabase is outdated"); };
    openRequest.onerror = (err) => { console.error("Unable to init IndexedDB:", err); };
    openRequest.onsuccess = function() {
        let tasksDB = openRequest.result;
        tasksDB.onversionchange = function() {
            tasksDB.close();
            console.error("Unable to use IndexedDB: Database is outdated.")
        };
        console.Info("IndexedDB is ready");
    };
    openRequest.onblocked = function() {
        console.error("Unable to init IndexedDB: connection blocked.");
        // it means that there's another open connection to same database and it wasn't closed after db.onversionchange triggered for them
    };
}


function getTaskList(count=25, step=0) {
    var allTasks = undefined;
    if (tasksDB) {
        allTasks = loadTaskListFromDB();
    } else {
        allTasks = loadTaskListLegacy();
    }
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
    if (tasksDB) {
        allTasks = updateTaskInDB(taskId, action, updates);
    } else {
        allTasks = updateTaskInLegacy(taskId, action, updates);
    }
}


function createTaskListFromDB() {};
function loadTaskListFromDB() {}
function updateTaskInDB(taskId, action, updates) {}
function createTaskListLegacy() {};
function loadTaskListLegacy() {}
function updateTaskInLegacy(taskId, action, updates) {}



// document.getElementById("page-list").dispatchEvent(new Event("taskUpdate"));