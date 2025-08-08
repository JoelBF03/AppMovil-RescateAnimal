<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reporte;

class ReporteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'petName' => 'nullable|string|max:255',
            'status' => 'required|in:Perdida,Encontrada',
            'ubication' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
        ]);

        $reporte = Reporte::create([
            'user_id' => auth()->id(),
            'petName' => $request->petName,
            'status' => $request->status,
            'ubication' => $request->ubication,
            'description' => $request->description,
            'image' => $request->image,
        ]);

        return response()->json(['message' => 'Reporte creado', 'reporte' => $reporte], 201);
    }

    public function index()
    {
        $reportes = Reporte::with('user.persona')
        ->where('estado', 'activo')
        ->latest()
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json($reportes);
    }

    public function show($id)
    {
        $reporte = Reporte::with('user.persona')->findOrFail($id);
        return response()->json($reporte);
    }

    public function eliminar($id)
    {
        $reporte = Reporte::findOrFail($id);

        // Validar que el reporte le pertenece al usuario
        if ($reporte->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $reporte->estado = 'inactivo'; // o 'eliminado' si así decidiste
        $reporte->save();

        return response()->json(['message' => 'Reporte eliminado lógicamente']);
    }

    public function update(Request $request, $id)
    {
        $reporte = Reporte::find($id);

        if (!$reporte) {
            return response()->json(['message' => 'Reporte no encontrado'], 404);
        }

        // Verifica que el usuario autenticado sea el dueño del reporte
        if (auth()->id() !== $reporte->user_id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // Validar los datos
        $validated = $request->validate([
            'petName' => 'required|string|max:100',
            'status' => 'required|in:Perdida,Encontrada',
            'ubication' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        // Actualizar los campos (excepto la fecha)
        $reporte->petName = $validated['petName'];
        $reporte->status = $validated['status'];
        $reporte->ubication = $validated['ubication'];
        $reporte->description = $validated['description'] ?? null;

        // Si envían una nueva imagen en base64, se guarda
        if (isset($validated['image'])) {
            $reporte->image = $validated['image'];
        }

        $reporte->save();

        return response()->json(['message' => 'Reporte actualizado con éxito', 'reporte' => $reporte], 200);
    }
    
}
