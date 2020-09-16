/**
 * 
 * sync-manager.js
 * 
 * This script defines the behavior of the software to manage local data and remote data.
 * This must include ability to differentiate between older and newer data, as well as
 * reconcilate conflicting data. This will also handle the creation of new IDs to be
 * used for tasks as tasks will be uploaded as soon as possible.
 * 
 * 
 * task structure:
 * 		- serverID
 * 		- localID
 * 		- timestamp (last change)
 * 		- task details
 * 
 * task creation:
 * 		1. script creates localID
 * 		2. user creates tasks
 * 		3. once saved, script attempts to upload task to server
 * 
 * task update:
 * 		1. task is updated in DB
 * 		2. script is informed task is updated and stores upload job in cache
 * 		3. script attempts to upload updated task periodically
 * 
 * task deletion:
 * 		1. task is delete from DB
 * 		2. script is informed task is deleted and stores delete job in cache
 * 		3. script attempts to delete task from DB periodically
 * 
 * conflicts:
 * 		1. tasks are prioritized by timestamp
 * 		2. create job has to happen before update job
 * 		3. if delete job timestamp is before task last change, delete job is canceled
 * 
 * reconciliation:
 * 		1. local data is uploaded
 * 		2. all locallly existing tasks are updated to server version
 * 		3. all non-complete tasks are downloaded from server
 * 
 * initialization:
 * 		1. only non-complete tasks are downloaded and stored locally
 * 
 * maintenance:
 * 		- script periodically attempts to synchronize server and client (2 minutes)
 * 		- completed tasks are deleted locally 7 days after completion
 * 		- for any older data, user must use online-only archive search interface
 * 
 * interactivity:
 * 		the image #online-status will be updated with an icon representing the sync status
 *      the #page-sync-dashboard will contains a summary of the sync status with live data
 * 
 * 		
 */

let SYNC_STATUS_IMG = {
    unknown: "/assets/img/sync/007-cloud-computing-31.svg",
    offline: "/assets/img/sync/019-cloud-computing-19.svg",
    ready: "/assets/img/sync/001-cloud-computing-37.svg",
    warning: "/assets/img/sync/037-cloud-computing-1.svg",
    error: "/assets/img/sync/016-cloud-computing-22.svg",
    uploading: "/assets/img/sync/002-cloud-computing-36.svg",
    downloading: "/assets/img/sync/017-cloud-computing-21.svg",
    synchronizing: "/assets/img/sync/005-cloud-computing-33.svg",
}
let SYNC_STATE_ONLINE = false;
let SYNC_RUN_INTERVAL = 1000*60*2;
let SYNC_INTERVAL_PID = false;

function sync_ping() {
    var z = Math.floor(Math.random() * 10000);
    console.log("[sync] pinging /api");
    sync_updateDashboard("log", "pinging /api");
    fetch("/api/ping/global.php?z=" + z.toString())
    .then(function(response) {
        console.log("[sync] Sync returned", response);
        sync_updateDashboard("httpException", "");
        sync_updateDashboard("httpok", response.ok);
        sync_updateDashboard("httpStatus", response.status);
        sync_updateDashboard("httpStatusText", response.statusText);
        if (response.ok) {
            document.getElementById("online-status").setAttribute("src", SYNC_STATUS_IMG.ready);
            SYNC_STATE_ONLINE = true;
            sync_execute();
        } else {
            document.getElementById("online-status").setAttribute("src", SYNC_STATUS_IMG.offline);
            console.warn("[sync] Sync is offline");
            SYNC_STATE_ONLINE = false;
        }
    })
    .catch(function(reason) {
        console.error("[sync]", reason);
        sync_updateDashboard("httpException", reason);
        sync_updateDashboard("httpok", "false");
        sync_updateDashboard("httpStatus", "");
        sync_updateDashboard("httpStatusText", "");
    })
}

function sync_stopInterval() {
    clearInterval(SYNC_INTERVAL_PID);
    SYNC_INTERVAL_PID = false;
}

function sync_execute() {
    if (!SYNC_STATE_ONLINE) {
        console.error("[sync] execute could not run because sync is offline");
        return false;
    }
    document.getElementById("online-status").setAttribute("src", SYNC_STATUS_IMG.synchronizing);
    setTimeout( () => {
        document.getElementById("online-status").setAttribute("src", SYNC_STATUS_IMG.ready);
    }, 500);
}

function sync_updateDashboard(key, value) {
    switch (key) {
        case 'httpStatus':
            document.getElementById("syncNetwork-status").innerText = value;
            break;
        case 'httpStatusText':
            document.getElementById("syncNetwork-statusText").innerText = value;
            break;
        case 'httpException':
            document.getElementById("syncNetwork-exception").innerText = value;
            break;
        case 'httpok':
            document.getElementById("syncNetwork-ok").innerText = value;
            break;
        case 'log':
        default:
            document.getElementById("syncOutput").innerText += "[" + new Date() + "] " + value + "\n";
            break;
    }
}

SYNC_INTERVAL_PID = setInterval(sync_ping, SYNC_RUN_INTERVAL);
sync_ping();