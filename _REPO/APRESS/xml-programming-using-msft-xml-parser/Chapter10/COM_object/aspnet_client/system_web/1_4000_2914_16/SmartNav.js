<!------------------------------------------------------------------------
//
//  Copyright 2000 Microsoft Corporation.  All Rights Reserved.
//
//  File:         SmartNav.js
//
//  Description:  this file implements a smart navigation mecanism
//
//----------------------------------------------------------------------->

if (window.__smartNav == null)
{
    window.__smartNav = new Object();
    window.__smartNav.update = function()
    {
        var fd;
        window.__smartNav.inPost = false;
        try { fd = frames["__hifSmartNav"].document; } catch (e) {return;}
        var fdr = fd.getElementsByTagName("asp_smartnav_rdir");
        if (fdr.length > 0)
        {
            if (window.__smartNav.sHif == null)
            {
                window.__smartNav.sHif = document.createElement("IFRAME");
                window.__smartNav.sHif.name = "__hifSmartNav";
                window.__smartNav.sHif.style.display = "none";
            }
            try {window.location = fdr[0].url;} catch (e) {};
            return;
        }
        var fdurl = fd.location.href;
        var fdurlb = fdurl.split("?")[0];
        if (document.location.href.indexOf(fdurlb) < 0)
        {
            document.location.href=fdurl;
            return;
        }
        var fd = frames["__hifSmartNav"].document;
        var hdm = document.getElementsByTagName("head")[0];
        var hk = hdm.childNodes;
        var tt = null;
        for (var i = hk.length - 1; i>= 0; i--)
        {
            if (hk[i].tagName == "TITLE")
            {
                tt = hk[i].outerHTML;
                continue;
            }
            if (hk[i].tagName != "BASEFONT" || hk[i].innerHTML.length == 0)
                hdm.removeChild(hdm.childNodes[i]);
        }
        var kids = fd.getElementsByTagName("head")[0].childNodes;
        for (var i = 0; i < kids.length; i++)
        {
            var tn = kids[i].tagName;
            var k = document.createElement(tn);
            k.id = kids[i].id;
            k.mergeAttributes(kids[i]);
            switch(tn)
            {
            case "TITLE":
                if (tt == kids[i].outerHTML)
                    continue;
                k.innerText = kids[i].text;
                hdm.insertAdjacentElement("afterbegin", k);
                continue;
            case "BASEFONT" :
                if (kids[i].innerHTML.length > 0)
                    continue;
                break;
            default:
                var o = document.createElement("BODY");
                o.innerHTML = "<BODY>" + kids[i].outerHTML + "</BODY>";
                k = o.firstChild;
                break;
            }
            hdm.appendChild(k);
        }
        document.body.mergeAttributes(fd.body);
        var ol= fd.body.onload;
        var s = fd.body.innerHTML;
        if (window.__smartNav.hif != null)
        {
            var hifP = window.__smartNav.hif.parentElement;
            if (hifP != null)
                window.__smartNav.sHif=hifP.removeChild(window.__smartNav.hif);
        }
        document.body.innerHTML = s;
        var sc = document.scripts;
        for (var i = 0; i < sc.length; i++)
        {
            sc[i].text = sc[i].text;
        }
        window.__smartNav.hif = document.all("__hifSmartNav");
        try { eval(ol); } catch (e) {};
        window.setTimeout(window.__smartNav.restoreFocus, 0);
        window.__smartNav.attachForm();
    };

    window.__smartNav.restoreFocus = function()
    {
        if (window.__smartNav.inPost == true)
            return;
        frames["__hifSmartNav"].document.designMode = "On";
        if (window.__smartNav.ae == null) return;
        var ae = document.all(window.__smartNav.ae);
        if (ae == null) return;
        try { ae.focus(); } catch(e){};
    }

    window.__smartNav.saveHistory = function()
    {
        if (window.__smartNav.hif != null)
            window.__smartNav.hif.removeNode();
        if (window.__smartNav.sHif != null)
            document.all[window.__smartNav.siHif].insertAdjacentElement(
                        "BeforeBegin", window.__smartNav.sHif);
    }

    window.__smartNav.init =  function()
    {
        window.__smartNav.inPost = true;
        try { if (window.event.returnValue == false) return;} catch(e) {}
        if (document.activeElement != null)
        {
            var ae = document.activeElement.id;
            if (ae.length == 0)
                ae = document.activeElement.name;
            window.__smartNav.ae = ae;
        }
        else
            window.__smartNav.ae = null;

        if (window.__smartNav.hif == null)
            window.__smartNav.hif = document.all("__hifSmartNav");

        var hif = window.__smartNav.hif;
        hif.detachEvent("onload", window.__smartNav.update);
        hif.attachEvent("onload", window.__smartNav.update);
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
        
        if (window.__smartNav.form == null) return false;
        
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

    var rc = window.__smartNav.attachForm();
    if (rc)
    {
        var hif = document.all("__hifSmartNav");
        frames["__hifSmartNav"].document.designMode = "On";
        window.__smartNav.siHif = hif.sourceIndex;
        try {
            if (    frames["__hifSmartNav"] != null
                &&  frames["__hifSmartNav"].document.location != "about:blank")
            {
                hif.attachEvent("onload",window.__smartNav.update);
                window.__smartNav.hif = hif;
            }
        }
        catch (e) { window.__smartNav.hif = hif; }
        window.attachEvent("onbeforeunload", window.__smartNav.saveHistory);
    }
    else
        window.__smartNav = null;
}

