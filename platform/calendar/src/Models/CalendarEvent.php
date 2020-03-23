<?php
namespace Package\Calendar\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \MaddHatter\LaravelFullcalendar\Event as Calendar;

class CalendarEvent extends Model implements Calendar
{

    use SoftDeletes;

    protected $table = 'calendar_event';
    protected $primaryKey = 'calendar_event_id';

    protected $dates = ['start', 'end'];

    public function __construct(array $attributes = [])
    {
        $this->fillable = [
            'title',
            'description',
            'time_start',
            'time_end',
            'background_color',
        ];
        parent::__construct($attributes);
    }


    /**
     * Get the event's id number
     *
     * @return int
     */
    public function getId() {
        return $this->calendar_event_id;
    }

    /**
     * Get the event's title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Is it an all day event?
     *
     * @return bool
     */
    public function isAllDay()
    {
        return (bool)$this->is_all_day;
    }

    /**
     * Get the start time
     *
     * @return DateTime
     */
    public function getStart()
    {
        return $this->start;
    }

    /**
     * Get the end time
     *
     * @return DateTime
     */
    public function getEnd()
    {
        return $this->end;
    }
}