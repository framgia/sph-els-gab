<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateWordsPostRequest;
use App\Models\Category;
use App\Models\Word;
use Exception;

class AdminWordsController extends Controller
{
    // Fetch quizzes from selected category
    public function index($id)
    {
        $quizzes = Category::where('id', $id)->quizzes()->get();

        return response()->json([
            'quizzes'=> $quizzes,
        ]);
    }

    // Created category
    public function store(CreateWordsPostRequest $request)
    {
        $choices = json_encode($request->choices);
        $correctAnswer = "";

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
