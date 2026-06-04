<?php

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('it creates a task', function () {
    $response = $this->postJson('/api/tasks', [
        'title' => '   **Buy books**   ',
        'description' => '   Buy books for the next school year

   ',
    ]);

    $response
        ->assertCreated()
        ->assertJsonPath('message', 'Task added successfully')
        ->assertJsonPath('data.title', 'Buy books')
        ->assertJsonPath('data.description', 'Buy books for the next school year')
        ->assertJsonPath('data.is_completed', false);

    $this->assertDatabaseHas('task', [
        'title' => 'Buy books',
        'description' => 'Buy books for the next school year',
        'is_completed' => false,
    ]);
});

test('it returns validation errors when creating a task', function () {
    $response = $this->postJson('/api/tasks', [
        'title' => '',
        'description' => '',
    ]);

    $response
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['title', 'description']);
});

test('it lists all incomplete tasks ordered by most recent first', function () {
    Task::factory()->create(['title' => 'Task 1', 'description' => 'Description 1']);
    Task::factory()->create(['title' => 'Task 2', 'description' => 'Description 2']);
    Task::factory()->create(['title' => 'Task 3', 'description' => 'Description 3']);
    Task::factory()->create(['title' => 'Task 4', 'description' => 'Description 4']);
    Task::factory()->create(['title' => 'Task 5', 'description' => 'Description 5']);
    Task::factory()->create(['title' => 'Task 6', 'description' => 'Description 6']);
    Task::factory()->completed()->create([
        'title' => 'Completed task',
        'description' => 'Should not appear',
    ]);

    $response = $this->getJson('/api/tasks');

    $response
        ->assertOk()
        ->assertJsonPath('message', 'Tasks loaded successfully')
        ->assertJsonCount(6, 'data');

    expect(collect($response->json('data'))->pluck('title')->all())
        ->toBe(['Task 6', 'Task 5', 'Task 4', 'Task 3', 'Task 2', 'Task 1']);

    expect(collect($response->json('data'))->pluck('is_completed')->unique()->all())
        ->toBe([false]);
});

test('it updates a task', function () {
    $task = Task::factory()->create([
        'title' => 'Old title',
        'description' => 'Old description',
    ]);

    $response = $this->putJson("/api/tasks/{$task->id}", [
        'title' => 'Updated title',
        'description' => 'Updated description',
    ]);

    $response
        ->assertOk()
        ->assertJsonPath('message', 'Task updated successfully')
        ->assertJsonPath('data.title', 'Updated title')
        ->assertJsonPath('data.description', 'Updated description');

    $this->assertDatabaseHas('task', [
        'id' => $task->id,
        'title' => 'Updated title',
        'description' => 'Updated description',
    ]);
});

test('it returns validation errors when updating a task', function () {
    $task = Task::factory()->create();

    $response = $this->putJson("/api/tasks/{$task->id}", [
        'title' => '',
        'description' => '',
    ]);

    $response
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['title', 'description']);
});

test('it marks a task as completed', function () {
    $task = Task::factory()->create([
        'title' => 'Finish assignment',
        'description' => 'Submit the work',
        'is_completed' => false,
    ]);

    $response = $this->patchJson("/api/tasks/{$task->id}/complete");

    $response
        ->assertOk()
        ->assertJsonPath('message', 'Task marked as completed successfully')
        ->assertJsonPath('data.is_completed', true);

    $this->assertDatabaseHas('task', [
        'id' => $task->id,
        'is_completed' => true,
    ]);

    $this->getJson('/api/tasks')
        ->assertOk()
        ->assertJsonMissing([
            'title' => 'Finish assignment',
        ]);
});

test('it returns 404 when updating a missing task', function () {
    $this->putJson('/api/tasks/999999', [
        'title' => 'Missing',
        'description' => 'Missing',
    ])->assertNotFound();
});

test('it returns 404 when completing a missing task', function () {
    $this->patchJson('/api/tasks/999999/complete')->assertNotFound();
});

test('it deletes a task permanently', function () {
    $task = Task::factory()->create([
        'title' => 'Task to delete',
        'description' => 'This will be removed',
    ]);

    $response = $this->deleteJson("/api/tasks/{$task->id}");

    $response
        ->assertOk()
        ->assertJsonPath('message', 'Task deleted successfully');

    $this->assertDatabaseMissing('task', [
        'id' => $task->id,
    ]);
});

test('it returns 404 when deleting a missing task', function () {
    $this->deleteJson('/api/tasks/999999')->assertNotFound();
});
