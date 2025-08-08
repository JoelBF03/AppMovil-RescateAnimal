<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReporteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/perfil', [AuthController::class, 'perfil']);
    Route::put('/perfil/{id}', [AuthController::class, 'actualizarPerfil']);

    Route::get('/reportes', [ReporteController::class, 'index']);
    Route::post('/reportes', [ReporteController::class, 'store']);
    Route::get('/reportes/{id}', [ReporteController::class, 'show']);
    Route::patch('/reportes/{id}/eliminar', [ReporteController::class, 'eliminar']);
    Route::put('/reportes/{id}', [ReporteController::class, 'update']);
});


