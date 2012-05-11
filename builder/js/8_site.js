$(window).ready(function() {
    initMyTodo();
    Overlay.initEvents();
});

function initMyTodo() {
    var lists, listId, todos, todoId;
    
    Data.init();
    UI.init();
    lists = Data.getLists();
    for(listId in lists) {
        UI.addList(listId, lists[listId]['listName'], lists[listId]['open'], lists[listId]['color'], Data.getListOrder(listId));
        
        todos = Data.getTodos(listId);
        if (todos !== false) {
            for(todoId in todos) {
                UI.addTodo($('#'+listId).find('table'), todoId, todos[todoId]['text'], todos[todoId]['status']);
            }
        }
    }
    initMyTodoEvents();
}

function initMyTodoEvents() {
    $('#add-list').click(function() {
        Event.showAddList();
    });

    $('#show-hide-dones').click(function() {
        Event.toggleDones();
    });
    
    $('#smaller-normal-text').click(function() {
        Event.toggleTextSize();
    });

    $('#list-per-row').change(function() {
        Event.changeListPerRow();
    });
}