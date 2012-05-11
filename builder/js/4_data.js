var Data = {
    myTodo : {
        'show-dones' : 1,
        'normal-text' : 1,
        'list-per-row' : 3,
        'list-order' : [],
        'lists' : {}
    },
    
    init : function() {
        if (localStorage['my-todo'] != undefined) {
            this.myTodo = JSON.parse(localStorage['my-todo']);
        } else {
            localStorage['my-todo'] = '';
        }
        
        return true;
    },
    
    getDones : function() {
        return this.myTodo['show-dones'];
    },
    
    getTextSize : function() {
        return this.myTodo['normal-text'];
    },
    
    getListPerRow : function() {
        return this.myTodo['list-per-row'];
    },
    
    toggleDones : function() {
        this.myTodo['show-dones'] = (this.myTodo['show-dones'] === 1) ? 0 : 1;
        this.save();
        return this.myTodo['show-dones']
    },
    
    toggleTextSize : function() {
        this.myTodo['normal-text'] = (this.myTodo['normal-text'] === 1) ? 0 : 1;
        this.save();
        return this.myTodo['normal-text'];
    },
    
    changeListPerRow : function(perRow) {
        this.myTodo['list-per-row'] = perRow;
        this.save();
        return this.myTodo['list-per-row'];
    },
    
    getLists : function() {
        return this.myTodo['lists'];
    },
    
    getListOrder : function(listId) {
        return this.myTodo['list-order'].indexOf(listId);
    },
    
    addList : function(listName) {
        var id = this.getNextListId();
        this.myTodo.lists['list-'+id] = {'listName' : listName, 'open' : 1, 'color' : this.getNextColor(), 'todos' : []};
        this.myTodo['list-order'].push('list-'+id);
        this.save();
        
        return 'list-'+id; 
    },
    
    removeList : function(listId) {
        if (this.myTodo.lists[listId] !== undefined) {
            delete this.myTodo.lists[listId];
            this.myTodo['list-order'].splice(this.myTodo['list-order'].indexOf(listId), 1);
            this.save();
        }
        
        return false; 
    },
    
    toggleList : function(listId) {
        if (this.myTodo.lists[listId] !== undefined) {
            this.myTodo.lists[listId]['open'] = (this.myTodo.lists[listId]['open'] === 1) ? 0 : 1;
            this.save();
        }
        
        return false; 
    },
    
    getListColor : function(listId) {
        return this.myTodo.lists[listId]['color'];
    },
    
    getTodos : function(listId) {
        if (this.myTodo.lists[listId] !== undefined) {
            return this.myTodo.lists[listId]['todos'];
        }
        
        return false;
    },
    
    addTodo : function(listId, todoText) {
        if (this.myTodo.lists[listId] !== undefined) {
            this.myTodo.lists[listId]['todos'].push({'text': todoText, 'status': 0});
            this.save();
            return this.myTodo.lists[listId]['todos'].length - 1;
        }
        
        return false; 
    },
    
    modifyTodo : function(listId, todoId, todoText) {
        if (this.myTodo.lists[listId] !== undefined) {
            if (this.myTodo.lists[listId]['todos'][todoId] !== undefined) {
                this.myTodo.lists[listId]['todos'][todoId]['text'] = todoText;
                this.save();
                return true;
            }
        }
        
        return false;
    },
    
    removeTodo : function(listId, todoId) {
        if (this.myTodo.lists[listId] !== undefined) {
            if (this.myTodo.lists[listId]['todos'][todoId] !== undefined) {
                this.myTodo.lists[listId]['todos'].splice(todoId, 1);
                this.save();
                return true;
            }
        }
        
        return false;
    },
    
    toggleTodo : function(listId, todoId) {
        if (this.myTodo.lists[listId] !== undefined) {
            if (this.myTodo.lists[listId]['todos'][todoId] !== undefined) {
                this.myTodo.lists[listId]['todos'][todoId]['status'] = (this.myTodo.lists[listId]['todos'][todoId]['status'] === 0) ? 1 : 0;
                this.save();
                return this.myTodo.lists[listId]['todos'][todoId]['status'];
            }
        }
        
        return false;
    },
    
    save : function() {
        localStorage['my-todo'] = JSON.stringify(this.myTodo);
        return true;
    },
    
    getNextListId : function() {
        var listId;

        for(listId = 0; listId < Config.maxList; listId++) {
            if (this.myTodo.lists['list-'+listId] === undefined) {
                return listId+'';
            }
        }
        
        return listId+'';
    }, 
    
    getNextColor : function() {
        var listId, existingColors;

        existingColors = Config.colors.slice();
        for(listId in this.myTodo['lists']) {   
            existingColors.splice(existingColors.indexOf(this.myTodo['lists'][listId]['color']), 1);
        }

        return existingColors[0];
    }, 
    
    clear : function() {
        localStorage.removeItem('my-todo');
        return true;
    }
};