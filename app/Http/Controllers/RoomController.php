<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\User;
use App\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function create(CreateRoomRequest $request, Room $room)
    {
        $formData = ['name' => $request->name];
        $room->fill($formData)->save();

        $user = User::find(Auth::user()->id);
        $user->fill(['room_id' => $room->id])->save();
        return $room;
    }
}
