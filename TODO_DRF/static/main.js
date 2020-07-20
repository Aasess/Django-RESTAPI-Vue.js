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

var app = new Vue({
    el:'#app',
    data:{
        newtask:{},
        tasks:[]
    },

    async created(){
       await this.getTodo();
    },

    methods: {
        submitForm(){
            this.createTask();
        },

        async completeTask(t){

            t.completed = !t.completed;
             await this.getTodo();
            await fetch(`http://127.0.0.1:8000/api/todo/${t.id}/update`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(t)
            });

            await this.getTodo();
            this.newtask = {};
        },

        async getTodo(){
               var url = "http://127.0.0.1:8000/api/todo/";
               var response = await fetch(url);
               this.tasks = await response.json();
        },

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


    }
})
