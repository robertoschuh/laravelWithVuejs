<template>
        <div id="tasks">    
            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarea</th>
                        <th colspan="2">
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="keep in keeps">
                        <td width="10px">@{{ keep.id }}</td>
                        <td>@{{ keep.keep }}</td>
                        <td width="10px">
                            <a href="#" class="btn btn-warning btn-sm" v-on:click.prevent="editKeep(keep)">Editar</a>
                        </td>
                        <td width="10px">
                            <a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="deleteKeep(keep)">Eliminar</a>
                        </td>
                    </tr>
                </tbody>
            </table>

   
            
            <infinite-loading @infinite="infiniteHandler">
                <div slot="no-more">--</div>
                <div slot="spinner">Loading tasks...</div>
                <div slot="no-results">There are not tasks</div>
            </infinite-loading>

  
        <div class="col-sm-4">
            <pre>
                @{{ $data }}
            </pre>
        </div>
    </div>
</template>

<script>
    export default {
            mounted() {
                console.log('Component TaskComponent mounted.')
            },
   
    
            data() {
                return {
                    keeps: [],
                    newKeep: '',
                    fillKeep: {'id' : '', 'keep' : ''},
                    errors: [],
                    offset: 3,
                    page: 0
                };
            },

            methods: {
       
                deleteKeep: function(keep){
                    var url = 'tasks/' + keep.id;
                    axios.delete(url).then(response => {
                       // this.getKeeps();
                        toastr.success('Item removed');
                    })
                },

                createKeep: function(){
                    var url = 'tasks';
                    axios.post(url, {
                        keep: this.newKeep
                    }).then(response => {
                       // this.getKeeps();
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
                      //  this.getKeeps();
                        this.fillKeep = {'id' : '', 'keep' : ''};
                        this.errors = [];
                        $('#edit').modal('hide');
                        toastr.success('Tasks edited succesfully');
                    }).catch(error => {
                        this.errors = error.response.data;
                    });
                    
                },

                // Infinite loading implementation.
                infiniteHandler($state){
                    this.page++;
                    let url = 'http://laravelvuecrud.test/api/tasks/?page= ' + this.page;

                    axios.get(url)
                    .then(response => {
                        console.log('result', response.data);
                        let tasks = response.data.data;
                        if(tasks.length){
                            this.keeps = this.keeps.concat(tasks);
                            $state.loaded();
                        }else{
                            $state.complete();
                    }
                })
             }
            }   
        }

</script>