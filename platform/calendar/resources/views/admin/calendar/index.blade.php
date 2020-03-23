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
           margin-right: 2px;
           margin-left: 2px;
       }
        #date-time span.label-to {
            line-height: 200%;
            padding-right: 5px;
            padding-left: 5px;
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
                <h5 class="modal-title" id="form-time__title">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <form id="form-date-time" class="" action="" method="post">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input id="title" name="title" class="form-control" placeholder="Title" type="text">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input id="description" name="description" class="form-control" placeholder="Description" type="text">
                    </div>
                    <div class="form-group input-group" id="date-time">
                        {{--<label for="time_start">Time: </label>--}}
                        <input id="time_start" name="time_start" class="form-control time start" placeholder="Time Start" type="text">
                        {{--<label for="time_emd">Time: </label>--}}
                        <input id="time_end" name="time_end" class="form-control time end" placeholder="Time End" type="text">
                        {{--<label for="date_start">Date: </label>--}}
                        <input id="date_start" name="date_start" class="form-control date start" placeholder="Date Start" type="text">
                        {{--<span class="label-to">to: </span>--}}
                        {{--<label for="date_end">Date: </label>--}}
                        <input id="date_end" name="date_end" class="form-control date end" placeholder="Date End" type="text">

                    </div>
                    <div class="form-group">
                        <select id="every-date" class="every-date SumoUnder" multiple="multiple" name="daily" >
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
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>

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
        $('.every-date').SumoSelect();

        var renderEvent = {};

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

        /*// initialize datepair
        var basicExampleEl = document.getElementById('date-time');
        var datepair = new Datepair(basicExampleEl);*/

        var data_min = moment().format('YYYY-MM-DD');
        var data_max = moment().add(30,'days').format('YYYY-MM-DD');
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'interaction','dayGrid', 'timeGrid', 'list'],
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
            firstDay:1, // Sunday=0, Monday=1, Tuesday=2, etc.
            /*dateClick: function(info) {
                alert('clicked ' + info.dateStr);
            },*/

            select: async function (info) {
                //alert('selected ' + info.startStr + ' to ' + info.endStr);
                if (check_date_event (info)) {
                    var date_start = moment(info.start).format('YYYY-MM-DD');
                    var time_start = moment(info.start).format("HH:mm:ss");
                    var date_end = moment(info.end).format("YYYY-MM-DD");
                    var time_end = moment(info.end).format("HH:mm:ss");
                    var today = moment().format('YYYY-MM-DD');
                    modal_time.find('#date_start').val(date_start);
                    modal_time.find('#time_start').val(time_start);
                    modal_time.find('#date_end').val(date_end);
                    modal_time.find('#time_end').val(time_end);
                    modal_time.modal('show');
                    renderEvent = {
                        title: modal_time.find('#title').val(),
                        start: info.start,
                        end: info.start,
                        allDay: info.allDay
                    };
                } else {

                }
            },
            eventDragStart: function (info) {
                console.log(info);
                if (check_date_event (info) === false) {
                    return false
                }
            },
            eventDragStop: function (info) {
              console.log('eventDragStop');
            },
            eventReceive: function() {
                console.log('eventReceive');
            },
            eventResize: async function (resizeInfo) {
                if (check_date_event (resizeInfo)) {
                    await update_data (resizeInfo)
                } else {

                }

            },
            eventDrop: async function (dropInfo) {
                if (check_date_event (dropInfo)) {
                    await update_data(dropInfo)
                } else {

                }
            },

            eventClick: async function (info) {
                if (check_date_event (info.event)) {
                    var deleteMsg = confirm("Do you really want to delete?");
                    if (deleteMsg) {
                        await delete_event(info.event);
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
                if(moment(info.date).format("YYYY-MM-DD") < today) {
                    $(info.el).addClass('no-change-event').css("background-color", "#e9e9e9");
                }

            },
            selectAllow: function(selectInfo) {
                if (check_date_event (selectInfo)) {
                    return true;
                } else {
                    return false;
                }
            }

        });
        calendar.render();

        async function update_data (info) {
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

        async function save_data (data) {
            $.ajax({
                url: SITEURL + "/fullcalendar/create",
                data: data,
                type: "POST",
                success: function (response) {
                    displayMessage("Added Successfully");
                }
            });
        }

        async function delete_event (event) {
            $.ajax({
                type: "POST",
                url: SITEURL + '/fullcalendar/delete',
                data: {
                    'calendar_event_id': event.calendar_event_id,
                    'calendar_date_id': event.calendar_date_id
                },
                success: function (response) {
                    if (parseInt(response) > 0) {
                        calendar.removeAllEvents();
                        $('#calendar').fullCalendar('removeEvents', event._id);
                        displayMessage("Deleted Successfully");
                    }
                }
            });
        }

        function check_date_event (info) {
            var date_start = moment(info.start).format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');
            return date_start >= today;
        }

        $('.save-time').click(async function() {
            var data = {
                'title' : modal_time.find('#title').val(),
                'description': modal_time.find('#description').val(),
                'date_start': modal_time.find('#date_start').val(),
                'date_end': modal_time.find('#date_end').val(),
                'time_start': modal_time.find('#time_start').val(),
                'time_end': modal_time.find('#time_end').val(),
                'every-date': modal_time.find('#every-date').val(),
                //'allDay': modal_time.find('#allday').val()
            };
            await save_data (data);
            renderEvent.title = modal_time.find('#title').val();
            calendar.addEvent(renderEvent);
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

        });

        function displayMessage(message) {
            $.notify(
                message,
                "success",
            );
        }
    });


</script>
</body>
</html>