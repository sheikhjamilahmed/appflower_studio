<?php
/**
 * Model grid data actions class
 * 
 * @package     appFlowerStudio
 * @subpackage  plugin
 * @author      luwo@appflower.com
 * @author      Sergey Startsev <startsev.sergey@gmail.com>
 */
class afsModelGridDataActions extends afsActions
{	
    /**
     * afsModelGridData actions are all executed in context of concrete model so
     * we are guessing early proper model name and its query class name
     *
     * @var string
     */
    protected $modelName;
    
    /**
     * Model query class
     *
     * @var object
     */
    protected $modelQueryClass;
    
    public function preExecute() 
    {
        $modelName = $this->getRequest()->getParameter('model');
        $modelQueryClass = "{$modelName}Query";
        if (!class_exists($modelName)) {
            throw new afsModelGridDataException("Model {$modelName} probably does not exist. Could not find class named {$modelName}");
        }
        
        $this->modelName = $modelName;
        $this->modelQueryClass = $modelQueryClass;
    }
    
    /**
     * Returns all rows for given model in a format for ModelGrid view
     *
     * @param sfWebRequest $request
     * @return array
     */
    public function executeRead(sfWebRequest $request)
    {
        $offset = $request->getParameter('start', 0);
        $recordsPerPage = $request->getParameter('limit');
        
        $query = $this->getModelQuery();
        $totalRecordsNum = $this->getModelQuery()->count();
        
        $query->offset($offset);
        $query->limit($recordsPerPage);
        $data = $query->find();
        
        $modelData = array();
        foreach ($data as &$row) {
            $row = $this->getModelObjectData($row);
            $modelData[] = $row;
        }
        
        return afResponseHelper::create()->success(true)->data(array(), $modelData, $totalRecordsNum)->asArray();
    }
    
    /**
     * Saves changes made to data in ModelGrid view
     *
     * @param sfWebRequest $request
     * @return array
     */
    public function executeUpdate(sfWebRequest $request)
    {
        $response = afResponseHelper::create()->success(true);
        
        $query = $this->getModelQuery();
        
        $rows = json_decode($request->getParameter('data'), true);
        $data = array();
        $rowsIndexed = array();
        foreach ($rows as $row) {
            $rowsIndexed[$row['id']] = $row;
            $data[$row['id']] = '';
        }
        $ids = array_keys($rowsIndexed);
        $objects = $query->filterByPrimaryKeys($ids)->find();
        
        try {
            foreach ($objects as $object) {
                $peer = $object->getPeer();
                $objectData = $rowsIndexed[$object->getPrimaryKey()];
                unset($objectData['id']);
                foreach ($objectData as $col => $value) {
                    $colNr = str_replace('c', '', $col);
                    $colPhpName = $peer->translateFieldName($colNr, BasePeer::TYPE_NUM, BasePeer::TYPE_PHPNAME);
                    $colSetterMethod = "set{$colPhpName}";
                    $object->$colSetterMethod($value);
                }
                $object->save();
                
                $data[$object->getPrimaryKey()] = $this->getModelObjectData($object);
            }
        } catch (Exception $e) {
            return $response->success(false)->message($e->getMessage())->asArray();
        }
        
        return $response->data(array(), $data, 0)->asArray();
    }
    
    /**
     * Creates new records
     *
     * @param sfWebRequest $request
     * @return array
     */
    public function executeCreate(sfWebRequest $request)
    {
        $response = afResponseHelper::create()->success(true);
        
        $rows = json_decode($request->getParameter('data'), true);
        
        $errors = array();
        $data = array();
        
        foreach ($rows as $row) {
            $object = new $this->modelName;
            $peer = $object->getPeer();
            foreach ($row as $colId => $value) {
                $colId = str_replace('c', '', $colId);
                $object->setByPosition($colId, $value);
            }
            if ($object->isModified()) {
                try {
                    $object->save();
                } catch (PropelException $e) {
                    $errors[] = $e->getMessage() . ' for record: ' . print_r($row, true);
                }
            }
            
            if (!$object->isNew()) {
                $data[] = $this->getModelObjectData($object);
            }
//             $data[] = (!$object->isNew()) ? $this->getModelObjectData($object) : $rowl; //$rowl is not defined
        }
        
        if (count($errors) > 0) return $response->success(false)->message($errors)->asArray();
        
        return $response->data(array(), $data, 0)->asArray();
    }
    
    /**
     * Deletes records
     *
     * @param sfWebRequest $request
     * @return array
     */
    public function executeDelete(sfWebRequest $request)
    {
        $rows = json_decode($request->getParameter('data'), true);
        $query = $this->getModelQuery();
        $query->filterByPrimaryKeys($rows)->delete();
        
        return afResponseHelper::create()->success(true)->message('Rows deleted succesfully')->asArray();
    }
    
    /**
     * Getting model query class
     * 
     * @return ModelCriteria
     */
    private function getModelQuery()
    {
        return new $this->modelQueryClass;
    }
    
    /**
     * Getting object model data
     *
     * @param string $object 
     * @return array
     */
    private function getModelObjectData($object)
    {
        $tmp = array();
        foreach ($object->toArray(BasePeer::TYPE_NUM) as $key => $value) {
            $tmp["c{$key}"] = $value;
        }
        $tmp['id'] = $object->getPrimaryKey();
        
        return $tmp;
    }
    
}
