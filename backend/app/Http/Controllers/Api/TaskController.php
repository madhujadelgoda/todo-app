<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = Task::query()
            ->incomplete()
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Tasks loaded successfully',
            'data' => TaskResource::collection($tasks)->resolve(),
        ]);
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = Task::create([
            ...$request->validated(),
            'is_completed' => false,
        ]);

        return response()->json([
            'message' => 'Task added successfully',
            'data' => (new TaskResource($task))->resolve(),
        ], 201);
    }

    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $task->update($request->validated());

        return response()->json([
            'message' => 'Task updated successfully',
            'data' => (new TaskResource($task->refresh()))->resolve(),
        ]);
    }

    public function complete(Task $task): JsonResponse
    {
        $task->update([
            'is_completed' => true,
        ]);

        return response()->json([
            'message' => 'Task marked as completed successfully',
            'data' => (new TaskResource($task->refresh()))->resolve(),
        ]);
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
