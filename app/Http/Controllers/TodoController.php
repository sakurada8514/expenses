<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function createTodo(TodoRequest $request, Todo $todo)
    {
        $user = Auth::user();
        $roomId = $user->room_id;
        $formData = [
            'title' => $request->title,
            'period' => $request->period,
            'memo' => $request->memo,
            'room_id' => $user->room_id,
            'user_id' => $user->id,
        ];
        $todo->fill($formData)->save();
        return $todo;
    }

    public function readTodos(string $roomId)
    {
        $todo = Todo::with(['user'])->where('room_id', $roomId)->orderByDesc('updated_at')->get();
        return $todo;
    }

    public function readTodoDetail(string $id)
    {
        $todo = Todo::with('user')->where('id', $id)->first();
        return $todo;
    }

    public function deleteTodo(string $id)
    {
        $todo = Todo::find($id);
        $todo->delete();
        return;
    }
}
