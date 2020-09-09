<?php
    error_log("Starting up", 0);
    $nav = array(
        array(
            "href" => "/",
            "text" => "home",
        )
    );
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RoadMapper-G</title>
</head>
<body>
    <header>
        <img src="/assets/img/logo.png" alt="RoadMapper-G">
        <nav>
            <?php
                foreach($nav as $button) {
                    echo "<a href='";
                    echo (isset($button['href'])) ? $button['href'] : "";
                    echo (isset($button['current'])) ? " data-current='" . intval($button['href']) . "'" : "";
                    echo ">";
                    echo (isset($button['text'])) ? $button['text'] : "";
                    echo "</a>";
                }
            ?>
        </nav>
    </header>
</body>
</html>