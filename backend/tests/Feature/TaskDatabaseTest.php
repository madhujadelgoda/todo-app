<?php

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('task factory creates a task', function () {
    $task = Task::factory()->create();

    expect($task)->toBeInstanceOf(Task::class);

    $this->assertDatabaseHas('task', [
        'id' => $task->id,
    ]);
});

test('task seeder inserts tasks', function () {
    $this->seed();

    $this->assertDatabaseCount('task', 5);
});
