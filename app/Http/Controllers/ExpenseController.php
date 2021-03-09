<?php

namespace App\Http\Controllers;

use App\Expense;
use App\ExpenseCategory;
use App\Http\Requests\ExpenseRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function create(ExpenseRequest $request, Expense $expense)
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

    public function readExpenses(string $roomId)
    {
        $expenses = Expense::with(['category'])->where('room_id', $roomId)->orderByDesc('date')->get();
        return $expenses;
    }

    public function readCategory()
    {
        $categories = ExpenseCategory::where('room_id', null)->get();

        return $categories;
    }

    public function readExpenseDetail(string $id)
    {
        $expense = Expense::with(['category'])->where('id', $id)->first();

        return $expense;
    }

    public function deleteExpense(string $id)
    {
        $expense = Expense::find($id);

        $expense->delete();
        return;
    }

    public function updateExpense(ExpenseRequest $request, string $id)
    {
        $expense = Expense::find($id);
        $formData = [
            'money' => $request->money,
            'category_id' => $request->expenses_category,
            'date' => $request->date,
            'place' => $request->place,
        ];
        $expense->fill($formData)->save();
        return;
    }
}
