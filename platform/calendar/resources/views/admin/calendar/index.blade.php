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

    <style>
        #date-time input {
        / / margin-right: 2 px;
        / / margin-left: 2 px;
        }

        #date-time span.label-to {
            line-height: 200%;
            padding-right: 5px;
            padding-left: 5px;
        }

        .custom-checkbox {
            min-height: 1rem;
            padding-left: 0;
            margin-right: 0;
            cursor: pointer;
        }

        .custom-checkbox .custom-control-indicator {
            content: "";
            display: inline-block;
            position: relative;
            width: 30px;
            height: 10px;
            background-color: #818181;
            border-radius: 15px;
            margin-right: 10px;
            -webkit-transition: background .3s ease;
            transition: background .3s ease;
            vertical-align: middle;
            margin: 0 2px;
            box-shadow: none;
        }

        .custom-checkbox .custom-control-indicator:after {
            content: "";
            position: absolute;
            display: inline-block;
            width: 18px;
            height: 18px;
            background-color: #f1f1f1;
            border-radius: 21px;
            box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);
            left: -2px;
            top: -4px;
            -webkit-transition: left .3s ease, background .3s ease, box-shadow .1s ease;
            transition: left .3s ease, background .3s ease, box-shadow .1s ease;
        }

        .custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {
            background-color: #84c7c1;
            background-image: none;
            box-shadow: none !important;
        }

        .custom-checkbox .custom-control-input:checked ~ .custom-control-indicator:after {
            background-color: #84c7c1;
            left: 15px;
        }

        .custom-checkbox .custom-control-input:focus ~ .custom-control-indicator {
            box-shadow: none !important;
        }

        #form-date-time .SumoSelect > .CaptionCont > label {
            top: 5px;
        }

        .select-color {
            width: 168px;
        }

        ._select_color{
            font-size: 14px;
            padding: 3px 4px 1px 4px;
            font-weight: 300;
            line-height: 28px;
            border-radius: 4px;
            border: 1px solid #ccc;
            -webkit-appearance: none;
            width: 100%;
            height: auto;
            box-shadow: none;
            text-align: left;
            background-image: none;
            color: #796652;
            background: white;
        }
        ._select_color_drop {
            margin: 0;
            padding: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            top: 99%;
            border-top: 0;
            width: 100%;
        }
        ._select_color_drop > li {
            display: inline-block;
            padding: 7px;
            border-right: 1px solid rgba(192, 192, 192, 0.55);
            cursor: pointer;
            float: left;
        }
        ._select_color_drop > li > .color,.btn > span.color{
            width: 25px;
            height: 25px;
            border-radius: 4px;
            float: left;
        }
        .btn > span.color{margin-right:10px}
        .btn .caret{
            float: right;
            border-top: 7px solid;
            font-size: 28px;
            padding-top: 5px;
            vertical-align: middle;
            position: absolute;
            right: 20px;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            top: 13px;
        }
        ._select_color_drop > li > .red ,.btn._select_color > span.red{background-color: red;}
        ._select_color_drop > li > .green ,.btn._select_color > span.green{background-color: green;}
        ._select_color_drop > li > .yellow ,.btn._select_color > span.yellow{background-color: yellow;}
        ._select_color_drop > li > .brown ,.btn._select_color > span.brown{background-color: brown;}
        ._select_color_drop > li > .orange ,.btn._select_color > span.orange{background-color: orange;}
        ._select_color_drop > li > .pink ,.btn._select_color > span.pink{background-color: pink;}
        ._select_color_drop > li > .silver ,.btn._select_color > span.silver{background-color: silver;}
        ._select_color_drop > li > .blue ,.btn._select_color > span.blue{background-color: #3788d8;}
        ._select_color_drop > li > .TEAL ,.btn._select_color > span.TEAL{background-color: #008080;}
        ._select_color_drop > li > .NAVY ,.btn._select_color > span.NAVY{background-color: #000080;}
        ._select_color_drop > li > .PURPLE ,.btn._select_color > span.PURPLE{background-color: #800080;}
        ._select_color_drop > li > .OLIVE ,.btn._select_color > span.OLIVE{background-color: #808000;}
        ._select_color_drop > li > .LIME ,.btn._select_color > span.LIME{background-color: #00FF00;}
        ._select_color_drop > li > .Black ,.btn._select_color > span.Black{background-color: #212529;}
        ._select_color_drop > li > .white ,.btn.white > span.white{background-color: #ffffff;}

        #form-date-time .SelectBox {
            padding: 3px 7px;
        }
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
                                    <input type="hidden" id="text_color" name="_color" class="input_color" value="#3788d8"></ul>
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

    $(function () {
        var year = (new Date).getFullYear();
        var modal_time = $('#form-time');
        var _calendar = $('#calendar');

        $('.every-date').SumoSelect({
            placeholder: 'Repeat event'
        });
        $('#date-time .time').timepicker({
            'showDuration': true,
            'timeFormat': 'H:i:s'
        });
        $('#date-time .date').datepicker({
            'format': 'yyyy-mm-dd',
            'autoclose': true,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 90))
        });



        _colors=$('._select_color_drop li');
        for (var i = _colors.length - 1; i >= 0; i--) {
            //console.log(_colors[i]);
            $(_colors[i]).click(function(){
                var color_text = $(this).find('span').attr('_text_display');
                var elemnt = $(this).closest('._select_color_drop').prev();
                var _select_color = $(this).closest('._select_color_drop');
                elemnt.find('span.color').remove();
                $(this).find('span').clone().appendTo(elemnt);
                var contents = $(elemnt).contents();
                if (contents.length > 0) {
                    if (contents.get(0).nodeType == Node.TEXT_NODE) {
                        $(elemnt).html(color_text).append(contents.slice(1));
                    }
                }

                if(_select_color.find('.input_color').val() === undefined){
                    _select_color.append("<input type='hidden' name='_color' value='"+color_text+"'>");
                }else{
                    _select_color.find('.input_color').val(color_text);
                }

            })
        };

        /*// initialize datepair
        var basicExampleEl = document.getElementById('date-time');
        var datepair = new Datepair(basicExampleEl);*/

        var data_min = moment().format('YYYY-MM-DD');
        var data_max = moment().add(30, 'days').format('YYYY-MM-DD');
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'listWeek,timeGridDay,timeGridWeek,dayGridMonth'
                //right: 'resourceTimelineDay,resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek'
            },
            defaultView: 'timeGridWeek',
            displayEventTime: true,
            editable: true,
            events: SITEURL + "/get_data",
            selectable: true,
            firstDay: 1, // Sunday=0, Monday=1, Tuesday=2, etc.
            /*dateClick: function(info) {
                alert('clicked ' + info.dateStr);
            },*/

            select: async function (info) {
                //alert('selected ' + info.startStr + ' to ' + info.endStr);
                if (check_date_event(info)) {
                    var date_start = moment(info.start).format('YYYY-MM-DD');
                    var time_start = moment(info.start).format("HH:mm:ss");
                    var date_end = moment(info.end).format("YYYY-MM-DD");
                    var time_end = moment(info.end).format("HH:mm:ss");
                    var today = moment().format('YYYY-MM-DD');
                    modal_time.find('#date_start').val(date_start);
                    modal_time.find('#time_start').val(time_start);
                    modal_time.find('#date_end').val(date_end);
                    modal_time.find('#time_end').val(time_end);
                    modal_time.find('#allDay').prop('checked', info.allDay);
                    modal_time.modal('show');
                } else {
                    displayErrorMessage('Past day can not add events');
                }
            },
            eventDragStart: function (info) {
                console.log(info);
                if (check_date_event(info) === false) {
                    return false
                }
            },
            eventDragStop: function (info) {
                console.log('eventDragStop');
            },
            eventReceive: function () {
                console.log('eventReceive');
            },
            eventResize: async function (resizeInfo) {
                if (check_date_event(resizeInfo)) {
                    await update_data(resizeInfo);
                    calendar.refetchEvents();
                } else {

                }

            },
            eventDrop: async function (dropInfo) {
                if (check_date_event(dropInfo)) {
                    await update_data(dropInfo)
                    calendar.refetchEvents();
                } else {

                }
            },

            eventClick: async function (info) {
                if (check_date_event(info.event)) {
                    var deleteMsg = confirm("Do you really want to delete?");
                    if (deleteMsg) {
                        await delete_event(info.event);
                        calendar.refetchEvents();
                    }
                }

            },

            dayRender: function (info) {
                var today = moment().format("YYYY-MM-DD");
                //console.log(info);
                //console.log(moment(date.date).format("YYYY-MM-DD HH:mm:ss"));
                var end = new Date();
                /*end.setDate(today.getDate()+7);
                var time_start = moment(info.start).format("HH:mm:ss");
                var date_end = moment(info.end).format("YYYY-MM-DD");*/
                /*if (date.getDate() === today.getDate()) {
                    //cell.css("background-color", "red");
                }*/
                if (moment(info.date).format("YYYY-MM-DD") < today) {
                    $(info.el).addClass('no-change-event').css("background-color", "#e9e9e9");
                }

            },
            selectAllow: function (selectInfo) {
                if (check_date_event(selectInfo)) {
                    return true;
                } else {
                    return false;
                }
            }

        });
        calendar.render();

        async function update_data(info) {
            //console.log(info.event);
            var date_start = moment(info.event.start).format('YYYY-MM-DD');
            var time_start = moment(info.event.start).format("HH:mm:ss");
            var date_end = moment(info.event.end).format("YYYY-MM-DD");
            var time_end = moment(info.event.end).format("HH:mm:ss");
            var data = info.event._def.extendedProps;
            $.ajax({
                url: SITEURL + '/fullcalendar/update',
                data: {
                    'title': info.event.title,
                    'date_start': date_start,
                    'time_start': time_start,
                    'date_end': date_end,
                    'time_end': time_end,
                    'calendar_event_id': data.calendar_event_id,
                    'calendar_date_id': data.calendar_date_id,
                    'allDay': data.allDay
                },
                type: "POST",
                success: function (response) {
                    displayMessage("Updated Successfully");
                }
            });
        }

        async function save_data(data) {
            $.ajax({
                url: SITEURL + "/fullcalendar/create",
                data: data,
                type: "POST",
                success: function (response) {
                    displayMessage("Added Successfully");
                }
            });
        }

        async function delete_event(event) {
            console.log(event);
            $.ajax({
                type: "POST",
                url: SITEURL + '/fullcalendar/delete',
                data: {
                    'calendar_event_id': event._def.extendedProps.calendar_event_id,
                    'calendar_date_id': event._def.extendedProps.calendar_date_id
                },
                success: function (response) {
                    if (parseInt(response) > 0) {
                        displayMessage("Deleted Successfully");
                    }
                }
            });
        }

        function check_date_event(info) {
            var date_start = moment(info.start).format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');
            return date_start >= today;
        }

        $('.save-time').click(async function () {
            var data = {
                'title': modal_time.find('#title').val(),
                'description': modal_time.find('#description').val(),
                'date_start': modal_time.find('#date_start').val(),
                'date_end': modal_time.find('#date_end').val(),
                'time_start': modal_time.find('#time_start').val(),
                'time_end': modal_time.find('#time_end').val(),
                'every-date': modal_time.find('#every-date').val(),
                'background_color': modal_time.find('#background_color').val(),
                'text_color': modal_time.find('#text_color').val(),
                'allDay': modal_time.find('#allday').is(':checked') ? '1' : '0'
            };
            await save_data(data);
            calendar.refetchEvents();
        });

        modal_time.on('hidden.bs.modal', function () {
            modal_time.find('#title').val('');
            modal_time.find('#description').val('');
            modal_time.find('#date_start').val('');
            modal_time.find('#date_end').val('');
            modal_time.find('#time_start').val('');
            modal_time.find('#time_end').val('');
            modal_time.find('#every-date').val('')
        });

        modal_time.on('shown.bs.modal', function () {
            var check = modal_time.find('#allDay').is(":checked");
            switchCheckBbox(check);

        });

        $('#allDay').change(function () {
            switchCheckBbox(this.checked);
        });

        function switchCheckBbox(check) {
            modal_time.find('#time_start').attr('disabled', check);
            modal_time.find('#time_end').attr('disabled', check);
        }

        function displayMessage(message) {
            $.notify(
                message,
                "success",
            );
        }

        function displayErrorMessage(message) {
            $.notify(
                message,
                "error",
            );
        }
    });

</script>
</body>
</html>