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



    let _colors = $('._select_color_drop li');
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
    }

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
        console.log(info.event.end);
        var date_start = moment(info.event.start).format('YYYY-MM-DD');
        var time_start = moment(info.event.start).format("HH:mm:ss");
        if (info.event.end !== null) {
            var date_end = moment(info.event.end).format("YYYY-MM-DD");
            var time_end = moment(info.event.end).format("HH:mm:ss");
        } else {
            var date_end = date_start;
            var time_end = time_start;
        }
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
                'allDay': info.event.allDay?1:0
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
            'allDay': modal_time.find('#allDay').prop('checked') ? '1' : '0'
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