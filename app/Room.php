<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'name', 'img'
    ];

    protected $hidden = [
        self::CREATED_AT,
        self::UPDATED_AT,
    ];
}
