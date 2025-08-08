<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    protected $fillable = [
    'user_id', 'petName', 'status', 'ubication', 'description', 'image', 'estado'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
