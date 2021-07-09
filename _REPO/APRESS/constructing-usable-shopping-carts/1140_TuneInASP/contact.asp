<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Order Page - Template Wireframe</title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>

<body>
<form name="form1" method="post" action="" enctype="multipart/form-data">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" colspan="2">
	  <!--Breadcrumb trail goes here-->
		<!--#include file="include\breadcrumb.asp"-->
	</td>
	<td bgcolor="#CCCCCC" align="right">
		<!--search goes here-->
		<!--#include file="include\search.asp"-->
      </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td valign="top" align="left" width="120" bgcolor="#CCCCCC"> 
	  <!--Navigation goes here -->
        <div class="tunein"> 
			TuneIn!<br>
			<hr width="80" align="center" noshade>
		</div>
        <!-- navigation goes here-->
		<!--#include file="include\navigation.asp"-->

	</td>
    <td valign="top"> 
		<h1>Jake Mandell</h1>
        <h2>Best Seller</h2>
        <p>Lorem 
              ipsum dolor sit amet consectateur nonummy lorenzino. Interdum volgus 
              videt, est ubi peccat. Si veteres ita miratur laudatque poetas, 
              ut nihil anteferat, nihil illis comparet, errat. Si quaedam nimis 
              antique, si peraque dure dicere credit eos, ignave multa fatetur, 
              et sapit et mecum facit et Iova iudicat aequo.</p>
	 	<table width="40%" cellspacing=0 cellpadding=0>
			<tr>
				<td class="OrderItemDetail" ><!--products go here-->
					CD<input type="radio" name="radiobutton" value="radiobutton" checked><br>
					Tape<input type="radio" name="radiobutton" value="radiobutton"><br>
					LP<input type="radio" name="radiobutton" value="radiobutton"><br>
				</td>
				<td valign="middle">
					<input type="submit" name="Submit2" value="Add to Cart">
				</td>
			</tr>
		</table>

    </td>
      <td valign="top" align="right" width=200> 
        <table border="1" cellspacing="0" cellpadding="0">
          <tr> 
            <td bgcolor="#CCCCCC"> 
			<!-- Shopping Cart Include Goes Here -->
            <!-- #include file="include\cartinfo.asp" -->  
        </td>
      </tr>
    </table>
	</td>
	</tr>
	</table>
</form>
</body>
</html>
<!-- include virtual="include/deconfig.asp" -->