<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRegisterPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "username" => [
                "required",
                "min:4",
                "max:20",
                Rule::unique("users", "username")
            ],
            "email" => [
                "required",
                "max:200",
                "email",
                Rule::unique("users", "email")
            ],
            "password" => [
                "required",
                "min:8",
                "max:30"
            ],
            'firstname' => [
                'required',
                'max:100'
            ],
            'middlename' => [
                'nullable',
                'max:100',
            ],
            'lastname' => [
                'required',
                'max:100'
            ],
            'sex' => [
                'required',
                Rule::in(["M", "F"])
            ],
            'address' => [
                'required',
                'max:200'
            ],
            'phone' => [
                'nullable'
            ],
            'birthdate' => [
                'required',
                'before:today'
            ]
        ];
    }
}
