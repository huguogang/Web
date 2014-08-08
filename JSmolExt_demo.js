Ext.onReady(function(){
	var demo = Ext.widget('tabpanel', {
		renderTo: document.body,
		width: 600,
		height: 400,
		items: [{
			title: 'caffeine',
			xtype: 'jsmolext',
			width: 400,
			height: 400,
			//note, in safe mode, JmolCofig does not work
			//need server side dynamic content to enable it
			JmolConfig:{
				 width: 100,
				 height: 100,
				 color: "0x000000",
				 j2sPath: "lib/jsmol/j2s", // this needs to point to where the j2s directory is.
				 script: "load $caffeine"
			},
			safe: true
		}, {
			title: 'aspirin',
			xtype: 'jsmolext',
			closable: true,
			width: 400,
			height: 400,
			JmolConfig:{
				 width: 100,
				 height: 100,
				 color: "0xFFFFFF",
				 j2sPath: "lib/jsmol/j2s", // this needs to point to where the j2s directory is.
				 script: "load :aspirin"
			},
			safe: false
		}, {
			title: 'no config',
			xtype: 'jsmolext',
			closable: true,
			width: 400,
			height: 400,
			safe: false
		}],
		listeners: {
			afterrender: function() {
				Ext.fly('divLoading').remove();
			}
		}
	});
});
