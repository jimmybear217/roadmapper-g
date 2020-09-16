<?php
    header("Cache-Control: private");
    $NAV = Array(
        Array( "id" => "home", "href" => "javascript:switchPage(\"home\")", "text" => "Home"),
        Array( "id" => "visual", "href" => "javascript:switchPage(\"visual\")", "text" => "Visual"),
        Array( "id" => "list", "href" => "javascript:switchPage(\"list\")", "text" => "List"),
        Array( "id" => "sync", "href" => "javascript:switchPage(\"sync-dashboard\")", "text" => "<img id='online-status' src='/assets/img/sync/007-cloud-computing-31.svg' height='24' width='24'>"),
    );
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="/assets/css/main.css" type="text/css">
    <link rel="stylesheet" href="/assets/css/mobile.css" type="text/css" media="screen and (max-width: 600px)">
    <link rel="stylesheet" href="/assets/css/list.css" type="text/css">
    <title>RoadMapper-G</title>
</head>
<body>
    <div id='loader-page' style='display=block; position: fixed; background-color: white; top: 0; bottom:0; left: 0; right:0;'><div class="loader"></div></div>
    <header>
        <img id="logo" src="/assets/img/logo.png" alt="RoadMapper-G">
        <nav><?php
                foreach($NAV as $button) {
                    echo "\n\t\t\t<a id='";
                    echo (isset($button['id'])) ? "nav-" . $button['id'] : "";
                    echo "' href='";
                    echo (isset($button['href'])) ? $button['href'] : "";
                    echo "'>";
                    echo (isset($button['text'])) ? $button['text'] : "";
                    echo "</a>";
                } ?>
        </nav>
    </header>
    <div id='page' data-homePage="home">
        <section class='page' id='page-loading' data-navId="" enabled="true"><div class='loader'></div></section>
        <section class='page' id='page-list' data-navId="list">
            <table id='globalList'></table>
            <button id='btn_addTuple'><img src='/assets/img/add.png' height='24' width='24'>Add a new row</button>
            <button id='btn_clearStorage'><img src='/assets/img/delete.png' height='24' width='24'>Clear the list</button>
        </section>
        <section class='page' id='page-visual' data-navId="visual"></section>
        <section class='page' id='page-home' data-navId="home">
            <h1>Home sweet home</h1>
        </section>
        <section class='page' id='page-sync-dashboard' data-navId="list">
            <div class='dash-block' id='syncNetworkStatus'>
                <h2>Network Status</h2>
                <table>
                <?php
                    $syncNetworkTable = array("ok", "status", "statusText", "exception");
                    foreach($syncNetworkTable as $row) { echo "<tr><th>$row</th><td id='syncNetwork-$row'></td></tr>"; }
                ?>
                </table>
            </div>
            <div class='dash-block' id='syncStorageStatus'>
                <h2>Storage Status</h2>
                <table>
                <?php
                    $syncStorageTable = array("localCount", "remoteCount");
                    foreach($syncStorageTable as $row) { echo "<tr><th>$row</th><td id='syncStorage-$row'></td></tr>"; }
                ?>
                </table>
            </div>
            <div class='dash-wide'>
                <h2>Log</h2>
                <pre class='' id='syncOutput'><?php echo "[" . date(DATE_ATOM) . "] Generated page" . PHP_EOL; ?></pre>
            </div>
        </section>
    </div>
</body>
<script src="/assets/js/sync-manager.js" type="text/javascript"></script>
<script src="/assets/js/pages.js" type="text/javascript"></script>
<script src="/assets/js/list.js" type="text/javascript"></script>
<script src="/assets/js/tasks.js" type="text/javascript"></script>
</html>
