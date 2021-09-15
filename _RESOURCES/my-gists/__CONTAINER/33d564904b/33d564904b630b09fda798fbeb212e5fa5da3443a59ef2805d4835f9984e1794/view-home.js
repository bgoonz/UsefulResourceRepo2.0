/*global YUI:true */
YUI.add("view-home", function(Y) {
    var L = Y.Lang,
        gw2 = Y.namespace("GW2"),
        Views = Y.namespace("GW2.Views"),
        Extensions = Y.namespace("GW2.Extensions");
    
    Views.Home = Y.Base.create("homeView", Y.View, [
        Extensions.ViewParent
    ], {
        template : Y.namespace("GW2.Templates").home,
        
        initializer : function(config) {
            this.set("views", {
                carousel : new Views.HomeCarousel({
                    models : config.carousel
                }),
                
                featured : new Views.HomeList({
                    type   : "featured",
                    models : config.featured
                }),
                
                hot : new Views.HomeList({
                    type   : "hot",
                    models : config.hot
                }),
                
                sidebar : new Views.HomeSidebar({
                    history : config.history
                })
            });
        },
        
        //NO-OP
        destructor : function() {},
        
        render : function() {
            this.get("container").setContent(this.template());
            
            return this;
        }
    }, {
        ATTRS : {
            items : null
        }
    });
    
}, "@VERSION@", {
    requires : [
        "base",
        "view",
        "view-home-carousel",
        "view-home-list",
        "view-home-sidebar",
        "extension-view-purchasing",
        "extension-view-classer",
        "extension-view-tooltips",
        "tabview",
        "scrollview",
        "scrollview-paginator",
        "gw2-template-home"
    ]
});
