<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\API\BaseController;
use App\Http\Resources\UserResource;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class AuthController extends BaseController
{
    public function login(Request $request)
    {
        $validator          =       Validator::make($request->all(),
            [
                "email"             =>          "required|email|exists:users,email|max:50",
                "password"          =>          "required"
            ]
        );

        if($validator->fails()) {
            return $this->handleError($validator->errors());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $auth = Auth::user();
            $success['token'] =  $auth->createToken('LaravelSanctumAuth')->plainTextToken;
            $success['name'] =  $auth->name;

            return $this->handleResponse($success, 'User logged-in!');
        }
        else{
            return $this->handleError('INVALID EMAIL/PASSWORD.', ['error'=>'Unauthorised']);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->handleError($validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('LaravelSanctumAuth')->plainTextToken;
        $success['name'] =  $user->name;

        return $this->handleResponse($success, 'User successfully registered!');
    }


}
