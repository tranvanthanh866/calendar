let date = moment().format('YYYY-MM-DD');
let time = moment().format('HH:mm:ss');
Vue.config.devtools = true;
let form_data_default = {
    title: '',
    description: '',
    date_start: '',
    time_start: '',
    date_end: '',
    time_end: '',
    allDay: false,
    _allDay: 0,
    background_group: [
        {
            _text_display: 'Black',
            hex_color_code: '#212529',
            class: 'Black',
        },
        {
            _text_display: 'White',
            hex_color_code: '#fff',
            class: 'white',
        },
        {
            _text_display: 'Blue',
            hex_color_code: '#3788d8',
            class: 'Blue',
        },
        {
            _text_display: 'Green',
            hex_color_code: '#008000',
            class: 'green',
        },
        {
            _text_display: 'Red',
            hex_color_code: '#ff0000',
            class: 'red',
        },
        {
            _text_display: 'Yellow',
            hex_color_code: '#ffff00',
            class: 'yellow',
        },
        {
            _text_display: 'Brown',
            hex_color_code: '#a52a2a',
            class: 'brown',
        },
        {
            _text_display: 'Orange',
            hex_color_code: '#ffa500',
            class: 'orange',
        },
        {
            _text_display: 'Pink',
            hex_color_code: '#ffc0cb',
            class: 'pink',
        },
        {
            _text_display: 'Silver',
            hex_color_code: '#c0c0c0',
            class: 'silver',
        },
        {
            _text_display: 'TEAL',
            hex_color_code: '#008080',
            class: 'TEAL',
        },
        {
            _text_display: 'OLIVE',
            hex_color_code: '#000080',
            class: 'OLIVE',
        },
        {
            _text_display: 'LIME',
            hex_color_code: '#00FF00',
            class: 'LIME',
        },
    ],
    background_color: "#3788d8",
    name_background_color: "Blue",
    text_color: "#212529",
    name_text_color: "Black",
    repeat_weeks: [
        {
            value: 1,
            name: "Every Mondays"
        },
        {
            value: 2,
            name: "Every Tuesdays"
        },
        {
            value: 3,
            name: "Every Wednesdays"
        },
        {
            value: 4,
            name: "Every Thursdays"
        },
        {
            value: 5,
            name: "Every Fridays"
        },
        {
            value: 6,
            name: "Every Saturdays"
        },
        {
            value: 0,
            name: "Every Sundays"
        },
    ],
    repeat: []
};

let modal_vue = new Vue({
    el: '#form-time',
    data: {
        from_data: form_data_default,
    },
    methods: {
        setDateTimeDefault() {
            let _this = this;
            _this.from_data.title = '';
            _this.from_data.description = '';
            _this.from_data.background_color = '#3788d8';
            _this.from_data.name_background_color = 'Blue';
            _this.from_data.name_text_color = 'Black';
            _this.from_data.text_color = '#212529';
            _this.from_data.repeat = [];
        },

        checkData() {
            let _this = this;
            console.log(1);
            console.log(_this.repeat);
        }
    },
});


$(function () {
    let year = (new Date).getFullYear();
    let modal_time = $('#form-time');
    let form_time = $('#form-date-time');
    let _calendar = $('#calendar');

    $('.repeat-date').SumoSelect({
        triggerChangeCombined: false,
        placeholder: 'Repeat event'
    });

    $('#date-time .time').timepicker({
        'showDuration': true,
        'timeFormat': 'H:i:s'
    });

    $('#form-date-time .input-daterange').datepicker({
        format: "yyyy-mm-dd",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 90)),
        autoclose: true,
    });

    $('#form-date-time .input-daterange').datepicker().on('changeDate', function (ev) {
        modal_vue.$data.from_data.date_start = $('#date_start').val();
        modal_vue.$data.from_data.date_end = $('#date_end').val();
    });

    // set value event
    $('#date-time .time').on('changeTime', function(e) {
        let _input = $(this);
        if (_input.hasClass('start')) {
            modal_vue.$data.from_data.time_start = _input.val();
        }
        if (_input.hasClass('end')) {
            modal_vue.$data.from_data.time_end = _input.val();
        }
    });

    $(".SumoSelect li").bind('click.check', function (event) {
        modal_vue.$data.from_data.repeat = $('#repeat-date').val();
    });

    let _colors = $('._select_color_drop li');
    for (let i = _colors.length - 1; i >= 0; i--) {
        //console.log(_colors[i]);
        $(_colors[i]).click(function () {
            let color_text = $(this).find('span').attr('_text_display');
            let _select_color = $(this).closest('._select_color_drop');
            let _hex_code = $(this).find('span').attr('data-hex_code');
            let input_hidden_change = _select_color.find('.input_color');

            if (input_hidden_change.hasClass('background_color')) {
                modal_vue.$data.from_data.background_color = _hex_code;
                modal_vue.$data.from_data.name_background_color = color_text;
            }
            if (input_hidden_change.hasClass('text_color')) {
                modal_vue.$data.from_data.text_color = _hex_code;
                modal_vue.$data.from_data.name_text_color = color_text;
            }


        })
    }

    /*// initialize datepair
    let basicExampleEl = document.getElementById('date-time');
    let datepair = new Datepair(basicExampleEl);*/


    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
        header: {
            left: 'prev,next,today',
            center: 'title',
            right: 'listWeek,timeGridDay,timeGridWeek,dayGridMonth'
            //right: 'resourceTimelineDay,resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek'
        },
        eventLimit: true,
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
                let date_start = moment(info.start).format('YYYY-MM-DD');
                let time_start = moment(info.start).format("HH:mm:ss");
                let date_end = moment(info.end).format("YYYY-MM-DD");
                let time_end = moment(info.end).format("HH:mm:ss");
                //let today = moment().format('YYYY-MM-DD');

                modal_vue.$data.from_data.date_start = date_start;
                modal_vue.$data.from_data.date_end = date_end;
                modal_vue.$data.from_data.time_start = time_start;
                modal_vue.$data.from_data.time_end = time_end;
                modal_vue.$data.from_data.allDay = info.allDay;

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
                $('#ex1').modal();

                /*let deleteMsg = confirm("Do you really want to delete?");
                if (deleteMsg) {
                    await delete_event(info.event);
                    calendar.refetchEvents();
                }*/
            }

        },

        dayRender: function (info) {
            let today = moment().format("YYYY-MM-DD");
            //console.log(info);
            //console.log(moment(date.date).format("YYYY-MM-DD HH:mm:ss"));
            let end = new Date();
            /*end.setDate(today.getDate()+7);
            let time_start = moment(info.start).format("HH:mm:ss");
            let date_end = moment(info.end).format("YYYY-MM-DD");*/
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

        let _date_start = moment(info.event.start).format('YYYY-MM-DD');
        let _time_start = moment(info.event.start).format("HH:mm:ss");
        let _date_end = _date_start;
        let _time_end = _time_start;
        if (info.event.end !== null) {
            _date_end = moment(info.event.end).format("YYYY-MM-DD");
            _time_end = moment(info.event.end).format("HH:mm:ss");
        }
        let data = info.event._def.extendedProps;
        console.log(info.event.end);
        let _data = {
            'title': info.event.title,
                'date_start': _date_start,
                'time_start': _time_start,
                'date_end': _date_end,
                'time_end': _time_end,
                'calendar_event_id': data.calendar_event_id,
                'calendar_date_id': data.calendar_date_id,
                'allDay': info.event.allDay ? 1 : 0
        };
        console.log(_data);
        console.log(info.event.allDay);
        $.ajax({
            url: SITEURL + '/fullcalendar/update',
            data: {
                'title': info.event.title,
                'date_start': _date_start,
                'time_start': _time_start,
                'date_end': _date_end,
                'time_end': _time_end,
                'calendar_event_id': data.calendar_event_id,
                'calendar_date_id': data.calendar_date_id,
                'allDay': info.event.allDay ? 1 : 0
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
        let date_start = moment(info.start).format('YYYY-MM-DD');
        let today = moment().format('YYYY-MM-DD');
        return date_start >= today;
    }

    $('.save-time').click(async function () {
        let data = modal_vue.$data.from_data;
        await save_data(data);
        calendar.refetchEvents();
    });

    modal_time.on('hidden.bs.modal', function () {
        modal_vue.$data.from_data.title = '';
        modal_vue.$data.from_data.description = '';
        modal_vue.$data.from_data.background_color = '#3788d8';
        modal_vue.$data.from_data.name_background_color = 'Blue';
        modal_vue.$data.from_data.name_text_color = 'Black';
        modal_vue.$data.from_data.text_color = '#212529';
        modal_vue.$data.from_data.repeat = [];
        $('.optWrapper ul li').removeClass('selected');
        $('#repeat-date').val([]);
        $('.SumoSelect p.CaptionCont').attr('title', 'Repeat event')
            .find('span').addClass('placeholder').text('Repeat event');
    });

    modal_time.on('shown.bs.modal', function () {
        let check = modal_time.find('#allDay').is(":checked");
        switchCheckBbox(check);

    });

    $('#allDay').change(function () {
        switchCheckBbox(this.checked);
    });

    function switchCheckBbox(check) {
        modal_time.find('#time_start').attr('disabled', check);
        modal_time.find('#time_end').attr('disabled', check);
        if (check) {
            modal_vue.$data.from_data._allDay = 1;
        } else {
            modal_vue.$data.from_data._allDay = 0;
        }

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