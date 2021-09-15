YUI.add("extension-view-parent", function(Y) {
    "use strict";
    
    var ViewParent = function() {};
    
    ViewParent.ATTRS = {
        children : null
    };
    
    ViewParent.prototype = {
        
        initializer: function() {
            this._viewParentHandles = [
                this.on("childrenChange", this._childrenChange, this),
                
                Y.Do.after(this.renderChildren, this, "render", this)
            ];
            
            // start off with initial state
            this._childrenChange({
                newVal : this.get("children")
            });
        },
        
        destructor: function() {
            Y.Object.each(this.get("children"), function(view) {
                view.destroy();
            });
            
            new Y.EventTarget(this._viewParentHandles).detach();
            
            this._viewParentHandles = null;
        },
        
        renderChild: function(name, view) {
            var node = this.get("container").one("[data-child=\"" + name + "\"]");
            
            if(!node) {
                return;
            }
                
            view.render();
            
            node.replace(
                view.get("container").addClass("child " + name + " " + node.get("className"))
            );
        },
        
        renderChildren: function() {
            var children = this.get("children"),
                child;
            
            if(!children) {
                return;
            }
                
            this.get("container").addClass("parent");
                
            for(child in children) {
                this.renderChild(child, children[child]);
            }
        },
        
        _childrenChange: function(e) {
            var self = this;
            
            Y.Object.each(e.newVal, function(child) {
                // already stamped, bail
                if("_viewparentchild" in child) {
                    return;
                }
                
                child._viewparentchild = true;
                
                child.set("parent", self);
                child.addTarget(self);
            });
        }
    };
    
    Y.namespace("Extensions").ViewParent = ViewParent;
    
}, "@VERSION@", {
    requires: [
        // YUI
        "view",
        "event-custom"
    ]
});
