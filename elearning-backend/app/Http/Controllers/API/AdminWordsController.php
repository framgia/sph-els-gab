<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateWordsPostRequest;
use App\Models\Category;
use App\Models\Word;

class AdminWordsController extends Controller
{
    // Parse choices
    private function getChoices($choices)
    {
        return json_decode($choices);
    }

    // Process choices for storing
    private function writeChoices($choices)
    {
        return json_encode($choices);
    }

    // Get correct answer from array
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

    // Fetch words from selected category
    public function index($id = null)
    {
        $words = "";
        $data = [];

        if ($id === null)
        {
            $words = Word::with('category')->orderBy('category_id')->get();
        }
        else {
            $words = Word::where("category_id", $id)->with('category')->orderBy('category_id')->get();
        }

        foreach ($words as $word) {
            $choices = $this->getChoices($word->choices);
            $wordArray = [
                "category" => $word->category,
                "id" => $word->id,
                "category_id" => $word->category_id,
                "word" => $word->word,
                "correct_answer" => $word->correct_answer,
                "choices" => $choices
            ];

            array_push($data, $wordArray);
        }

        return response()->json([
            'words'=> $data,
        ]);
    }

    // Fetch word by id
    public function getSingleWord($id)
    {
        $word = Word::where('id', $id)->get()->first();
        $choices = $this->getChoices($word->choices);
        $data = [
            "id" => $word->id,
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
        $choices = $this->writeChoices($request->choices);
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

    // Update word
    public function update($id, CreateWordsPostRequest $request)
    {
        // Convert to JSON string for storing
        $choices = $this->writeChoices($request->choices);
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

    // Delete word
}
