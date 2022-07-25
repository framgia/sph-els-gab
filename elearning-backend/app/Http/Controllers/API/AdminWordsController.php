<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateWordsPostRequest;
use App\Models\Category;
use App\Models\Word;

class AdminWordsController extends Controller
{
    // Fetch words from selected category
    public function index($id = null)
    {
        $words = "";

        if ($id === null)
        {
            $words = Word::with('category')->orderBy('category_id')->get();
        }
        else {
            $words = Word::where("category_id", $id)->with('category')->orderBy('category_id')->get();
        }

        $data = collect($words)->map(function ($word) {
            return [
                "category" => $word->category,
                "id" => $word->id,
                "category_id" => $word->category_id,
                "word" => $word->word,
                "correct_answer" => $word->correct_answer,
                "choices" => json_decode($word->choices)
            ];
        });

        return response()->json($data);
    }

    // Fetch word by id
    public function getSingleWord($id)
    {
        $word = Word::where('id', $id)->get()->first();
        $choices = json_decode($word->choices);
        $data = [
            "category_id" => $word->category_id,
            "word" => $word->word,
            "choices" => $choices
        ];

        return response()->json($data);
    }

    // Create word
    public function store(CreateWordsPostRequest $request)
    {
        // Convert to JSON string for storing
        $choices = json_encode($request->choices);
        $correctAnswer = "";

        // Get correct answer
        foreach($request->choices as $key) {
            if ($key['choice'] === null ) {
                throw new \ErrorException('Please set all choices!');
                return;
            }

            $correctAnswer = $key['is_correct'] ? $key['choice'] : $correctAnswer;
        }
        
        if ($correctAnswer === "") {
            throw new \ErrorException('No correct answer has been set!');
            return;
        }

        Word::create([
            'category_id' => $request->category_id,
            'choices' => $choices,
            'correct_answer' => $correctAnswer,
            'word' => $request->word,
        ]);
    }
}
