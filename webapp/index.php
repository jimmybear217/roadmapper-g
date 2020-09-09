<?php
    header("Cache-Control: private");
    $NAV = Array(
        Array( "href" => "/", "text" => "home" ),
        Array( "href" => "/webapp", "text" => "webapp", "current" => true ),
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
    <header>
        <img id="logo" src="/assets/img/logo.png" alt="RoadMapper-G">
        <nav>
            <?php
                foreach($NAV as $button) {
                    echo "<a href='";
                    echo (isset($button['href'])) ? $button['href'] : "";
                    echo (isset($button['current'])) ? " data-current='" . intval($button['href']) . "'" : "";
                    echo "'>";
                    echo (isset($button['text'])) ? $button['text'] : "";
                    echo "</a>";
                }
            ?>
        </nav>
    </header>
    <div id='page'>
        <section class='page' id='page-loading' enabled="true"><div class='loader'></div></section>
        <section class='page' id='page-list'><table id='globalList'></table></section>
        <section class='page' id='page-visual'></section>
    </div>
</body>
</html>
