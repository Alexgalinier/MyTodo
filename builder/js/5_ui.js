var UI = {
    lists : ['list-0','list-1','list-2','list-3','list-4','list-5','list-6','list-7','list-8','list-9','list-10'],
    
    text : {
        showDones : 'SHOW DONES',
        hideDones : 'HIDE DONES',
        smallerText : 'SMALLER TEXT',
        normalText : 'NORMAL TEXT'
    },
    
    init : function() {
        if (Data.getDones() === 1) {
            $('#show-hide-dones').html(this.text.hideDones);
            $('section').removeClass('hide-dones');
        } else {
            $('#show-hide-dones').html(this.text.showDones);
            $('section').addClass('hide-dones');
        }
        
        if (Data.getTextSize() === 1) {
            $('#smaller-normal-text').html(this.text.smallerText);
            $('section').removeClass('smaller-text');
        } else {
            $('#smaller-normal-text').html(this.text.normalText);
            $('section').addClass('smaller-text');
        }
        
        $('#list-per-row').val(Data.getListPerRow());
        this.changeListPerRow();
    },
    
    toggleDones : function(showDones) {
        if (showDones === 1) {
            $('#show-hide-dones').html(this.text.hideDones);
            $('section').removeClass('hide-dones');
        } else {
            $('#show-hide-dones').html(this.text.showDones);
            $('section').addClass('hide-dones');
        }
    },
    
    toggleTextSize : function(normalSize) {
        if (normalSize === 1) {
            $('#smaller-normal-text').html(this.text.smallerText);
            $('section').removeClass('smaller-text');
        } else {
            $('#smaller-normal-text').html(this.text.normalText);
            $('section').addClass('smaller-text');
        }
    },
    
    changeListPerRow : function() {
        $('section').removeClass('list-per-row-1');
        $('section').removeClass('list-per-row-2');
        $('section').removeClass('list-per-row-3');
        $('section').removeClass('list-per-row-4');
        $('section').removeClass('list-per-row-5');
        $('section').addClass('list-per-row-'+Data.getListPerRow());
        $.each(this.lists, function(index, value) {
            if ($('#'+value).length === 1) {
                UI.positionCurrentList(Data.getListOrder(value), $('#'+value));
            }
        });
    },
    
    addList : function (id, name, open, color, order) {
        var listClass = '';
        
        if (open === 0) {
            listClass = ' list-closed';
        }
        
        this.positionNewList(order, ''+
        '<div id="'+id+'" class="list '+color+listClass+'">'+
            '<img class="delete-list" src="images/delete_32x32.png" alt="delete" title="delete" />'+
            '<h2>'+name+'</h2>'+
            '<div class="add-todo-content">'+
                '<a class="add-todo"><span class="add-todo-plus">+</span> New Todo</a>'+
            '</div>'+
            '<table class="list-table">'+
                '<tbody>'+
                '</tbody>'+
            '</table>'+
        '</div>');
    
        $('#'+id).find(".delete-list").click(function() {
            Event.showRemoveList($(this));
        });
        
        $('#'+id).find(".add-todo").click(function() {
            Event.showAddModifyTodo($(this).parent().parent(), null);
        });
        
        $('#'+id).find("h2").click(function() {
            Event.toggleList($(this));
        });
    },
    
    removeList : function(id) {
        $('#'+id).remove();
        $.each(this.lists, function(index, value) {
            if ($('#'+value).length === 1) {
                UI.positionCurrentList(Data.getListOrder(value), $('#'+value));
            }
        });
    },

    addTodo : function (listTable, id, text, status) {
        var todoId = listTable.parent().attr('id')+'-'+id,
            checkboxImg, trClass;
            
        if (status === 0) {
            trClass = '';
            checkboxImg = '<img src="images/checkbox_unchecked.png" class="todo-check" title="todo-done" alt="todo-done">';
        } else {
            trClass = ' class="done"';
            checkboxImg = '<img src="images/checkbox_checked.png" class="todo-check" title="todo-done" alt="todo-done">';
        }
        
        listTable.append(
            '<tr id="'+todoId+'" '+trClass+'>'+
                '<td class="list-table-checkbox">'+checkboxImg+'</td>'+
                '<td>'+Data.setUrlTags(text)+'</td>'+
                '<td class="list-table-actions"><img src="images/edit.png" class="img-edit" title="Edit" alt="Edit"><img src="images/delete_16x16.png" class="img-delete" title="Delete" alt="Delete"></td>'+
            '</tr>');
        
        $("#"+todoId).find(".img-edit").click(function() {
            Event.showAddModifyTodo($(this).parent().parent(), $(this));
        });
        
        $('#'+todoId).find(".img-delete").click(function() {
            Event.showRemoveTodo($(this));
        });
        
        $('#'+todoId).find(".todo-check").click(function() {
            Event.toggleTodo($(this));
        });
    },
    
    modifyTodo : function(todoId, text) {
        $('#'+todoId).find('td:nth-child(2)').html(Data.setUrlTags(text));
    },
    
    removeTodo : function(id) {
        var parentTable = $('#'+id).parent();
        $('#'+id).remove();
        
        parentTable.find('tr').each(function(index, value) {
            var changeTodoId = $(value).attr('id').split('-');
            $(this).attr('id', 'list-'+changeTodoId[1]+'-'+index);
        });
    },
    
    toggleList : function(list) {
        list.toggleClass('list-closed');
    },
    
    toggleTodo : function(todo, status) {
        todo.toggleClass('done').is('.done');
        if (status === 0) {
            todo.find('.todo-check').attr('src', 'images/checkbox_unchecked.png');
        } else {
            todo.find('.todo-check').attr('src', 'images/checkbox_checked.png');
        }
    },

    getImg : function (name, title, className) {
        if (className === null) {
            return '<img src="images/'+name+'" title="'+title+'" alt="'+title+'" />';
        } else {
            return '<img src="images/'+name+'" class="'+className+'" title="'+title+'" alt="'+title+'" />';
        }
    },
    
    positionNewList : function (order, contentList) {
        var position = order%Data.getListPerRow() + 1;
        $('#column-'+position).append(contentList);
    },
    
    positionCurrentList : function (id, list) {
        var position = id%Data.getListPerRow() + 1;
        list.appendTo('#column-'+position);
    }
};