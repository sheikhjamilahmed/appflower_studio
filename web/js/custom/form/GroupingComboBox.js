Ext.ns('Ext.ux.form');

/**
 * GroupingComboBox
 * @class Ext.ux.form.GroupingComboBox
 * @extends Ext.form.ComboBox
 * @author Condor, http://www.sencha.com/forum/member.php?343-Condor
 */
Ext.ux.form.GroupingComboBox = Ext.extend(Ext.form.ComboBox, {
	
	/**
	 * Template method
	 * @override
	 * @private
	 */
	initComponent : function() {
		if (this.transform) {
			this.allowDomMove = false;
			var s = Ext.getDom(this.transform);
			if (!this.hiddenName) {
				this.hiddenName = s.name;
			}
			if (!this.store) {
				this.mode = 'local';
				var d = [], opts = s.options;
				for (var i = 0, len = opts.length;i < len; i++) {
					var o = opts[i];
					var value = (Ext.isIE ? o.getAttributeNode('value').specified : o.hasAttribute('value')) ? o.value : o.text;
					if (o.selected) {
						this.value = value;
					}
					var optgrp = o.parentNode, group = optgrp.tagName.toLowerCase() == 'optgroup' ? optgrp.label : false;
					d.push([value, o.text, group]);
				}
				this.store = new Ext.data.SimpleStore({
					'id': 0,
					fields: ['value', 'text', 'group'],
					data : d
				});
				this.valueField = 'value';
				this.displayField = 'text';
				this.groupField = 'group';
			}
			s.name = Ext.id();
			if (!this.lazyRender) {
				this.target = true;
				this.el = Ext.DomHelper.insertBefore(s, this.autoCreate || this.defaultAutoCreate);
				Ext.removeNode(s);
				this.render(this.el.parentNode);
			} else {
				Ext.removeNode(s);
			}
		}
		delete this.transform;
		Ext.ux.form.GroupingComboBox.superclass.initComponent.call(this);
	},
	
	/**
	 * @override
	 * @private
	 */
	initList : function() {
		if (!this.list && !this.tpl) {
			this.tpl = 
			[
			'<tpl for=".">',
				'<tpl if="values.' + this.groupField + ' && (xindex == 1 || parent[xindex - 2].' + this.groupField + ' != values.' + this.groupField + ')">',
					'<div class="x-combo-list-group">{' + this.groupField + '}</div>', 
				'</tpl>',
				'<div class="x-combo-list-item">', 
					'<tpl if="values.' + this.groupField + '">&nbsp;</tpl>',
					'{' + this.displayField + '}',
				'</div>',
			'</tpl>'].join('');
		}
		
		Ext.ux.form.GroupingComboBox.superclass.initList.call(this);
	}
});
