<?php
namespace Package\ResetsPassword\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ResetsPassword extends Model
{

    protected $table = 'resets_password';
    protected $primaryKey = 'email';


    public function __construct(array $attributes = [])
    {
        $this->fillable = [
            'email',
            'token',
        ];
        parent::__construct($attributes);
    }

}