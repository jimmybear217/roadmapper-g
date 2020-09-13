<?php
    header("Cache-Control: private");
    $NAV = Array(
        Array( "id" => "home", "href" => "javascript:switchPage(\"home\")", "text" => "Home"),
        Array( "id" => "visual", "href" => "javascript:switchPage(\"visual\")", "text" => "Visual"),
        Array( "id" => "list", "href" => "javascript:switchPage(\"list\")", "text" => "List"),
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
        <section class='page' id='page-sync-debug' data-navId="list">
            <pre id='output-debug'></pre>
        </section>
    </div>
</body>
<script src="/assets/js/pages.js" type="text/javascript"></script>
<script src="/assets/js/list.js" type="text/javascript"></script>
<script src="/assets/js/tasks.js" type="text/javascript"></script>
</html>
