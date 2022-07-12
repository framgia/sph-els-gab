<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserFieldPostRequest extends FormRequest
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
    public function register_rules()
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
                'required',
                'max:100'
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
            'birthdate' => [
                'required',
                'before:today'
            ]
        ];
    }

    public function login_rules()
    {
        return [
            "email" => [
                "required",
                "email",
                Rule::exists("users", "email")
            ],
            "password" => [
                "required"
            ],
        ];
    }

    public function updateProfile_rules()
    {
        return [
            'firstname' => [
                'required',
                'max:100'
            ],
            'middlename' => [
                'required',
                'max:100'
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
            'birthdate' => [
                'required',
                'before:today'
            ]
        ];
    }

    public function updateCredential_rules()
    {
        return [
            "password" => [
                "required",
                "min:8",
                "max:30"
            ]
        ];
    }

    public function rules()
    {
        switch($this->module) {
            case 'register': {
                $this->register_rules();
            }
            case 'login': {
                $this->login_rules();
            }
            case 'update_profile': {
                $this->updateProfile_rules();
            }
            case 'update_credential': {
                $this->updateCredential_rules();
            }
            default: {}
        }
    }
}
