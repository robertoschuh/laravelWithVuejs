<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel & VUE</title>
        <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    </head>
    <body>
        <div class="container" id="crud">
            
            @yield('content')

        </div>
        
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>