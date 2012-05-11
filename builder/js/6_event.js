var Event = {
    toggleDones : function () {
        UI.toggleDones(Data.toggleDones());
    },
    
    toggleTextSize : function () {
        UI.toggleTextSize(Data.toggleTextSize());
    },
    
    changeListPerRow : function () {
        Data.changeListPerRow($('#list-per-row option:selected').val());
        UI.changeListPerRow();
    },
    
    showAddList : function() {
        if ($('.list').length < Config.maxList) {
            Overlay.showAddList();
        }
    },

    addList : function() {
        var listName = Overlay.getListName(),
            listId;
        
        if ($('.list').length < Config.maxList) {
            listId = Data.addList(listName);
            UI.addList(listId, listName, 1, Data.getListColor(listId), Data.getListOrder(listId));
            $('#overlay').hide();
        }
    },
    
    showRemoveList : function(item) {
        Overlay.showDeleteList(item.parent(), item.next().html());
    },
    
    removeList : function() {
        Data.removeList(Overlay.currentManagedItem.attr('id'));
        UI.removeList(Overlay.currentManagedItem.attr('id'));
        $('#overlay').hide();
    },
    
    toggleList : function(item) {
        Data.toggleList(item.parent().attr('id'));
        UI.toggleList(item.parent());
    },
    
    showAddModifyTodo : function(parentElem, editImg) {
        if (editImg) {
            Overlay.showAddModifyTodo(parentElem, editImg.parent().prev().html());
        } else {
            Overlay.showAddModifyTodo(parentElem, '');
        }
    },
    
    saveTodo : function() {
        var idTodo;
        
        if (Overlay.contentModified !== '') {
            idTodo = Overlay.currentManagedItem.attr('id').split('-');
            Data.modifyTodo(idTodo[0]+'-'+idTodo[1], idTodo[2], Overlay.getTodoText());
            UI.modifyTodo(Overlay.currentManagedItem.attr('id'), Overlay.getTodoText());
        } else {
            idTodo = Data.addTodo(Overlay.currentManagedItem.attr('id'), Overlay.getTodoText());
            UI.addTodo(Overlay.currentManagedItem.find('.list-table'), idTodo, Overlay.getTodoText(), 0);
        }
        $('#overlay').hide();
    },
    
    showRemoveTodo : function(item) {
        Overlay.showDeleteTodo(item.parent().parent(), item.parent().prev().html());
    },
    
    deleteTodo : function() {
        var idTodo = Overlay.currentManagedItem.attr('id').split('-');
        Data.removeTodo(idTodo[0]+'-'+idTodo[1], idTodo[2]);
        UI.removeTodo(Overlay.currentManagedItem.attr('id'));
        $('#overlay').hide();
    },
    
    toggleTodo : function(checkbox) {
        var todoId = checkbox.parent().parent().attr('id').split('-');
        UI.toggleTodo(checkbox.parent().parent(), Data.toggleTodo(todoId[0]+'-'+todoId[1], todoId[2]));
    }
};