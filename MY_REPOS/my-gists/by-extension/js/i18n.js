(function(){ window.i18n || (window.i18n = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.sv=function(n){return n===1?"one":"other"}
var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return p[d[k]]||p[MessageFormat.locale[l](d[k]-o)]||p.other},
s=function(d,k,p){c(d);return p[d[k]]||p.other};
window.i18n["en"] = {}
window.i18n["en"]["weekday_n"] = function(d){return p(d,"N",0,"sv",{"0":"Sunday","1":"Monday","2":"Tuesday","3":"Wednesday","4":"Thursday","5":"Friday","6":"Saturday","other":"???"})}
window.i18n["en"]["month_n"] = function(d){return p(d,"N",0,"sv",{"0":"January","1":"February","2":"March","3":"April","4":"May","5":"June","6":"July","7":"August","8":"September","9":"October","10":"November","11":"December","other":"???"})}
window.i18n["en"]["time_diff"] = function(d){return v(d,"T")+" "+p(d,"T_UNIT",0,"sv",{"0":"seconds","1":"minutes","2":"hours","3":"days","4":"weeks","5":"months","6":"years","other":"???"})+" "+s(d,"T_PAST",{"true":"ago","other":"from now"})}
window.i18n["en"]["no_id"] = function(d){return "No ID set! Please assign konopas_set.id a unique identifier."}
window.i18n["en"]["old_browser"] = function(d){return "Unfortunately, your browser doesn't support some of the Javascript features required by KonOpas. To use, please try a different browser."}
window.i18n["en"]["private_mode"] = function(d){return "It looks like you're using an iOS or Safari browser in private mode, which disables localStorage. This will result in a suboptimal KonOpas experience."}
window.i18n["en"]["next_ended"] = function(d){return "There are no more program items scheduled."}
window.i18n["en"]["next_start"] = function(d){return "The next program item starts in "+p(d,"H",0,"sv",{"0":"","one":"one hour and","other":n(d,"H")+" hours and"})+" "+p(d,"M",0,"sv",{"one":"one minute","other":n(d,"M")+" minutes"})+" after the set time."}
window.i18n["en"]["star_export"] = function(d){return "<p>Your current selection is encoded in <a href=\""+v(d,"THIS")+"\" target=\"_blank\">this page's URL</a>, which you may open elsewhere to share your selection.<p>For easier sharing, you can also generate a <a href=\""+v(d,"SHORT")+"\">shorter link</a> or a <a href=\""+v(d,"QR")+"\">QR code</a>."}
window.i18n["en"]["star_import"] = function(d){return "<p>Your previously selected items are shown with a highlighted interior, while those imported via <a href=\""+v(d,"THIS")+"\">this link</a> have a highlighted border.<p>Your previous selection "+p(d,"PREV",0,"sv",{"0":"was empty","one":"had one item","other":"had "+n(d,"PREV")+" items"})+", and the imported selection has "+p(d,"NEW",0,"sv",{"0":"no new items","one":"one new item","other":n(d,"NEW")+" new items"})+p(d,"SAME",0,"sv",{"0":"","one":"and one which was already selected","other":"and "+n(d,"SAME")+" which were already selected"})+". "+p(d,"BAD",0,"sv",{"0":"","one":"One of the imported items had an invalid ID.","other":n(d,"BAD")+" of the imported items had invalid IDs."})}
window.i18n["en"]["star_set"] = function(d){return "Set my selection to the imported selection</a>"}
window.i18n["en"]["star_add"] = function(d){return "Add the "+p(d,"N",0,"sv",{"one":"new item","other":n(d,"N")+" new items"})+" to my selection</a>"}
window.i18n["en"]["star_export_link"] = function(d){return "<a href=\""+v(d,"URL")+"\">Export selection</a> ("+p(d,"N",0,"sv",{"one":"one item","other":n(d,"N")+" items"})+")"}
window.i18n["en"]["star_hint"] = function(d){return "<p>To \"star\" a program item, click on the gray square next to it. Your selections will be remembered, and shown in this view. You currently don't have any program items selected, so this list is empty."}
window.i18n["en"]["filter_sum_id"] = function(d){return "Listing "+p(d,"N",0,"sv",{"one":"one item: <a href=\""+v(d,"URL")+"\">"+v(d,"TITLE")+"</a>","other":n(d,"N")+" items with id <a href=\""+v(d,"URL")+"\">"+v(d,"ID")+"</a>"})}
window.i18n["en"]["filter_sum"] = function(d){return "Listing "+s(d,"ALL",{"true":"<b>all</b>","other":""})+" "+p(d,"N",0,"sv",{"one":"one "+v(d,"TAG")+" item","other":n(d,"N")+" "+v(d,"TAG")+" items"})+" "+s(d,"GOT_DAY",{"true":"on <b>"+v(d,"DAY")+"</b>","other":""})+" "+s(d,"GOT_AREA",{"true":"in <b>"+v(d,"AREA")+"</b>","other":""})+" "+s(d,"GOT_Q",{"true":"matching the query <b>"+v(d,"Q")+"</b>","other":""})}
window.i18n["sv"] = {}
window.i18n["sv"]["weekday_n"] = function(d){return p(d,"N",0,"sv",{"0":"Söndag","1":"Måndag","2":"Tisdag","3":"Onsdag","4":"Torsdag","5":"Fredag","6":"Lördag","other":"???"})}
window.i18n["sv"]["month_n"] = function(d){return p(d,"N",0,"sv",{"0":"januari","1":"februari","2":"mars","3":"april","4":"maj","5":"juni","6":"juli","7":"augusti","8":"september","9":"oktober","10":"november","11":"december","other":"???"})}
window.i18n["sv"]["time_diff"] = function(d){return v(d,"T")+" "+p(d,"T_UNIT",0,"sv",{"0":"sekunder","1":"minuter","2":"timmar","3":"dagar","4":"veckor","5":"månader","6":"år","other":"???"})+" "+s(d,"T_PAST",{"true":"sedan","other":"från nu"})}
window.i18n["sv"]["just now"] = function(d){return "just nu"}
window.i18n["sv"]["Expand all items"] = function(d){return "Expandera alla punkter"}
window.i18n["sv"]["Collapse all items"] = function(d){return "Minimera alla punkter"}
window.i18n["sv"]["Photo"] = function(d){return "Bild"}
window.i18n["sv"]["no_id"] = function(d){return "ID saknas! Ge konopas_set.id en unik identifierare."}
window.i18n["sv"]["old_browser"] = function(d){return "Tyvärr hanterar din webbläsare inte några av de JavaScript-funktioner som KonOpas behöver. Du behöver använda en annan webbläsare."}
window.i18n["sv"]["private_mode"] = function(d){return "Det verkar som du använder webbläsaren i privat läge, vilket stänger av den lokala lagringen (localStorage). Detta gör att KonOpas inte fungerar optimalt."}
window.i18n["sv"]["next_ended"] = function(d){return "Det finns inga fler planerade programpunkter."}
window.i18n["sv"]["next_start"] = function(d){return "Nästa programpunkt börjar om "+p(d,"H",0,"sv",{"0":"","one":"en timme och","other":n(d,"H")+" timmar och"})+" "+p(d,"M",0,"sv",{"one":"en minut","other":n(d,"M")+" minuter"})+" efter den angivna tiden."}
window.i18n["sv"]["star_export"] = function(d){return "<p>Dina aktuella stjärnmarkeringar är lagrade i <a href=\""+v(d,"THIS")+"\" target=\"_blank\">adressen till denna sida</a>, som du kan öppna på en annan plats och dela med dig av.<p>Dela enklare med en <a href=\""+v(d,"SHORT")+"\">kortare länk</a> eller en <a href=\""+v(d,"QR")+"\">QR-kod</a>."}
window.i18n["sv"]["star_import"] = function(d){return "<p>Dina tidigare stjärnmarkerade punkter har ett markerat innanmäte, medan de som importerats via <a href=\""+v(d,"THIS")+"\">denna länk</a> har en markerad kant.<p>Din tidigare markering "+p(d,"PREV",0,"sv",{"0":"var tom","one":"innehöll en punkt","other":"hade "+n(d,"PREV")+" punkter"})+", och den importerade markeringen har "+p(d,"NEW",0,"sv",{"0":"inga nya punkter","one":"en ny punkt","other":n(d,"NEW")+" nya punkter"})+" "+p(d,"SAME",0,"sv",{"0":"","one":"och en som redan var markerad","other":"och "+n(d,"SAME")+" som redan var markerade"})+". "+p(d,"BAD",0,"sv",{"0":"","one":"En av de importerade punkterna hade ett ogiltiga ID.","other":n(d,"BAD")+" av de importerade punkterna hade ogiltiga IDs."})}
window.i18n["sv"]["star_set"] = function(d){return "Ändra mina markeringar till de importerade markeringarna</a>"}
window.i18n["sv"]["star_add"] = function(d){return "Lägg till "+p(d,"N",0,"sv",{"one":"ny punkt","other":n(d,"N")+" nya punkter"})+" till min markering</a>"}
window.i18n["sv"]["star_export_link"] = function(d){return "<a href=\""+v(d,"URL")+"\">Exportera markering</a> ("+p(d,"N",0,"sv",{"one":"en punkt","other":n(d,"N")+" punkter"})+")"}
window.i18n["sv"]["star_hint"] = function(d){return "<p>”Stjärnmarkera” en programpunkt genom att klocka på den grå fyrkanten bredvid den. Dina markeringar lagras och visas i denna vy. Du har inte markerat några programpunkter än, så listan är för närvarande tom."}
window.i18n["sv"]["filter_sum_id"] = function(d){return "Visar "+p(d,"N",0,"sv",{"one":"en punkt: <a href=\""+v(d,"URL")+"\">"+v(d,"TITLE")+"</a>","other":n(d,"N")+" punkter med id <a href=\""+v(d,"URL")+"\">"+v(d,"ID")+"</a>"})}
window.i18n["sv"]["filter_sum"] = function(d){return "Visar "+s(d,"ALL",{"true":"<b>alla</b>","other":""})+" "+p(d,"N",0,"sv",{"one":"en "+v(d,"TAG")+" punkt","other":n(d,"N")+" "+v(d,"TAG")+" punkter"})+" "+s(d,"GOT_DAY",{"true":"på <b>"+v(d,"DAY")+"</b>","other":""})+" "+s(d,"GOT_AREA",{"true":"i <b>"+v(d,"AREA")+"</b>","other":""})+" "+s(d,"GOT_Q",{"true":"stämmer med sökningen <b>"+v(d,"Q")+"</b>","other":""})}
})();