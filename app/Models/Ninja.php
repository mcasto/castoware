<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ninja extends Model
{
    protected $connection = 'ninja';
    protected $table = 'invoices';
}
