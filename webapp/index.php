<?php
    header("Cache-Control: private");
    $NAV = Array(
        Array( "href" => "/", "text" => "home" ),
        Array( "href" => "/webapp", "text" => "webapp"),
        Array( "href" => "/", "text" => "page1" ),
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
    <title>RoadMapper-G</title>
</head>
<body>
    <div id='loader-page' style='display=block; position: fixed; background-color: white; top: 0; bottom:0; left: 0; right:0;'><div class="loader"></div></div>
    <header>
        <img id="logo" src="/assets/img/logo.png" alt="RoadMapper-G">
        <nav><?php
                foreach($NAV as $button) {
                    echo "\n\t\t\t<a href='";
                    echo (isset($button['href'])) ? $button['href'] : "";
                    echo "'>";
                    echo (isset($button['text'])) ? $button['text'] : "";
                    echo "</a>";
                } ?>    
        </nav>
    </header>
    <div id='page' data-homePage="home">
        <section class='page' id='page-loading' enabled="true"><div class='loader'></div></section>
        <section class='page' id='page-list'><table id='globalList'></table></section>
        <section class='page' id='page-visual'></section>
        <section class='page' id='page-home'>
            <h1>Home sweet home</h1>
        </section>
    </div>
</body>
<script src="/assets/js/pages.js" type="text/javascript"></script>
</html>
