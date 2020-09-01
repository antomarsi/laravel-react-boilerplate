<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel and React.js</title>
    @env('development')
    @include('components.grid-system')
    @endenv

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:200,600" rel="stylesheet" />

    <link rel="stylesheet" type="text/css" src="{{ asset('css/app.css') }}" />
</head>

<body>
    @yield('content')
    <script src="{{ asset('js/index.js') }}"></script>
</body>

</html>
