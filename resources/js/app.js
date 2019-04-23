
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
        pagination: {
            'total' : 0,
            'current_page': 0,
            'per_page' : 0,
            'last_page' : 0,
            'from' : 0,
            'to' : 0
        },
        errors: [],
        offset: 5,
        offsetOptions: [1, 5, 10, 15, 20],
        numRowsPerPage: 5,  // default value
        resultsPerPageOptions: [1, 5, 10, 15, 20]
    },
    computed: {
        isActived: function(){
            return this.pagination.current_page;
        },

        pageNumber: function(){
            if(!this.pagination.to){
                return [];
            }

            var from = this.pagination.current_page - this.offset; 
            if(from < 1){
                from = 1;
            }

            var to = from + (this.offset * 2);

            if(to >= this.pagination.last_page){
                to = this.pagination.last_page;
            }
            
            var pagesArray = [];
            while(from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        }

    },
    methods: {
        getKeeps: function (page) {
            var urlKeeps = 'tasks?page=' + page + '&results=' + this.numRowsPerPage;
            axios.get(urlKeeps).then(response => {

                this.keeps      = response.data.tasks.data;
                this.pagination = response.data.pagination;
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
            
        },

        changePage: function(page){
            this.pagination.current_page = page;
            this.getKeeps(page);
        }
    }
});
