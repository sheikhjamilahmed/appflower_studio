N = afStudio.theme.desktop.menu.model; 

N.Tool = Ext.extend(N.Node, {

    tag: 'tool',
    
    properties : [
        {name: 'text', type: 'string', required: true},
        {name: 'url', type: 'internalUriType', required: true},
        {name: 'iconCls', type: 'token'}
    ],
    
    /**
     * @overrride
     * @protected
     */
    applyNodeDefinition : function(definition, silent) {
        var me = this;
        
        if (!Ext.isDefined(definition)) {
            return;
        }
        
        silent ? this.suspendEvents() : null;
        
        if (Ext.isObject(definition)) {
	        this.applyProperties(definition);
        }
        
        silent ? this.resumeEvents() : null;
    }
    
});

delete N;