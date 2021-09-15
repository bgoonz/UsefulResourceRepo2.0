<?php
namespace Expressive;


class Model extends \Eloquent {
    protected static $fields = [];
    protected static $unguarded = true;

    function __construct(array $attributes = []) {
        if(static::$fields) {
            if(!$this->fillable) {
                $this->fillable = array_keys(static::$fields);
            }
            if(!$this->dates) {
                $this->dates = array_keys(array_filter(static::$fields,function($fieldType) {
                    return $fieldType === Type::DATETIME;
                }));
            }
            foreach(static::$fields as $fieldName => $fieldType) {
                if($fieldType === Type::PRIMARY) {
                    $this->primaryKey = $fieldName;
                    break; // Laravel doesn't support composite keys :-(
                }
            }
        }
        parent::__construct($attributes);
    }

    public function save(array $options = array()) {
        $tmpAttrs = $this->attributes;
        $this->attributes = array_only($this->attributes,array_keys(static::$fields)); // filter out unfillable fields
        parent::save($options);
        $this->attributes = array_merge($tmpAttrs, $this->attributes); // put them back in, but keep any updated fields like ID
    }

    public function setAttribute($key, $value) {
        if(isset(static::$fields[$key])) {
            switch(static::$fields[$key]) {
                case Type::PRIMARY:
                case Type::FOREIGN:
                    $value = (int)$value ?: null;
                    break;
                case Type::DATETIME:
                    $value = $this->fromDateTime($value);
                    break;
                case Type::MUTATOR:
                    $method = 'set'.studly_case($key).'Attribute';
                    if(!method_exists($this,$method)) throw new \Exception(get_called_class().'::'.$method.' is undefined');
                    $value = $this->{$method}($value);
                    break;
                default:
                    settype($value, static::$fields[$key]);
                    break;
            }
            $this->attributes[$key] = $value;
        } else {
            parent::setAttribute($key, $value);
        }
    }
}