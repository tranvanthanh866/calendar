<?php
namespace Package\Calendar\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Package\Calendar\Models\CalendarDate;
use Package\Calendar\Models\CalendarEvent;
use Illuminate\Http\Request;
use Carbon\CarbonPeriod;
use \Redirect,\Response;


class CalendarController extends Controller
{
    protected $sql = "
        -- select Date time
        SELECT 
            cd.calendar_date_id
            , cd.date_start
            , cd.date_end
            , cd.is_all_day as allDay
            
            , ce.calendar_event_id
            , ce.title
            , ce.description
            , ce.time_start
            , ce.time_end
            
            , CASE 
                WHEN cd.is_all_day = 0 THEN CONCAT(cd.date_start, ' ', ce.time_start)
                ELSE cd.date_start
                END  as start
                
            , CASE 
                WHEN cd.is_all_day = 0 THEN CONCAT(cd.date_end, ' ', ce.time_end)
                ELSE cd.date_end
                END as end
            
            , COALESCE(ce.background_color, cd.background_color) as backgroundColor
            , ce.text_color as textColor
            
        FROM calendar_date cd
        INNER JOIN calendar_event ce 
            ON cd.calendar_event_id = ce.calendar_event_id
        WHERE cd.deleted_at IS NULL 
            AND ce.deleted_at IS NULL 
        
    ";

    public function __construct()
    {

    }

    public function index () {
        return view('calendar::admin.calendar.index');
    }

    public function get_data () {
        $start = (!empty($_GET["start"])) ? ($_GET["start"]) : ('');
        $end = (!empty($_GET["end"])) ? ($_GET["end"]) : ('');
        //$date_start = ''; $date_end = '';
        //return \Response::json([$start, $end]);
        $this->sql .= "
                AND cd.date_start >= '$start' AND cd.date_end <= '$end'
            ";

        $events = DB::select($this->sql);
        //$data = $this->generateDateRange($events);
        //dd($data);
        //$data = CalendarEvent::whereDate('start', '>=', $start)->whereDate('end',   '<=', $end)->get(['calendar_event_id','title','start', 'end']);
        return \Response::json($events);
    }

    public function generateDateRange ($request){


        $data = [];
        if ($request['allDay'] == 0) {
            $period = CarbonPeriod::create($request['date_start'], $request['date_end']);
            // Iterate over the period
            foreach ($period as $date) {
                //dd($date->format('Y-m-d'));
                $tmp = [];
                $tmp['title'] = $request['title'];
                $tmp['description'] = $request['description'];
                $tmp['date_start'] = $date->format('Y-m-d');
                $tmp['date_end'] = $date->format('Y-m-d');
                $tmp['time_start'] = $request['time_start'];
                $tmp['time_end'] = $request['time_end'];
                $tmp['allDay'] = $request['allDay'];
                $tmp['background_color'] = $request['background_color'];
                $tmp['text_color'] = $request['text_color'];
                $data[] = $tmp;
            }
        } else {
            $tmp['title'] = $request['title'];
            $tmp['description'] = $request['description'];
            $tmp['date_start'] = $request['date_start'];
            $tmp['date_end'] = $request['date_end'];
            $tmp['allDay'] = $request['allDay'];
            $tmp['background_color'] = $request['background_color'];
            $tmp['text_color'] = $request['text_color'];
            $data[] = $tmp;
        }

        return $data;
    }



    public function store(Request $request)
    {
        $data = $this->generateDateRange($request->all());
        \DB::beginTransaction();
        foreach ($data as $event) {
            $data_fill_event = [
                'title'  => $event['title'],
                'description'  => $event['description'],
                'time_start' => isset($event['time_start'])?$event['time_start']:null,
                'time_end' => isset($event['time_end'])?$event['time_end']:null,

                'background_color'=> $event['background_color'],
                'text_color'=> $event['text_color'],

            ];

            $calendarModel = new CalendarEvent();
            $calendarModel->fill($data_fill_event);

            try {
                $calendarModel->save();
            } catch (\Exception $e) {
                \DB::rollBack();
                \Log::info('insert fail: '. $e->getMessage());
                return \Response::json(0);
            }
            $data_fill_date = [
                'calendar_event_id' => $calendarModel->calendar_event_id,
                'date_start' => $event['date_start'],
                'date_end' => $event['date_end'],
                'is_all_day' =>  $event['allDay'],
                'user_id',
            ];
            $calendarDate = new CalendarDate();
            $calendarDate->fill($data_fill_date);
            try {
                $calendarDate->save();
            } catch (\Exception $e) {
                \DB::rollBack();
                \Log::info('insert fail: '. $e->getMessage());
                return \Response::json(0);
            }
        }
        \DB::commit();
        return \Response::json(1);
    }


    public function update(Request $request)
    {
        $data = $request->all();
        $data_fill_event = [
            'title'  => $data['title'],
            //'description'  => $data['description'],
            'time_start' => $data['time_start'],
            'time_end' => isset($data['time_end'])? $data['time_end'] : $data['time_start'],
            //'background_color'=> $data['background_color'],

        ];

        $calendarEven = CalendarEvent::find($request->calendar_event_id);
        $calendarEven->fill($data_fill_event);
        $calendarEven->save();

        $data_fill_date = [
            'date_start' => $data['date_start'],
            'date_end' => isset($data['date_end'])? $data['date_end']: $data['date_start'],
            'is_all_day' => $data['allDay'],
            'user_id',
        ];

        $calendarDate = CalendarDate::find($request->calendar_date_id);
        $calendarDate->fill($data_fill_date);
        $calendarDate->save();
        return \Response::json(1);
    }


    public function destroy(Request $request)
    {
        $calendar_event_id = $request->calendar_event_id;
        $calendar_date_id = $request->calendar_date_id;
        \DB::delete("
             -- delete calendar date
            DELETE FROM calendar_date WHERE calendar_event_id = $calendar_date_id
        ");

        \DB::delete("
            -- delete calendar
            DELETE FROM calendar_event WHERE calendar_event_id = $calendar_event_id
        ");

        return \Response::json(1);
    }
}