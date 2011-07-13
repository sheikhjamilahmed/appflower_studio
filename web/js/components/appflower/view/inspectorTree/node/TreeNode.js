/**
 * Inspector tree base node class.
 * @class afStudio.view.inspector.TreeNode
 * @constructor
 * @param {Object} attr
 * @author Nikolai Babinski <niba@appflower.com>
 */
afStudio.view.inspector.TreeNode = function(attr) {
	attr = attr || {}; 
	
	if (attr.modelNode) {
		this.modelNode = attr.modelNode;
		delete attr.modelNode;
	}
	
	attr.text = attr.name || attr.text || this.modelNode.tag; 
	
	afStudio.view.inspector.TreeNode.superclass.constructor.call(this, attr);

	this.addEvents(
	
		/**
		 * @event "deleteModelNode"
		 * @param {} modelNode
		 */
		"deleteModelNode"
	);
	
	this.initContextMenu();
};

/**
 * Context menu "delete" item's text
 * @static deleteNodeCxtText
 * @type {String} 
 */
afStudio.view.inspector.TreeNode.deleteNodeCxtText = 'Delete',
/**
 * Context menu "add" item's text
 * @static addNodeCxtText
 * @type {String} 
 */
afStudio.view.inspector.TreeNode.addNodeCxtText = 'Add',

/**
 * @class afStudio.view.inspector.TreeNode
 * @extends Ext.tree.TreeNode
 */
Ext.extend(afStudio.view.inspector.TreeNode, Ext.tree.TreeNode, {
	/**
	 * The Model node associated with this node.
	 * @property modelNode
	 * @type {Node}
	 */
	
	/**
	 * The context menu object for this node.
	 * @property contextMenu
	 * @type {Ext.menu.Menu}
	 */
	contextMenu : new Ext.menu.Menu({
		items: [
        {
            itemId: 'delete',
            text: afStudio.view.inspector.TreeNode.deleteNodeCxtText,
            iconCls: 'afs-icon-delete'
		}],
        listeners: {
            itemclick: function(item) {
            	var node = item.parentMenu.contextNode,
            		tree = node.getOwnerTree();
            	
            	switch (item.itemId) {
            		case 'delete' :
            			node.removeNode();
            		break;
            	}
            }
        }	
	}),
	//eo contextMenu
	
	/**
	 * This method should be overrided in descendants classes to provide node's context menu implementation 
	 * and setting up {@link #contextMenu} property.
	 * The method should set up {@link #contextMenu} property to apply new context menu.
	 * @protected
	 * @return {Ext.menu.Menu} menu
	 */
	initContextMenu : function() {
		if (this.modelNode.isDirectRootChild()) {
			this.contextMenu = null;
		}
	},
	
	/**
	 * Removes node.
	 * @public
	 */
	removeNode : function() {
		this.modelNode.remove(true);
		//this.remove();
	},
	
	/**
	 * Cleaning all node's resources.
	 * @protected
	 * @override
	 * @param {Boolean} silent
	 */
    destroy : function(silent) {
        afStudio.view.inspector.TreeNode.superclass.destroy.call(this, silent);
        Ext.destroy(this.contextMenu);
    }
});

/**
 * Adds "node" type to inspector tree nodes {@link afStudio.view.inspector.TreePanel.nodeTypes} object.
 */
afStudio.view.inspector.TreePanel.nodeTypes.node = afStudio.view.inspector.TreeNode;