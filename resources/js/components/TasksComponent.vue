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
                            <a href="#" class="btn btn-warning btn-sm" v-on:click="editKeep(keep)">Editar</a>
                        </td>
                        <td width="10px">
                            <a href="#" class="btn btn-danger btn-sm" v-on:click="deleteKeep(keep)">Eliminar</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- TODO move to a blade template 
                @include('modal.edit')
                @include('modal.create')
            -->
            <h4>modals here</h4>
            <form method="POST" v-on:submit.prevent="createKeep">
                <div class="modal fade" id="create">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                                <h4>Create</h4>
                            </div>
                            <div class="modal-body">
                                <label for="keep">New Task</label>
                                <input type="text" name="keep" class="form-control" v-model="newKeep">
                                <span v-for="error in errors" class="text-danger">@{{ error }}</span>
                            </div>
                            <div class="modal-footer">
                                <input type="submit" class="btn btn-primary" value="Guardar">
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <!-- TODO move to a blade template -->
            <form method="POST" v-on:submit.prevent="updateKeep(fillKeep.id)">
                <div class="modal fade" id="edit">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                                <h4>Edit</h4>
                            </div>
                            <div class="modal-body">
                                <label for="keep">Update Task</label>
                                <input type="text" name="keep" class="form-control" v-model="fillKeep.keep">
                                <span v-for="error in errors" class="text-danger">@{{ error }}</span>
                            </div>
                            <div class="modal-footer">
                                <input type="submit" class="btn btn-primary" value="Guardar">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
   
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
                        toastr.success('Item removed');
                        location.reload();
                    })
                },

                createKeep: function(){
                    var url = 'tasks';
                    axios.post(url, {
                        keep: this.newKeep
                    }).then(response => {
                        this.newKeep = '';
                        this.errors = '';
                        $('#create').modal('hide');
                        toastr.success('New tasks created');
                        location.reload();
                    }).catch(error => {
                        this.errors = error.response.data;
                    });
                },

                editKeep: function(keep){
                    console.log('modal edit');
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