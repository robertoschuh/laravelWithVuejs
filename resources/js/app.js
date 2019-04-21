
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


const app = new Vue({
    el: '#crud',

    // created is called everytime the object is created/instantiated
    created: function(){
        this.getKeeps();
    },
    data: {
        keeps: [],
        newKeep: '',
        fillKeep: {'id' : '', 'keep' : ''},
        errors: []
    },
    methods: {
        getKeeps: function () {
            var urlKeeps = 'tasks';
            axios.get(urlKeeps).then(response => {

                this.keeps = response.data;
                console.log(this.keeps);
            });
        },

        deleteKeep: function(keep){
            var url = 'tasks/' + keep.id;
            axios.delete(url).then(response => {
                this.getKeeps();
                toastr.success('Item removed');
            })
        },

        createKeep: function(){
            var url = 'tasks';
            axios.post(url, {
                keep: this.newKeep
            }).then(response => {
                this.getKeeps();
                this.newKeep = '';
                this.errors = '';
                $('#create').modal('hide');
                toastr.success('New tasks created');
            }).catch(error => {
                this.errors = error.response.data;
            });
        },

        editKeep: function(keep){
            var url = 'tasks';
            this.fillKeep.id   = keep.id;
            this.fillKeep.keep = keep.keep;
            $('#edit').modal('show');
        },

        updateKeep: function(id){
            alert('updating keep' + id);
            url = 'tasks/' + id;
            axios.put(url,
                this.fillKeep
            ).then(response => {
                this.getKeeps();
                this.fillKeep = {'id' : '', 'keep' : ''};
                this.errors = [];
                $('#edit').modal('hide');
                toastr.success('Tasks edited succesfully');
            }).catch(error => {
                this.errors = error.response.data;
            });
            
        }
    }
});
