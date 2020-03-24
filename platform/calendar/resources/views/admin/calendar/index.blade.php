<!doctype html>
<html lang="en">
<head>
    <meta charset='utf-8'>
    <meta name='csrf-token' content='{{ csrf_token() }}'>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
    <!-- Bootstrap core CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">

    {{--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.css"/>--}}
    <link href='/platform/calendar/admin/fullcalendar/packages/core/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages/daygrid/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages/timegrid/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages/list/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages-premium/timeline/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages-premium/resource-timeline/main.css' rel='stylesheet'/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.css">
    <link rel="stylesheet" href="{{url('platform/calendar/admin/sumoselect.min.css')}}">
    <link rel="stylesheet" href="{{url('platform/calendar/admin/jquery.timepicker.min.css')}}">
    <link rel="stylesheet" href="{{url('platform/calendar/admin/lib/bootstrap-datepicker.css')}}">
    <link rel="stylesheet" href="{{url('platform/calendar/admin/calendar-style.css')}}">
    <style>

    </style>
</head>
<body>
<div class="container">
    <div class="response"></div>
    <div id='calendar'></div>
</div>

<!-- Modal -->
<div class="modal fade" id="form-time" tabindex="-1" role="dialog" aria-labelledby="form-time__title"
     aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="form-time__title">Event</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="form-date-time" class="" action="" method="post">
                    <div class="form-group">
                        {{--<label for="title">Title</label>--}}
                        <input id="title" name="title" class="form-control" placeholder="Title" type="text">
                    </div>
                    <div class="form-group">
                        {{--<label for="description">Description</label>--}}
                        <input id="description" name="description" class="form-control" placeholder="Description"
                               type="text">
                    </div>
                    <div class="form-group input-group" id="date-time">
                        {{--<label for="time_start">Time: </label>--}}
                        <div class="input-group-prepend">
                            <span class="input-group-text">Time </span>
                        </div>
                        <input id="time_start" name="time_start" class="form-control time start"
                               placeholder="Time Start" type="text">
                        {{--<label for="time_emd">Time: </label>--}}
                        <div class="input-group-prepend" style="margin-left: 0">
                            <span class="input-group-text">to</span>
                        </div>
                        <input id="time_end" name="time_end" class="form-control time end" placeholder="Time End"
                               type="text">
                        {{--<label for="date_start">Date: </label>--}}
                        <div class="input-group-prepend" style="margin-left: 10px">
                            <span class="input-group-text">Date </span>
                        </div>
                        <input id="date_start" name="date_start" class="form-control date start"
                               placeholder="Date Start" type="text">
                        <div class="input-group-prepend" style="margin-left: 0">
                            <span class="input-group-text">to</span>
                        </div>
                        {{--<label for="date_end">Date: </label>--}}
                        <input id="date_end" name="date_end" class="form-control date end" placeholder="Date End"
                               type="text">

                    </div>
                    <div class="form-group input-group">
                        <div class="repeat-event" style="width: 200px;">
                            <label class="">Repeat Event</label>
                            <select id="every-date" class="every-date SumoUnder" multiple="multiple" name="daily">
                                {{--<option value="" >Every day</option>--}}
                                <option value="2">Every Mondays</option>
                                <option value="3">Every Tuesdays</option>
                                <option value="4">Every Wednesdays</option>
                                <option value="5">Every Thursdays</option>
                                <option value="6">Every Fridays</option>
                                <option value="6">Every Saturdays</option>
                                <option value="1">Every Sundays</option>
                            </select>
                        </div>
                        <div class="form-check" style="width: 98px;">
                            <span> All day </span>
                            <label class="custom-control custom-checkbox" style="line-height: 45px;">
                                <input type="checkbox" class="custom-control-input" id="allDay" name="allDay">
                                <span class="custom-control-indicator"></span>
                            </label>
                        </div>

                        <div class="select-color">
                            <label for="" class="">Background</label>
                            <div class="dropdown">
                                <button class="btn _select_color" type="button" id="dropdownMenu1" {{-- rm class dropdown-toggle --}}
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Blue
                                    <span class="caret _right"></span>
                                    <span _text_display="Blue" class="color blue"></span>
                                </button>
                                <ul class="dropdown-menu _select_color_drop" aria-labelledby="dropdownMenu1">
                                    <li><span _text_display="Black" class="color Black"></span></li>
                                    <li><span _text_display="white" class="color white"></span></li>
                                    <li><span _text_display="Blue" class="color blue"></span></li>
                                    <li><span _text_display="Green" class="color green"></span></li>
                                    <li><span _text_display="Red" class="color red"></span></li>
                                    <li><span _text_display="Yellow" class="color yellow"></span></li>
                                    <li><span _text_display="Brown" class="color brown"></span></li>
                                    <li><span _text_display="Orange" class="color orange"></span></li>
                                    <li><span _text_display="Pink" class="color pink"></span></li>
                                    <li><span _text_display="Silver" class="color silver"></span></li>
                                    <li><span _text_display="TEAL" class="color TEAL"></span></li>
                                    <li><span _text_display="NAVY" class="color NAVY"></span></li>
                                    <li><span _text_display="PURPLE" class="color PURPLE"></span></li>
                                    <li><span _text_display="OLIVE" class="color OLIVE"></span></li>
                                    <li><span _text_display="LIME" class="color LIME"></span></li>
                                    <input type="hidden" id="background_color" name="_color" class="input_color" value="#3788d8"></ul>
                            </div>
                        </div>

                        <div class="select-color" style="margin-left: 10px">
                            <label for="" class="">Color text</label>
                            <div class="dropdown">
                                <button class="btn _select_color" type="button" id="dropdownMenu1" {{-- rm class dropdown-toggle --}}
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Black
                                    <span class="caret _right"></span>
                                    <span _text_display="Black" class="color Black"></span>
                                </button>
                                <ul class="dropdown-menu _select_color_drop" aria-labelledby="dropdownMenu1">
                                    <li><span _text_display="Black" class="color Black"></span></li>
                                    <li><span _text_display="white" class="color white"></span></li>
                                    <li><span _text_display="Blue" class="color blue"></span></li>
                                    <li><span _text_display="Green" class="color green"></span></li>
                                    <li><span _text_display="Red" class="color red"></span></li>
                                    <li><span _text_display="Yellow" class="color yellow"></span></li>
                                    <li><span _text_display="Brown" class="color brown"></span></li>
                                    <li><span _text_display="Orange" class="color orange"></span></li>
                                    <li><span _text_display="Pink" class="color pink"></span></li>
                                    <li><span _text_display="Silver" class="color silver"></span></li>
                                    <li><span _text_display="TEAL" class="color TEAL"></span></li>
                                    <li><span _text_display="NAVY" class="color NAVY"></span></li>
                                    <li><span _text_display="PURPLE" class="color PURPLE"></span></li>
                                    <li><span _text_display="OLIVE" class="color OLIVE"></span></li>
                                    <li><span _text_display="LIME" class="color LIME"></span></li>
                                    <input type="hidden" id="text_color" name="_color" class="input_color" value="#212529"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="form-group input-group">


                    </div>

            </form>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary save-time">Save changes</button>
        </div>
    </div>
</div>
</div>

<!-- JQuery -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
{{--<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.js"></script>--}}
<script src='/platform/calendar/admin/fullcalendar/packages/core/main.js'></script>
<script src='/platform/calendar/admin/fullcalendar/packages/interaction/main.js'></script>
<script src='/platform/calendar/admin/fullcalendar/packages/daygrid/main.js'></script>
<script src='/platform/calendar/admin/fullcalendar/packages/timegrid/main.js'></script>
<script src='/platform/calendar/admin/fullcalendar/packages/list/main.js'></script>


<script src="{{url('platform/calendar/admin/notify.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.js"></script>

<script src="{{url('platform/calendar/admin/jquery.sumoselect.min.js')}}"></script>
<script src="{{url('platform/calendar/admin/jquery.timepicker.min.js')}}"></script>
<script src="{{url('platform/calendar/admin/lib/bootstrap-datepicker.js')}}"></script>
{{--<script src="{{url('platform/calendar/admin/lib/datepair.js')}}"></script>
<script src="{{url('platform/calendar/admin/lib/jquery.datepair.js')}}"></script>--}}

<script>

    var SITEURL = "{{url('/')}}";
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

</script>
<script src="{{url('platform/calendar/admin/calendar-control.js')}}"></script>
</body>
</html>