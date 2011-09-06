/**
 * <u>i:value</u> model node.
 * 
 * @author Nikolai Babinski <niba@appflower.com>
 */
afStudio.model.widget.Value = Ext.extend(afStudio.model.Node, {

	tag : afStudio.ModelNode.VALUE,
	
	properties : [
        {name: 'type', type: 'valueType', required: true, 
        	reconfigure: {
        		'orm': [
        			{name: afStudio.ModelNode.SOURCE, required: true}
        		],
        		'file': [
        			{name: afStudio.ModelNode.CLASS, required: true},
        			{name: afStudio.ModelNode.METHOD, required: true}
        		],
        		'static': [
        			{name: afStudio.ModelNode.ITEM, required: true, hasMany: true}
        		]
        	}
        },
 		{name: 'permissions', type: 'permissionType', defaultValue: '*'}        
	],
	
	defaultDefinition : {
		attributes: {
			type: 'orm'
		}
	},
	
	nodeTypes : [
		{name: afStudio.ModelNode.SOURCE, required: true}
//			i:class" minOccurs="1" maxOccurs="1"
//			i:method" minOccurs="1" maxOccurs="1"
//
//			i:source" minOccurs="1" maxOccurs="1"
//
//			i:item" minOccurs="1" maxOccurs="unbounded"
//
//			i:static" minOccurs="1" maxOccurs="1"
	]
});