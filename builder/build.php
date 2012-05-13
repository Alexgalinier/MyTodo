<?php 
    require 'helper.php';  
    ob_start();
?>
<!DOCTYPE html>
<html lang="en" manifest="mytodo.manifest">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>My Todo</title>
        
        <?php Helper::getCss(); ?>
    </head>
    <body>
        <header>
            <h1>My Todo</h1>
            <a id="add-list">ADD LIST</a>
            <a id="show-hide-dones"></a>
            <a id="smaller-normal-text"></a>
            <label>List per row :</label>
            <select id="list-per-row">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3" selected="selected">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </header>
        <section class="list-per-row-3">
            <div id="column-1"></div>
            <div id="column-2"></div>
            <div id="column-3"></div>
            <div id="column-4"></div>
            <div id="column-5"></div>
        </section>
        
        <div id="overlay">
            <div id="overlay-add-list">
                <div class="overlay-content">
                    <input type="text" id="overlay-add-list-input" name="add-list" placeholder="Enter your new List name..." />
                </div>
                <div class="overlay-buttons">
                    <input type="button" id="overlay-add-list-save" value="Add it !" />
                    <input type="button" id="overlay-add-list-cancel" value="Cancel" />
                </div>
            </div>
            <div id="overlay-modify-todo">
                <div class="overlay-content">
                    <input type="text" id="overlay-modify-todo-input" name="modify-todo" placeholder="Enter your Todo description..."/>
                </div>
                <div class="overlay-buttons">
                    <input type="button" id="overlay-modify-save" value="Save" />
                    <input type="button" id="overlay-modify-cancel" value="Cancel" />
                </div>
            </div>
            <div id="overlay-delete-todo">
                <div class="overlay-content">
                    Do you want to delete the following Todo ?
                    <p id="overlay-delete-todo-p"></p>
                </div>
                <div class="overlay-buttons">
                    <input type="button" id="overlay-delete-ok" value="Delete it !" />
                    <input type="button" id="overlay-delete-cancel" value="Cancel" />
                </div>
            </div>
            <div id="overlay-delete-list">
                <div class="overlay-content">
                    Do you want to delete the following List ?
                    <p id="overlay-delete-list-p"></p>
                </div>
                <div class="overlay-buttons">
                    <input type="button" id="overlay-delete-list-ok" value="Delete it !" />
                    <input type="button" id="overlay-delete-list-cancel" value="Cancel" />
                </div>
            </div>
        </div>
        
        <?php Helper::getJS(); ?>
    </body>
</html>
<?php 
    file_put_contents(__DIR__.'/../mytodo.html', ob_get_clean());
    echo PHP_EOL;
    echo 'My Todo file as been generated in '.__DIR__.'/../mytodo.html';
    echo PHP_EOL;
    echo PHP_EOL;
?>
