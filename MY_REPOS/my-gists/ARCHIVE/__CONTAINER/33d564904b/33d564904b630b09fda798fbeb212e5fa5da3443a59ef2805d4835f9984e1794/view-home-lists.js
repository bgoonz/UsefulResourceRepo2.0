/*global YUI:true */
YUI.add("view-home-list", function(Y) {
    var Templates = Y.namespace("GW2.Templates");
    
    Y.namespace("GW2.Views").HomeList = Y.Base.create("homeListView", Y.View, [], {
        template : Templates["home-list"],
        
        events : {
            ".browse" : {
                click : "_clickBrowse"
            }
        },
        
        render : function() {
            var items = this.get("models");
            
            this.get("container").setHTML(this.template({
                type  : this.get("type"),
                title : this.get("title"),
                items : items.toJSON()
            }));
            
            return this;
        },
        
        _clickBrowse : function(e) {
            e.preventDefault();
            
            this.fire("search", {
                search : {
                    tag : e.currentTarget.getData("tag")
                }
            });
        }
    }, {
        ATTRS : {
            type  : null,
            title : null
        }
    });
    
}, "@VERSION@", {
    requires : [
        "base",
        "view",
        "gw2-template-home-list",
        "gw2-template-home-item",
        "gw2-template-item-buttons"
    ]
});
