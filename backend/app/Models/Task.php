<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'task';

    protected $fillable = [
        'title',
        'description',
        'is_completed',
    ];

    protected $attributes = [
        'is_completed' => false,
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function scopeIncomplete(Builder $query): Builder
    {
        return $query->where('is_completed', false);
    }
}
