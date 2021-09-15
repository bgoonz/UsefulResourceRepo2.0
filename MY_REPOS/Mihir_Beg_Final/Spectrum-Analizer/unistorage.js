function LS()
{
    try
    {
        if (localStorage)
        {
            const test = "test" + new Date().valueOf();
            try
            {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            }
            catch(e)
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    catch (X)
    {
        return false;
    }
}


function DataExists(name)
{
    if (LS())
    {
        if (localStorage[name])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        if (document.cookie !== "")
        {
            const cookies = document.cookie.split(/; */);

            for (let i=0; i<cookies.length; i++)
            {
                const cookieName = cookies[i].split("=")[0];
                const cookieVal = cookies[i].split("=")[1];
                if (cookieName === decodeURIComponent(name))
                {
                    return true;
                }
            }
        }
        return false;
    }
}

function DataGet(name)
{
    if (LS())
    {
        return(localStorage.getItem(name));
    }
    else
    {
        if (document.cookie !== "")
        {
            const cookies = document.cookie.split(/; */);

            for (let i=0; i<cookies.length; i++)
            {
                const cookieName = cookies[i].split("=")[0];
                const cookieVal = cookies[i].split("=")[1];
                if (cookieName === decodeURIComponent(name))
                {
                    return decodeURIComponent(cookieVal);
                }
            }
        }
    }
}


function DataSet(name, val)
{
    if (LS())
    {
        localStorage.setItem(name, val);
    }
    else
    {
        const cookieName = encodeURIComponent(name);
        const cookieVal = encodeURIComponent(val);
        let cookieText = cookieName + "=" + cookieVal;

        const data = new Date(2099, 1, 1, 0, 0, 0, 0);
        cookieText += "; expires=" + data.toGMTString();

        document.cookie = cookieText;
    }
}

function DataDelete(name)
{
    if (DataExists(name))
    {
        if (LS())
        {
            localStorage.removeItem(name)
        }
        else
        {
            const cookieName = encodeURIComponent(name);
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        }
    }
}

function DataRaw()
{
    if (LS())
    {
        var raw = "";
        for (var item in localStorage)
        {
            raw += (item + "=" + localStorage.getItem(item) + "\n" );
        }
        return raw;
    }
    else
    {
        return document.cookie;
    }
}

function DataClear()
{
    if (LS())
    {
        localStorage.clear();
    }
    else
    {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
        {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}

function DataSetI(name, val)
{
    DataSet(name, val);
}

function DataGetI(name)
{
    return parseInt(DataGet(name));
}

function DataSetB(name, val)
{
    DataSet(name, val ? "1" : "0");
}

function DataGetB(name)
{
    return (DataGet(name) == "1");
}

function DataGetDefault(name, val)
{
    if (DataExists(name))
    {
        return DataGet(name);
    }
    else
    {
        return val;
    }
}

function DataGetIDefault(name, val)
{
    if (DataExists(name))
    {
        return DataGetI(name);
    }
    else
    {
        return val;
    }
}

function DataGetBDefault(name, val)
{
    if (DataExists(name))
    {
        return DataGetB(name);
    }
    else
    {
        return val;
    }
}
