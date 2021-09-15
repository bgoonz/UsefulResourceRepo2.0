<?php
$filename = $basepath . "../input.markdown";
$handle = fopen($filename, "rw");

if(isset($_POST['content'])){
  $c=stripslashes($_POST['content']);
  if(file_put_contents($filename, $c)){
  }
}

$content = fread($handle, filesize($filename));
fclose($handle);

?><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
  <head>
    <title>online markdown editor</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<link type="text/css" rel="stylesheet" href="<?php echo $basepath ?>wmd/docs/wmd.css"/>
  <link type="text/css" rel="stylesheet" href="<?php echo $basepath ?>screen.css"/>
  <link type="text/css" rel="stylesheet" href="<?php echo $basepath ?>preview.css"/>  
	<script type="text/javascript" src="<?php echo $basepath ?>wmd/lib/showdown.js"></script>
	<script type="text/javascript" src="<?php echo $basepath ?>wmd/docs/wmd.js"></script>    

    <script type="text/javascript">
	window.onload = function() {
	    new WMD("input", "toolbar", { preview: "preview" });
	};
    </script>
    
  </head>
  <body class="<?php echo $pagetype ?>">


  <div class="pg">
    <div class="bd">
      <div class="editor">
        <form method="POST" action="index.php">
	        <div id="toolbar" class="wmd-toolbar"></div>
	        <textarea name="content" id="input" class="wmd-input" rows="20" cols="100"><?php echo $content ?></textarea>
          <input type="submit" value="Save" />
        </form>
	    </div>
	    
            <?php echo $before_preview ?>
	    <div id="preview" class="wmd-preview"></div>
    </div>  
  </div>

  </body>
</html>

