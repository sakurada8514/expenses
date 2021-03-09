<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'title', 'period', 'memo', 'room_id', 'user_id'
    ];

    protected $hidden = [
        self::CREATED_AT
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
