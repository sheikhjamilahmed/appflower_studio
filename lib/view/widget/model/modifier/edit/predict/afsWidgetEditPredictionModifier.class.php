<?php
/**
 * Widget edit prediction modifier
 *
 * @package appFlowerStudio
 * @author Sergey Startsev <startsev.sergey@gmail.com>
 */
class afsWidgetEditPredictionModifier
{
    /**
     * Default field type
     */
    const DEFAULT_FIELD_TYPE = 'input';
    
    /**
     * Feild types mapping, type_in_db => type_in_form
     * 
     * @example 'LONGVARCHAR'   => 'textarea',
     * @var array
     */
    private $field_type_map = array(
        'LONGVARCHAR'   => 'textarea',
        'DATE'          => 'date',
        'TIMESTAMP'     => 'datetime',
    );
    
    /**
     * Definition
     *
     * @var array
     */
    private $definition;
    
    /**
     * Private constructor
     */
    private function __construct() {}
    
    /**
     * Fabric method creator
     *
     * @param array $definition 
     * @return afsWidgetEditPredictionModifier
     * @author Sergey Startsev
     */
    static public function create(array $definition = array())
    {
        $instance = new self;
        $instance->definition = $definition;
        
        return $instance;
    }
    
    /**
     * Setting definition
     *
     * @param Array $definition 
     * @return void
     * @author Sergey Startsev
     */
    public function setDefinition(Array $definition)
    {
        $this->definition = $definition;
    }
    
    /**
     * Getting definition
     *
     * @return array
     * @author Sergey Startsev
     */
    public function getDefinition()
    {
        return $this->definition;
    }
    
    /**
     * Field types prediction modifier method
     *
     * @param boolean $with_validator 
     * @return afsWidgetEditPredictionModifier
     * @author Sergey Startsev
     */
    public function fieldTypes($with_validator = true)
    {
        $definition = $this->getDefinition();
        
        $fields = $this->getFields();
        $peerClassName = afsWidgetEditModifierHelper::getDatasource($definition);
        
        if (!is_null($peerClassName)) {
            $tableMap = call_user_func("{$peerClassName}::getTableMap");
            
            foreach ($fields as &$field) {
                $columnName = $field['attributes']['name'];
                
                if ($tableMap->hasColumn($columnName)) {
                    $column = $tableMap->getColumn($columnName);
                    $field['attributes']['type'] = $this->getType($column->getType());
                    
                    if ($with_validator) {
                        $method_name = 'get' . ucfirst(strtolower($column->getType())) . 'Validator';
                        if (method_exists($this, $method_name)) {
                            $field['i:validator'] = call_user_func(array($this, $method_name), $column->getSize(), $column->isNotNull());
                        }
                    }
                }
            }
        }
        
        $this->setFields($fields);
        
        return $this;
    }
    
    /**
     * Getting possible field type
     *
     * @param string $type 
     * @return string
     * @author Sergey Startsev
     */
    private function getType($type)
    {
        return (array_key_exists($type, $this->field_type_map)) ? $this->field_type_map[$type] : self::DEFAULT_FIELD_TYPE;
    }
    
    /**
     * Getting varchar validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getVarcharValidator($max_size = 0, $is_required = false)
    {
        return array(
            'attributes' => array(
                'name' => 'sfValidatorString',
            ),
            'i:param' => array(
                array(
                    'attributes' => array('name' => 'required'),
                    '_content' => (($is_required) ? 'true' : 'false'),
                ),
                array(
                    'attributes' => array('name' => 'max_length'),
                    '_content' => $max_size,
                ),
            )
        );
    }
    
    /**
     * Getting timestamp validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getTimestampValidator($max_size = 0, $is_required = false)
    {
        return array(
            'attributes' => array(
                'name' => 'sfValidatorDateTime',
            ),
            'i:param' => array(
                array(
                    'attributes' => array('name' => 'required'),
                    '_content' => (($is_required) ? 'true' : 'false'),
                ),
            )
        );
        
    }
    
    /**
     * Getting date validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getDateValidator($max_size = 0, $is_required = false)
    {
        return array(
            'attributes' => array(
                'name' => 'sfValidatorDate',
            ),
            'i:param' => array(
                array(
                    'attributes' => array('name' => 'required'),
                    '_content' => (($is_required) ? 'true' : 'false'),
                ),
            )
        );
    }
    
    /**
     * Getting integer validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getIntegerValidator($max_size = 0, $is_required = false)
    {
        return array(
            'attributes' => array(
                'name' => 'immValidatorNumber',
            ),
            'i:param' => array(
                array(
                    'attributes' => array('name' => 'required'),
                    '_content' => (($is_required) ? 'true' : 'false'),
                ),
            )
        );
    }
    
    /**
     * Getting numeric validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getNumericValidator($max_size = 0, $is_required = false)
    {
        return $this->getIntegerValidator($max_size, $is_required);
    }
    
    /**
     * Getting tinyint validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getTinyintValidator($max_size = 0, $is_required = false)
    {
        return $this->getIntegerValidator($max_size, $is_required);
    }
    
    /**
     * getting bigint validator definition
     *
     * @param string $max_size 
     * @param boolean $is_required 
     * @return array
     * @author Sergey Startsev
     */
    private function getBigintValidator($max_size = 0, $is_required = false)
    {
        return $this->getIntegerValidator($max_size, $is_required);
    }
    
    /**
     * Getting fields list
     *
     * @return array
     * @author Sergey Startsev
     */
    private function getFields()
    {
        $fields = array();
        if (isset($this->definition['i:fields']) ) {
            $fields = $this->definition['i:fields']['i:field'];
            if (!is_numeric(key($fields))) $fields = array($fields);
        }
        
        return $fields;
    }
    
    /**
     * Update fields list
     *
     * @param Array $fields 
     * @return void
     * @author Sergey Startsev
     */
    private function setFields(Array $fields)
    {
        $this->definition['i:fields']['i:field'] = $fields;
    }
    
}