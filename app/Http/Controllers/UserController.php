<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function userCheck()
    {
        $user = Auth::user();
        if ($user && $user->room_id) {
            $room = Room::find($user->room_id);
            $roomName = $room->name;
            return ['user' => $user, 'roomName' => $roomName];
        }
        return ['user' => $user];
    }
}