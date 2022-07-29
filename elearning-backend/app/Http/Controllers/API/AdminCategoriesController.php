<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCategoriesPostRequest;
use App\Http\Requests\UpdateCategoriesPostRequest;
use App\Models\Category;
use Illuminate\Validation\Rule;

class AdminCategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    public function store(CreateCategoriesPostRequest $request)
    {
        Category::create([
            'title' => $request->title,
            'description' => $request->description,
            'slug' => str_replace(' ', '-', $request->slug),
        ]);
    }

    public function update(UpdateCategoriesPostRequest $request)
    {   
        $currentCategory = $request->id;
        $otherRules = [
            'title' => [
                'required',
                'max:100',
                Rule::unique("categories", "title")->ignore($currentCategory)
            ],
            'slug' => [
                'required',
                Rule::unique("categories", "slug")->ignore($currentCategory)
            ]
        ];

        $newRule = array_merge($request->rules(), $otherRules);
        $validator = $request->validate($newRule);
        
        Category::where("id", $currentCategory)->update([
            'title' => $validator['title'],
            'description' => $validator['description'],
            'slug' => str_replace(' ', '-', $validator['slug']),
        ]);
    }

    public function delete($id)
    {
        Category::find($id)->delete();
    }
}
