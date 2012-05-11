var Overlay = {
    currentManagedItem : null,
    contentModified : '',
    
    showAddList : function() {
        this.prepareOverlay('overlay-add-list');
        $('#overlay').show();
        $('#overlay-add-list-input').val('').focus();
    },
    
    showAddModifyTodo : function(item, content) {
        this.currentManagedItem = item;
        this.contentModified = content;
        this.prepareOverlay('overlay-modify-todo');
        $('#overlay').show();
        $('#overlay-modify-todo-input').val(content).focus();
    },

    showDeleteTodo : function(item, content) {
        this.currentManagedItem = item;
        this.prepareOverlay('overlay-delete-todo');
        $('#overlay').show();
        $('#overlay-delete-todo-p').html(content).focus();
    },

    showDeleteList : function(item, content) {
        this.currentManagedItem = item;
        this.prepareOverlay('overlay-delete-list');
        $('#overlay-delete-list-p').html(content);
        $('#overlay').show();
    },
    
    getListName : function() {
        return $("#overlay-add-list-input").val();
    },
    
    getTodoText : function() {
        return $("#overlay-modify-todo-input").val();
    },

    prepareOverlay : function(idToShow) {
        $('#overlay').hide();
        $('#overlay-modify-todo').hide();
        $('#overlay-delete-todo').hide();
        $('#overlay-add-list').hide();
        $('#overlay-delete-list').hide();
        $('#'+idToShow).show();
    },
    
    initEvents : function() {
        $('#overlay-add-list-input').keyup(function(e) {
            if (e.keyCode == '13') {
                $('#overlay-add-list-save').click();
            }
        });
        $('#overlay-modify-todo-input').keyup(function(e) {
            if (e.keyCode == '13') {
                $('#overlay-modify-save').click();
            }
        });
        
        $('#overlay-add-list-save').click(function() {  
            if (Overlay.getListName() !== '') {
                Event.addList();    
            } else {
                $('#overlay').hide();
            }
        });

        $('#overlay-delete-list-ok').click(function() { 
            Event.removeList(); 
        });

        $('#overlay-modify-save').click(function() {    
            if (Overlay.getTodoText() !== '') {
                Event.saveTodo();   
            } else {
                $('#overlay').hide();
            }
        });

        $('#overlay-delete-ok').click(function() {      
            Event.deleteTodo(); 
        });

        $('#overlay-add-list-cancel').click(function() {$('#overlay').hide();});
        $('#overlay-modify-cancel').click(function() {$('#overlay').hide();});
        $('#overlay-delete-cancel').click(function() {$('#overlay').hide();});
        $('#overlay-delete-list-cancel').click(function() {$('#overlay').hide();});
    }
};