@extends('app')

@section('content')
	<div  class="row">
		<div class="col-sm-12">
			<h1 class="page-header">CRUD Laravel y VUEjs</h1>
		</div>
 </div>
<div class="row">	
		  <div class="col-sm-6">
				<a href="#" class="btn btn-primary pull-left" data-toggle="modal" data-target="#create">
				Nueva tarea
				</a>
			</div>
			<div class="col-sm-3">
				<div class="form-group float-left">
					<label for="offset">Offset</label>
					<select class="form-control" id="offset" v-model="offset">
						<option v-for="offset in offsetOptions">@{{ offset }}</option>
					</select>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="form-group float-left">
					<label for="numRowsPerPage">Num results per page</label>
					<select class="form-control" id="numRowsPerPage" v-model="numRowsPerPage" v-on:change="getKeeps(pagination.current_page)">
						<option v-for="perPage in resultsPerPageOptions">@{{ perPage }}</option>
					</select>
				</div>
			</div>
			
</div>
<div class="row">			
			<div class="col-sm-12">    
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
			<nav>
				<ul class="pagination">
					<li v-if="pagination.current_page > 1">
						<a href="#" @click.prevent="changePage(pagination.current_page - 1)">
							<span>Back</span>
						</a>
					<li>

					<li v-for="page in pageNumber" v-bind:class="[ page == isActived ? 'active' : '']">
						<a href="#" @click.prevent="changePage(page)">
							@{{ page }}
					</a>
					</li>

					<li v-if="pagination.current_page < pagination.last_page">
						<a href="" @click.prevent="changePage(pagination.current_page + 1)">
							<span>Next</span>
						</a>
					<li>
				</ul>
			</nav>
			
			<nav>
				<ul class="pagination">
				

				</ul>
			</nav>
			@include('create')
			@include('edit')


		</div>
</div>
 <div class="row">
		<div class="col-sm-12">
			<h4>Debuging...</h4>
			<pre>
				@{{ $data }}
			</pre>
		</div>
	</div>

@endsection


