<?php
namespace Expressive;

class Type {
    // see http://ca1.php.net/manual/en/function.settype.php
    const BOOL = 'boolean';
    const INT = 'integer';
    const FLOAT = 'float';
    const STRING = 'string';
    const ARRAY_ = 'array';
    const OBJECT = 'object';
    const NULL = 'null';
    const PRIMARY = '__primary';
    const FOREIGN = '__foreign';
    const DATETIME = '__datetime';
    /**
     * @see http://laravel.com/docs/eloquent#accessors-and-mutators
     */
    const MUTATOR = '__mutator';
}