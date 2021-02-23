<?php

namespace App\Http\Controllers;

use App\Expense;
use App\ExpenseCategory;
use App\Http\Requests\CreateExpenseRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function create(CreateExpenseRequest $request, Expense $expense)
    {
        $roomId = Auth::user()->room_id;
        $formData = [
            'money' => $request->money,
            'category_id' => $request->expenses_category,
            'date' => $request->date,
            'place' => $request->place,
            'room_id' => $roomId
        ];
        $expense->fill($formData)->save();
        return $expense;

    }

    public function readCategory()
    {
        $categories = ExpenseCategory::where('room_id', null)->get();

        return $categories;
    }
}
