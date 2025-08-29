<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'nome',
        'descricao',
        'preco',
        'data_validade',
        'imagem',
        'categoria_id'
    ];

    protected $casts = [
        'preco' => 'double',
        'data_validade' => 'date'
    ];



    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categoria_id');
    }


}
