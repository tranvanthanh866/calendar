<?php
namespace Package\Calendar\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CalendarDate extends Model
{

    use SoftDeletes;

    protected $table = 'calendar_date';
    protected $primaryKey = 'calendar_date_id';


    public function __construct(array $attributes = [])
    {
        $this->fillable = [
            'calendar_event_id',
            'date_start',
            'date_end',
            'is_all_day',
            'background_color',
            'user_id',
        ];
        parent::__construct($attributes);
    }

}