<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Listar todas as tarefas
    public function index()
    {
        return response()->json(Todo::all());
    }

    // Criar uma nova tarefa
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'completed' => false,
        ]);

        return response()->json($todo, 201);
    }

    // Mostrar uma tarefa específica
    public function show(string $id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    // Atualizar uma tarefa
    public function update(Request $request, string $id)
    {
        $todo = Todo::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'completed' => 'sometimes|required|boolean',
        ]);

        $todo->update($request->all());

        return response()->json($todo);
    }

    // Excluir uma tarefa
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $data = $todo->toArray(); // Guarda os dados do item
        $todo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Deleted successfully!',
            'item_deleted' => $data,
        ], 200);
    }

    // Opção de excluir com um método estático
    // public function destroy(string $id)
    // {
    //     Todo::destroy($id);
    //     return response()->json(null, 204);
    // }
}
