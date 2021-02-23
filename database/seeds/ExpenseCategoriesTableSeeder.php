<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['食費', '外食費', '日用雑貨費', '光熱費', '水道費', '住居費',  '通信費', '交通費', '医療費'];
        foreach($categories as $category) {
            DB::table('expense_categories')->insert(['name' => $category]);
        }
    }
}
