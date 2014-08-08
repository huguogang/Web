/**
 * ExtJS 5 widget for JSmol. It has to be hosted in an iframe because JSmol
 * tend to change JS prototype and cause problem in ExtJS
 * 
 * Author: Guogang Hu
 */
Ext.define('Ext.ux.JSmolExt', {
    extend: 'Ext.Component',
    alias: 'widget.jsmolext',
    loadMask: 'Loading...',
    src: 'about:blank',
    
    /**
     * @cfg {Object} JmolConfig 
     * Parameters for Jmol JavaScript Object. Detailed documentation is availabe at Jmol's wiki page
     * http://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Info
     */
    
    /**
     * @cfg {Boolean} safe
     * If true, will simple embed an same origin web page to show jmol
     */
    
    renderTpl: [
        '<iframe src="{src}" name="{frameName}" width="100%" height="100%" frameborder="0"></iframe>'
    ],

    initComponent: function () {
    	var me = this;
    	var defaultJmolConfig = {
			width: 200,
			height: 200,
			debug: false,
			color: "0xFFFFFF",
			addSelectionOptions: false,
			use: "HTML5",   // JAVA HTML5 WEBGL are all options
			j2sPath: "lib/jsmol/j2s", // this needs to point to where the j2s directory is.
			script: "load $caffeine", //load public data
			disableJ2SLoadMonitor: true,
			disableInitialConsole: true,
			allowJavaScript: true,
			showfrank: false
    	}
    	
        me.callParent();
        
    	me.frameName = me.frameName || me.id + '-jsmolext';
        
    	Ext.apply(me.renderSelectors, {
            iframeEl: 'iframe'
        });
        me.JmolRoot = me.JmolRoot || 'lib/jsmol';
        me.JmolConfig = Ext.apply(defaultJmolConfig, me.JmolConfig); 
        me.safe = !!me.safe; //default false
    },

    initRenderData: function() {
    	var me = this;
        return Ext.apply(me.callParent(), {
            src: me.src,
            frameName: me.frameName
        });
    },

    getBody: function() {
    	var me = this;
        var doc = me.getDoc();
        return doc.body || doc.documentElement;
    },

    getDoc: function() {
    	var me = this;
        try {
            return me.getWin().document;
        } catch (ex) {
        	Ext.log.error(ex);
            return null;
        }
    },

    getWin: function() {
        var me = this,
            name = me.frameName,
            win = Ext.isIE
                ? me.iframeEl.dom.contentWindow
                : window.frames[name];
        return win;
    },

    getFrame: function() {
        var me = this;
        return me.iframeEl.dom;
    },

    beforeDestroy: function () {
    	var me = this;
        me.cleanupListeners(true);
        me.callParent();
    },
    
    cleanupListeners: function(destroying){
    	var me = this;
        var doc, prop;

        if (me.rendered) {
            try {
                doc = me.getDoc();
                if (doc) {
                    Ext.EventManager.removeAll(doc);
                    if (destroying) {
                        for (prop in doc) {
                            if (doc.hasOwnProperty && doc.hasOwnProperty(prop)) {
                                delete doc[prop];
                            }
                        }
                    }
                }
            } catch(e) { 
            	Ext.log.error(e);
            }
        }
    },

    afterRender: function() {
        var me = this,
            doc = me.getDoc();
        //inject HTML through JavaScript, this approach has problem in Firefox, but works in Google Chrome
        //the safest approach would be host a dynamic web page with the content below, and serve if from the same origin
        //I've test that approach for Chrome, FireFox, IE9, and they all worked well.
        var content = '<!DOCTYPE html>'+ '\n' +
					'<html>'+ '\n' +
					'<head>'+ '\n' +
					'<title>JSmol demo</title>'+ '\n' +
					'</head>'+ '\n' +
					'<body>'+ '\n' +
					'<div id="JSmolAppDiv"></div>'+ '\n' +
					'<script type="text/javascript" src="lib/jsmol/JSmol.min.js"></script>'+ '\n' +
					'<script type="text/javascript">'+ '\n' +
					'$(document).ready(function() {'+ '\n' +
					'	Jmol.setDocument(false);'+ '\n' +
					'	var JmolConfig = ' +
					Ext.JSON.encode(me.JmolConfig) + 
					'	'+ '\n' +
					'	delete Jmol._tracker; //disable Google Analytics traffic tracking'+ '\n' +
					'	var applet = Jmol.getApplet("demo1", JmolConfig);'+ '\n' +
					'    $("#JSmolAppDiv").html(Jmol.getAppletHtml(applet));'+ '\n' +
					'});'+ '\n' +
					'</script>'+ '\n' +
					'</body>'+ '\n' +
					'</html>';
        
        if (doc) {
        	if(me.safe) {
        		//simple change iframe src, jmolconfig won't work, for demostration purpose only
        		//will need a dynamic page to work
        		me.getFrame().src = "JSmolDemo.htm";
        	}
        	else {
	        	//inject content
	        	doc.open('text/html", "replace');
	        	doc.write(content);
	        	doc.close();
        	}
            me.el.unmask();
            me.fireEvent('load', me);
        } else if(me.src && me.src != '') {
            me.el.unmask();
            me.fireEvent('error', me);
        }

    }
});
