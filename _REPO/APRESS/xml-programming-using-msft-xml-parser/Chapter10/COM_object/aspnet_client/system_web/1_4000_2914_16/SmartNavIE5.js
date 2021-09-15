<!------------------------------------------------------------------------
//
//  Copyright 2000 Microsoft Corporation.  All Rights Reserved.
//
//  File:         SmartNavie5.js
//
//  Description:  this file implements a smart navigation mecanism for IE5.0
//
//----------------------------------------------------------------------->

var __smartnav_debug = false;
if (__smartnav_debug == true)
{
    document.all["__hifSmartNav"].style.width = "100%";
    document.all["__hifSmartNav"].style.height = "30%";
    document.all["__hifSmartNav"].style.display = "";
}
if (window.__smartNav == null &&  (window.parent.__smartNav == null
                || window.parent.frames["__hifSmartNav"] != window))
{
    window.__smartNav = new Object();
    window.__smartNav.hif = document.all("__hifSmartNav");
    window.__smartNav.siHif = window.__smartNav.hif.sourceIndex;
    window.__smartNav.update = function()
    {
        if (    window.__smartNav.xmli.XMLDocument.readyState < 4
            ||  window.__smartNav.updated == true)
            return;
        window.__smartNav.updated = true;
        try { fd = frames["__hifSmartNav"].document; } catch (e) {return;}

        var fdurl = fd.location.href;
        var fdurlb = fdurl.split("?")[0];
        if (document.location.href.indexOf(fdurlb) < 0)
        {
            document.location.href=fdurl;
            return;
        }

        var hdm = document.getElementsByTagName("head")[0];
        var hk = hdm.childNodes;
        for (var i = hk.length - 1; i>= 0; i--)
        {
            if (hk[i].tagName != "BASEFONT" || hk[i].innerHTML.length == 0)
                hdm.removeChild(hdm.childNodes[i]);
        }
        var kids = fd.getElementsByTagName("head")[0].childNodes;
        for (var i = 0; i < kids.length; i++)
        {
            var tn = kids[i].tagName;
            var k = document.createElement(tn);
            k.id = kids[i].id;
            switch(tn)
            {
            case "TITLE":
                k.innerText = kids[i].text;
                hdm.insertAdjacentElement("afterbegin", k);
                continue;
            case "BASEFONT" :
                if (kids[i].innerHTML.length > 0)
                    continue;
                k.mergeAttributes(kids[i]);
                break;
            default:
                var o = document.createElement("BODY");
                o.innerHTML = "<BODY>" + kids[i].outerHTML + "</BODY>";
                k = o.firstChild;
                k.mergeAttributes(kids[i]);
                break;
            }
            hdm.appendChild(k);
        }

        var colSelect = document.body.getElementsByTagName("SELECT");
        for (var i = 0; i < colSelect.length; i ++)
            colSelect[i].removeNode(true);

        var obody = document.body;
        window.__smartNav.sHif = window.__smartNav.hif;
        obody.insertAdjacentElement("beforeBegin", window.__smartNav.hif);
        obody.innerHTML = fd.body.innerHTML;
        obody.mergeAttributes(fd.body);
        window.setTimeout(window.__smartNav.restoreFocus, 0);
        
        obody.onload = fd.body.onload;
        if (obody.onload != null)
            window.onload();
        window.__smartNav.attachForm();
    };

    window.__smartNav.restoreFocus = function()
    {
        window.detachEvent("onload", window.__smartNav.restoreFocus);
        var ae = document.all(window.__smartNav.ae);
        if (ae == null) return;
        try { ae.focus(); } catch(e){};
    }

    window.__smartNav.saveHistory = function()
    {
        if (window.__smartNav.sHif != null)
        {
            if (window.__smartNav.hif != null)
                window.__smartNav.hif.parentElement.removeChild(window.__smartNav.hif);
            document.all[window.__smartNav.siHif].insertAdjacentElement(
                        "beforeBegin", window.__smartNav.sHif);
        }
    }

    window.__smartNav.init = function()
    {
        try { if (window.event.returnValue == false) return;} catch(e) {}
        var ae = document.activeElement.id;
        if (ae.length == 0)
            ae = document.activeElement.name;
        window.__smartNav.ae = ae;
        var hif = window.__smartNav.sHif;
        try { if (hif) hif.parentElement.removeChild(hif);} catch(e){}
        window.__smartNav.hif = document.all["__hifSmartNav"];
        if (window.__smartNav.hif.tagName != "IFRAME")
            window.__smartNav.hif = window.__smartNav.hif[0];
        window.__smartNav.updated = false;
    };

    window.__smartNav.submit = function()
    {
        window.__smartNav.init();
        window.__smartNav.form._submit();
    };

    window.__smartNav.attachForm = function()
    {
        var cf = document.forms;
        for (var i=0; i<cf.length; i++)
        {
            if (cf[i].__smartNavEnabled != null)
            {
                window.__smartNav.form = cf[i];
                break;
            }
        }

        if (window.__smartNav.form == null)
            return false;

        var sft = window.__smartNav.form.target;
        if (sft.length != 0 && sft != "__hifSmartNav") return false;

        var sfc = window.__smartNav.form.action.split("?")[0];
        var url = window.location.href.split("?")[0];
        if (url.lastIndexOf(sfc) + sfc.length != url.length) return false;
        if (window.__smartNav.form.__formAttached == true) return true;

        window.__smartNav.form.__formAttached = true;
        window.__smartNav.form.attachEvent("onsubmit", window.__smartNav.init);
        window.__smartNav.form._submit = window.__smartNav.form.submit;
        window.__smartNav.form.submit = window.__smartNav.submit;
        window.__smartNav.form.target = "__hifSmartNav";
        return true;
    };

    window.__smartNav.sFn = "if (document.readyState != 'complete')"
               + "return;"
               + "var wpd = window.parent.document;"
               + "var xmli = wpd.createElement('XML');"
               + "wpd.body.appendChild(xmli);"
               + "window.parent.__smartNav.xmli = xmli;"
               + "xmli.onreadystatechange=window.parent.__smartNav.update;"
               + "xmli.src = '';";

    var rc = window.__smartNav.attachForm();
    if (rc)
        window.attachEvent("onbeforeunload", window.__smartNav.saveHistory);
    else
        window.__smartNav = null;
}


if (window.parent != window && window.parent.__smartNav != null
    && window.parent.frames["__hifSmartNav"] == window)
{
    var f = new Function(window.parent.__smartNav.sFn);
    document.attachEvent("onreadystatechange", f);
}

