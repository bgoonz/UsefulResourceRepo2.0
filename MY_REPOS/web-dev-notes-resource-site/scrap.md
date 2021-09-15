// Script for html files in the left frame (folders only)
/FOLDER_HREF_APPEND
target="rframe"
/FOLDER_FILE_LINK
right.html
// Everything after this is unrelated to frames, it's a generic dirhtml script
/HEAD
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"
        type="text/css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bgoonz/blob/master/gradient.css">
<style type="text/css">
.centered {margin: auto}
        html {
            box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
BODY {background-color: #F1F1F2;
 background: linear-gradient(-45deg, #da0000, #0008ffe5, #23d5a2d8, #2f2fbce5);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
            -ms-overflow-style: scrollbar;
    zoom:0.73;
}

@-webkit-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
TABLE.file-table {  background: linear-gradient(
  -45deg, #da0000, #0008ffe5, #23d5a2d8, #2f2fbce5);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite; font:0.75em Arial, Helvetica, sans-serif;}
TABLE.file-table TD {color:#5A666E; padding:2px; border-top:1px solid #FFF; border-left:1px solid #FFF;
 border-bottom:1px solid #AFB5B8; border-right:1px solid #AFB5B8; text-align: center}
TABLE.file-table TH { background-color:#AAB0B5; color:#EDEFF0; padding:2px; text-align:center;
 border-top:1px solid #93A1AA; border-left:1px solid #93A1AA; border-bottom:1px solid #2F3B42;
 border-right:1px solid #2F3B42;}
TABLE.file-table TR:hover {outline: 1px solid #336600; }
TABLE.file-table TD a {color: #292E32; text-decoration:none; color: #292E32;}
TABLE.file-table TD a:visited {color: #626B73}
TABLE.file-table td a:hover {color: #FFF; background: #2B3154 }
TABLE.file-table th a { color:#FFF; text-decoration:none; font-weight:bold; }
TABLE.file-table TR.row2 { background-color: #E6E8E9;}
TABLE.file-table TD.header-row {background-color: #39536B; color: #FFF; text-align: center; font-weight:bold; font-size: medium;
 border-top:1px solid #93A1AA; border-left:1px solid #93A1AA; border-bottom:1px solid #2F3B42;
 border-right:1px solid #2F3B42;}
TABLE.file-table TD.anchor_table_td {text-align: center}
TABLE.file-table TD.anchors {font-weight: bold; border-top: 0px solid; text-align: center;
   border-bottom: 1px solid; background-color:#4B5D6D; color:#D7DBDD; border-color: #EEE;
   line-height: 1.05; font-size: medium;
   border-top:1px solid #93A1AA; border-left:1px solid #93A1AA; border-bottom:1px solid #2F3B42;
   border-right:1px solid #2F3B42;}
TABLE.file-table TD.notes-color {background-color: #76838E; color: #d7dbdd;
border-top:1px solid #93A1AA; border-left:1px solid #93A1AA; border-bottom:1px solid #2F3B42;
   border-right:1px solid #2F3B42;}
</style>
/HEADER_STYLE
class="header-row"
/TABLEHEADER
<table border="0" cellspacing="1" cellpadding="2" summary="file table" class="file-table centered">
/ANCHOR_TD
class="anchors"
/FILE_TABLE_ROW2
class="row2"
/FOLDER_TABLE_HEADER
<table border="0" cellspacing="1" cellpadding="2" summary="file table" class="file-table centered">
/FOLDER_TABLE_ROW2
class="row2"
/ANCHOR_TABLE_HEADER
<table border="0" cellspacing="1" cellpadding="2" summary="file table" class="file-table centered">
/ANCHOR_TABLE_ROW2
class="row2"
/SUMMARY_STYLE
style="font:0.75em Arial, Helvetica, sans-serif;"
/ANCHOR_TABLE_TD
class="anchor_table_td"
/ANCHOR
%%FILEdescription.txt%
