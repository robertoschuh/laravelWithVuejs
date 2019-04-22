@extends('app')

@section('content')

<div class="row"   id="crud">>
	<div class="col-xs-12">
		<h1 class="page-header">CRUD Laravel y VUEjs</h1>
	</div>
	<div class="col-sm-7">
		<a href="#" class="btn btn-primary pull-right" data-toggle="modal" data-target="#create">
		Nueva tarea
        </a>
        
		<tasks></tasks>

	</div>
	<div class="col-sm-5">
		<pre>
			@{{ $data }}
		</pre>
	</div>
</div>

@endsection


