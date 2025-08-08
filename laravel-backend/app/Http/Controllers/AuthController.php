<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Persona;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
        
        $user = Auth::user();
        $token = $user->createToken('AppToken')->plainTextToken;

        $user = Auth::user()->load('persona');

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function perfil(Request $request)
    {
        $user = $request->user()->load('persona');
        return response()->json($user);
    }

    public function actualizarPerfil(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $persona = $user->persona;
        
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'phone' => 'nullable|string|max:13',
            'address' => 'nullable|string|max:255',
        ]);

        $persona->fname = $request->fname;
        $persona->lname = $request->lname;
        $persona->phone = $request->phone;
        $persona->address = $request->address;
        $persona->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente.',
            'persona' => $persona
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:13',
            'address' => 'required|string|max:255',
            'password' => 'required|min:6',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->fname . ' ' . $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $persona = Persona::create([
            'user_id' => $user->id,
            'fname' => $request->fname,
            'lname' => $request->lname,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user,
            'persona' => $persona
        ], 201);
    }
}

