<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateWordsPostRequest;
use App\Models\Category;
use App\Models\Word;

class AdminWordsController extends Controller
{
    public function index()
    {
        $words = Word::with('category')->orderBy('category_id')->get();
        $data = collect($words)->map(function ($word) {
            $word->choices = json_decode($word->choices);
            return $word;
        });

        return response()->json($data);
    }

    public function show($param)
    {
        $queryValue = intval($param) ? $param : Category::where('slug', $param)->first()->id;
        $words = Word::where("category_id", $queryValue)->with('category')->orderBy('category_id')->get();
        $data = collect($words)->map(function ($word) {
            $word->choices = json_decode($word->choices);
            return $word;
        });

        return response()->json($data);
    }

    public function getSingleWord($id)
    {
        $word = Word::find($id); 
        $word->choices = json_decode($word->choices);
        return response()->json($word);
    }

    public function store(CreateWordsPostRequest $request)
    {
        $choices = json_encode($request->choices);
        $correctAnswer = $this->getCorrectAnswer($request->choices);
        
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

    private function getCorrectAnswer($choices)
    {
        $correctAnswer = "";

        foreach($choices as $key) {
            if ($key['choice'] === null ) {
                throw new \ErrorException('Please set all choices!');
                return;
            }

            $correctAnswer = $key['is_correct'] ? $key['choice'] : $correctAnswer;
        }

        return $correctAnswer;
    }

    public function update($id, CreateWordsPostRequest $request)
    {
        $choices = json_encode($request->choices);
        $correctAnswer = $this->getCorrectAnswer($request->choices);
        
        if ($correctAnswer === "") {
            throw new \ErrorException('No correct answer has been set!');
            return;
        }
        
        Word::where('id', $id)->update([
            'category_id' => $request->category_id,
            'choices' => $choices,
            'correct_answer' => $correctAnswer,
            'word' => $request->word,
        ]);
    }

    public function delete($id)
    {
        Word::find($id)->delete();
    }
}
