Ext.ns('afStudio.model.template');

N = afStudio.model.template;

/**
 * Contains all available model's nodes.
 * @singleton
 * @type Object
 * @author Nikolai Babinski
 */
N.ModelNode = {
	
	TITLE : 'i:title',
	
	DESCRIPTION : 'i:description',
	
	MENU : 'i:menu',
	
	CONFIRM : 'i:confirm',

	FIELDS : 'i:fields',
	
	FIELD : 'i:field',
	
	COLUMN : 'i:column',
	
	BUTTON : 'i:button',
	
	LINK : 'i:link',
	
	RADIO_GROUP : 'i:radiogroup',
	
	IF : 'i:if',
	
	ALTERNATE_DESCRIPTIONS : 'i:alternateDescriptions',
	
	GROUPING : 'i:grouping',
	
	SET	: 'i:set',
	
	REF	: 'i:ref',
	
	PARAMS : 'i:params',
	
	PARAM : 'i:param',
	
	DATA_SOURCE : 'i:datasource',

	DATA_STORE : 'i:datastore',
	
	ACTIONS : 'i:actions',
	
	ACTION : 'i:action',
	
	ROW_ACTIONS : 'i:rowactions',
	
	MORE_ACTIONS : 'i:moreactions',
	
	AREA : 'i:area',
	
	WIDGET_CATEGORIES : 'i:widgetCategories',
	
	EXTRA_HELP : 'i:extrahelp',
	
	OPTIONS : 'i:options',
	
	CLASS : 'i:class',
	
	METHOD : 'i:method',
	
	HANDLER : 'i:handler',
	
	VALUE : 'i:value',
	
	TOOLTIP : 'i:tooltip',
	
	VALIDATOR : 'i:validator',
	
	HELP : 'i:help',
	
	TRIGGER : 'i:trigger',
	
	WINDOW : 'i:window',
	
	SOURCE : 'i:source',
	
	ITEM : 'i:item'
};

//shortcut
afStudio.ModelNode = N.ModelNode;

delete N;