<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    /**
     * Login USer.
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if(!$user) return response()->json(['success' => false, 'message' => 'User not found!']);
        if (password_verify($request->password, $user->password) && Auth::attempt($request->all())) {
            $token = $user->createToken($user->email)->plainTextToken;
           
            $user->update(['remember_token' => $token, 'cookie' => $token]);
          
            return response()->json(['success' => true, 'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'remember_token' => $user->remember_token,
                'cookie' => $user->cookie,
            ], 'message' => 'User logged in!']);
            
        } else return response()->json(['success' => false, 'message' => 'Pasword does`t match!']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getUser(Request $request) {
        $cookieToken = $request->query('cookie');
        $rememberToken = json_decode($request->query('rememberToken')); 
        
        $user = User::where(['remember_token' => $rememberToken->value, 'cookie' => $cookieToken])->select('id', 'email', 'remember_token', 'cookie')->first();
        
        if ($user) return response()->json(['success' => true, 'data' => $user, 'message' => 'User found!']);
        return response()->json(['success' => false, 'data' => null, 'message' => 'User not found!']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function logout(Request $request) {
        $user_id = $request->query('user_id'); 
        
        $user = User::where('id', $user_id)->update(['remember_token' => NULL, 'cookie' => NULL]);
        
        return response()->json(['success' => true, 'data' => null, 'message' => 'User logout!']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());

        return response()->json(['success' => true, 'data' => $user, 'message' => 'User registerd!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
