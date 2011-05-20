/**
 * Abstract class that represents elements like i:actions or i:fields
 * Those can contain many childrens with the same name
 * 
 * @class afStudio.wi.CollectionNode
 * @extends afStudio.wi.BaseNode
 */ 
afStudio.wi.CollectionNode = Ext.extend(afStudio.wi.BaseNode, {
	/**
	 * Contains text for context menu addChild item.
	 * @property addChildActionLabel
	 * @type String
	 */
    addChildActionLabel : 'Add child'
    
    /**
     * @property childNodeId
     * @type {String}
     */
    ,childNodeId : 'i:child'
    
    /**
     * Dump empty node or not.
     * @property dumpEvenWhenEmpty 
     * @type Boolean
     */
    ,dumpEvenWhenEmpty : true
    
    /**
     * template method
     * @override
     */
    ,createContextMenu : function() {
        this.contextMenu = new Ext.menu.Menu({
            items: [
            {
                text: this.addChildActionLabel,                
                iconCls: 'icon-add',
                handler: this.onContextAddChildItemClick,
                scope: this
            }]
        });
    }//eo createContextMenu
    
    /**
     * @protected
     * @override
     * @param {Ext.tree.TreeNode} node
     * @param {Ext.EventObject} e
     */
    ,onContextMenuClick : function(node, e) {
        node.select();
        this.contextMenu.showAt(e.getXY());
    }//eo onContextMenuClick    
    
    /**
     * Context menu addChild <u>click</u> event listener.
     */
    ,onContextAddChildItemClick : function(item, e) {
    	var newNode = this.addChild();
    }//eo onContextAddChildItemClick
    
    /**
     * @override
     * @protected
     * @param {String} id
     * @param {Mixed} value
     */
    ,configureForValue : function(id, value) {
        if (id == this.childNodeId) {
            if (!Ext.isArray(value)) {
                value = [value];
            }
            for (var i = 0; i < value.length; i++) {
                var newNode = this.addChild();
                newNode.configureFor(value[i]);
            }
        } else {
            afStudio.wi.CollectionNode.superclass.configureForValue.apply(this, arguments);
        }
    }//eo configureForValue
    
    /**
     * Adds a child node. 
     * @protected
     * 
     * @return {Ext.tree.TreeNode} created new child node
     */
    ,addChild : function() {
        var newNode = this.createChild();
        this.appendChild(newNode);
        if (this.rendered) {
            this.expand();
        }

        return newNode;
    }//eo addChild    
    
    /**
     * @override
     * @return {}
     */
    ,dumpChildsData : function() {
        var data = [],
        	 ret = {};
        	 
        this.eachChild(function(childNode) {
            data.push(childNode.dumpDataForWidgetDefinition());
        });
        if (data.length == 0 && !this.dumpEvenWhenEmpty) {
            return ret;
        }
        ret[this.childNodeId] = data;
        
        return ret;
    }//eo dumpChildsData
    
    /**
     * Abstract method.
     * This method should create and return new child node.
     * @protected
     * 
     * @return {Ext.tree.TreeNode}
     */
    ,createChild : Ext.emptyFn    
});