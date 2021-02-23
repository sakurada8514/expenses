<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'money', 'category_id', 'date', 'place', 'room_id'
    ];

    protected $hidden = [
        self::CREATED_AT,
        self::UPDATED_AT,
    ];
}
