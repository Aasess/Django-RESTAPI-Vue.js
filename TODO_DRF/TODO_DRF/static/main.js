//django csrf handler
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

//load vuejs
var app = new Vue({
    el:'#app', //whole id of home.html
    data:{
        newtask:{}, //for handling newTODO and updateTODO
        tasks:[], //for viewing TODOlist
    },
//since vuejs has to wait for server so using async-await
    async created(){
       await this.getTodo();
    },

    methods: {
        submitForm(){
            if(this.newtask.id == undefined){
                this.createTask();
            }else{
                this.editTask(this.newtask);
            }
        },
//list all todolist
        async getTodo(){
               var url = "http://127.0.0.1:8000/api/todo/";
               var response = await fetch(url);
               this.tasks = await response.json();
        },
//create new todo
        async createTask(){
            await this.getTodo();
            await fetch("http://127.0.0.1:8000/api/todo/create",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(this.newtask)
            });
//            this.newtask = '';
            await this.getTodo();
            this.newtask = {};
        },
//edit selected todo
         async editTask(t){
            await this.getTodo();
            await fetch(`http://127.0.0.1:8000/api/todo/${t.id}/update`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(t)
            });
//            this.newtask = '';
            await this.getTodo();
            this.newtask = {};


        },
//delete todo
        async deleteTask(t){
            await this.getTodo();
            await fetch(`http://127.0.0.1:8000/api/todo/${t.id}/delete`,
            {
                 method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(t)
            });
            await this.getTodo();
        },
//update completed boolean expression
         async completeTask(t){
             await this.getTodo();
             t.completed = !t.completed;
            await fetch(`http://127.0.0.1:8000/api/todo/${t.id}/update`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(t)
            });

            await this.getTodo();
        },


    }
})
