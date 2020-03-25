<!doctype html>
<html lang="en">
<head>
    <meta charset='utf-8'>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- Bootstrap core CSS -->
    <link href="{{asset('css/app.css')}}" rel="stylesheet">

    <link href='/platform/calendar/admin/fullcalendar/packages/core/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages/daygrid/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages/timegrid/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages/list/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages-premium/timeline/main.css' rel='stylesheet'/>
    <link href='/platform/calendar/admin/fullcalendar/packages-premium/resource-timeline/main.css' rel='stylesheet'/>

    <link rel="stylesheet" href="{{asset('platform/calendar/lib/bootstrap-datepicker-1.9.0-dist/css/bootstrap-datepicker.min.css')}}">
    <link rel="stylesheet" href="{{asset('platform/calendar/admin/sumoselect.min.css')}}">
    <link rel="stylesheet" href="{{asset('platform/calendar/admin/jquery.timepicker.min.css')}}">
    <link rel="stylesheet" href="{{asset('platform/calendar/admin/lib/bootstrap-datepicker.css')}}">
    <link rel="stylesheet" href="{{asset('platform/calendar/admin/calendar-style.css')}}">
    <style>
    </style>
</head>
<body>
<div class="container">
    <div class="response"></div>
    <div id='calendar'></div>
</div>


<!-- Modal -->
<div class="modal fade" id="form-time" aria-labelledby="form-time__title"
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
                        <input id="title" name="title" class="form-control" placeholder="Title" type="text" v-model="from_data.title" >
                    </div>
                    <div class="form-group">
                        <input id="description" name="description" class="form-control" placeholder="Description" v-model="from_data.description"
                               type="text">
                    </div>
                    <div class="form-group input-group" id="date-time">
                        <div class="input-timerange input-group" style="width: 50%">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Time </span>
                            </div>
                            <input id="time_start" name="time_start" class="form-control time start" v-bind:value="from_data.time_start"
                                   placeholder="Time Start" type="text">
                            <div class="input-group-prepend" style="margin-left: 0">
                                <span class="input-group-text">to</span>
                            </div>
                            <input id="time_end" name="time_end" class="form-control time end" placeholder="Time End" v-bind:value="from_data.time_end"
                                   type="text">
                        </div>
                        <div class="input-daterange input-group" id="datepicker" style="width: 50%">
                            <div class="input-group-prepend" style="margin-left: 10px">
                                <span class="input-group-text">Date </span>
                            </div>
                            <input id="date_start" name="date_start" class="form-control date start" v-bind:value="from_data.date_start"
                                   placeholder="Date Start" type="text">
                            <div class="input-group-prepend" style="margin-left: 0">
                                <span class="input-group-text">to</span>
                            </div>
                            <input id="date_end" name="date_end" class="form-control date end" placeholder="Date End" v-bind:value="from_data.date_end"
                                   type="text">
                        </div>


                    </div>
                    <div class="form-group input-group">
                        <div class="repeat-event" style="width: 200px;">
                            <label class="">Repeat Event</label>
                            <select id="repeat-date" class="repeat-date SumoUnder" multiple="multiple" name="daily">
                                <option v-for="day in from_data.repeat_weeks" v-bind:value="day.value">@{{ day.name }}</option>
                            </select>
                        </div>
                        <div class="form-check" style="width: 98px;">
                            <span> All day </span>
                            <label class="custom-control custom-checkbox" style="line-height: 45px;">
                                <input type="checkbox" class="custom-control-input" id="allDay" name="allDay" v-model="from_data.allDay">
                                <span class="custom-control-indicator"></span>
                            </label>
                        </div>

                        <div class="select-color">
                            <label for="" class="">Background</label>
                            <div class="dropdown">
                                <button class="btn _select_color" type="button" id="dropdownMenu1" {{-- rm class dropdown-toggle --}}
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    @{{from_data.name_background_color}}
                                    <span class="caret _right"></span>
                                    <span v-bind:_text_display="from_data.name_background_color" class="color"
                                          v-bind:style="'background-color:'+ from_data.background_color"></span>
                                </button>
                                <ul class="dropdown-menu _select_color_drop" aria-labelledby="dropdownMenu1">
                                    <li v-for="color in from_data.background_group">
                                        <span class="color"
                                              v-bind:_text_display="color._text_display"
                                              v-bind:style="'background-color:'+color.hex_color_code"
                                              v-bind:data-hex_code="color.hex_color_code"
                                              >
                                        </span>
                                    </li>

                                    <input type="hidden" id="background_color" name="_color" class="input_color background_color" v-bind:data-text_display="from_data.name_background_color"  v-bind:value="from_data.background_color"></ul>
                            </div>
                        </div>

                        <div class="select-color" style="margin-left: 10px">
                            <label for="" class="">Color text</label>
                            <div class="dropdown">
                                <button class="btn _select_color" type="button" id="dropdownMenu1" {{-- rm class dropdown-toggle --}}
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    @{{from_data.name_text_color}}
                                    <span class="caret _right"></span>
                                    <span v-bind:_text_display="from_data.name_text_color" class="color"
                                          v-bind:style="'background-color:'+ from_data.text_color"></span>
                                </button>
                                <ul class="dropdown-menu _select_color_drop" aria-labelledby="dropdownMenu1">
                                    <li v-for="color in from_data.background_group">
                                        <span class="color"
                                              v-bind:_text_display="color._text_display"
                                              v-bind:style="'background-color:'+color.hex_color_code"
                                              v-bind:data-hex_code="color.hex_color_code"
                                        >
                                        </span>
                                    </li>
                                    <input type="hidden" id="text_color" name="_color" class="input_color text_color" v-bind:data-text_display="from_data.name_text_color"  v-bind:value="from_data.text_color"></ul>
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

<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
{{--<script src="{{asset('/platform/calendar/admin/fullcalendar/packages/moment/main.min.js')}}"></script>--}}
<script src='{{asset('/platform/calendar/admin/fullcalendar/packages/core/main.js')}}'></script>
<script src='{{asset('/platform/calendar/admin/fullcalendar/packages/interaction/main.js')}}'></script>
<script src='{{asset('/platform/calendar/admin/fullcalendar/packages/daygrid/main.js')}}'></script>
<script src='{{asset('/platform/calendar/admin/fullcalendar/packages/timegrid/main.js')}}'></script>
<script src='{{asset('/platform/calendar/admin/fullcalendar/packages/list/main.js')}}'></script>

<script src="{{asset('platform/calendar/admin/notify.min.js')}}"></script>
<script src="{{asset('platform/calendar/lib/bootstrap-datepicker-1.9.0-dist/js/bootstrap-datepicker.min.js')}}"></script>
<script src="{{asset('platform/calendar/admin/jquery.sumoselect.min.js')}}"></script>
<script src="{{asset('platform/calendar/admin/jquery.timepicker.min.js')}}"></script>
<script src="{{asset('platform/calendar/admin/lib/bootstrap-datepicker.js')}}"></script>

<script>

    var SITEURL = "{{url('/')}}";
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

</script>
<script src="{{asset('platform/calendar/admin/calendar-control.js')}}"></script>
</body>
</html>