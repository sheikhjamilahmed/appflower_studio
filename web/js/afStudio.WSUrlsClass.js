Ext.ns('afStudio');

/**
 * In this class we'll store all URL used to fetch project related data with ajax calls
 * We need to have those in one place
 */
afStudio.WSUrlsClass = function() {
};

afStudio.WSUrlsClass = Ext.extend(afStudio.WSUrlsClass, {
    
	helpUrl : 'http://www.appflower.com/cms/learningcenter',
	
	welcomeWinUrl : '/appFlowerStudio/welcome',
	
    modelListUrl: '/appFlowerStudio/models',
    
    getFiletreeUrl : '/appFlowerStudio/filetree',
    
    moduleListUrl : '/afsModuleManager/getList',
    
    moduleGroupedUrl : '/afsModuleManager/getGrouped',

    moduleAddUrl : '/afsModuleManager/add',
	
	moduleRenameUrl : '/afsModuleManager/rename',	
	
	moduleDeleteUrl : '/afsModuleManager/delete',    
    
	widgetRenameUrl : '/afsModuleManager/renameView',
	
	widgetDeleteUrl : '/afsModuleManager/deleteView',   
    
	widgetGenerateUrl : 'afsWidgetBuilder/generateWidget',
	
	widgetSetAsHomepage : '/afsModuleManager/setAsHomepage',
	
	pageSetAsHomepage : '/afsLayoutBuilder/setAsHomepage',
	
    getModuleWidgetsUrl: function() {
        return this.buildUrlFor('/appFlowerStudio/moduleWidgets');
    },    
    
	widgetPreviewUrl : '/appFlowerStudio/preview',
	
	widgetUrl : 'afsLayoutBuilder/getWidget',
	
	layoutSaveUrl : 'afsLayoutBuilder/save',
	
    pluginListUrl : '/afsPluginManager/getList',
    
	pluginAddUrl : '/afsPluginManager/add',
	
	pluginRenameUrl : '/afsPluginManager/rename',	
	
	pluginDeleteUrl : '/afsPluginManager/delete',
	
    widgetGetDefinitionUrl : '/afsWidgetBuilder/getWidget',
    
    widgetSaveDefinitionUrl : '/afsWidgetBuilder/saveWidget',
    
    getFilecontentUrl : '/appFlowerStudio/filecontent',
    
    userCreateUrl : '/afsUserManager/create',
    
    userUpdateUrl : '/afsUserManager/update',
    
    userDeleteUrl : '/afsUserManager/delete',
    
    userListUrl : '/afsUserManager/getList',
    
    userGetUrl : '/afsUserManager/get',
    
    getDebugUrl: function() {
        return this.buildUrlFor('/appFlowerStudio/debug');
    },
    
    notificationUrl : '/appFlowerStudio/notifications',
    
    getConsoleUrl: function() {
        return this.buildUrlFor('/appFlowerStudio/console');
    },
    
    configureProjectUrl : '/appFlowerStudio/configureProject',
    
    getConfigureDatabaseUrl: function() {
        return this.buildUrlFor('/appFlowerStudio/configureDatabase');
    },
    
    getLoadDatabaseConnectionSettingsUrl: function() {
        return this.buildUrlFor('/appFlowerStudio/loadDatabaseConnectionSettings');
    },
    
    dbQueryDatabaseListUrl : '/afsDatabaseQuery/databaseList',
    
    dbQueryQueryUrl : '/afsDatabaseQuery/query',
    
    dbQueryComplexQueryUrl : '/afsDatabaseQuery/complexQuery',
    
    getModelGridDataReadUrl: function(modelName) {
        return this.buildUrlFor('/afsModelGridData/read?model=' + modelName);
    },
    
    getModelGridDataCreateUrl: function(modelName) {
        return this.buildUrlFor('/afsModelGridData/create?model=' + modelName);
    },
    
    getModelGridDataUpdateUrl: function(modelName) {
        return this.buildUrlFor('/afsModelGridData/update?model=' + modelName);
    },
    
    getModelGridDataDeleteUrl: function(modelName) {
        return this.buildUrlFor('/afsModelGridData/delete?model=' + modelName);
    },
    
    templateSelectorUrl : '/appFlowerStudio/templateSelector',
    
    checkHelperFileUrl : '/appFlowerStudio/checkHelperFileExist',
    
    getCheckUserExistUrl: function() {
    	return this.buildUrlFor('/afsUserManager/checkUserExist');
    },

	project : '/appFlowerStudio/project',
    
    exportUrl : '/appFlowerStudio/export',
    
    buildUrlFor: function(url) {
        return url;
    }
});

afStudioWSUrls = new afStudio.WSUrlsClass();