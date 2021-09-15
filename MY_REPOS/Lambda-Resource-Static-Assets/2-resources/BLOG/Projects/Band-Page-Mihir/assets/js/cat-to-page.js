/**
=== Grid WUD ===
Contributors: wistudat.be
Plugin Name: category-to-pages-wud
Author: Danny WUD
Author URI: https://wud-plugins.com
 */
 jQuery(document).ready(function($){

//Load page action
if ($('#cattopage_wud_split_').is("-")){
		$(".cattopage_wud_items").show();
	}
	else{
		$(".cattopage_wud_items").hide();
	}

	
//Milisec var per button 	
	var cct = 0 ; 
	
//Load click value
    $("a[ClickResult]").click(function() {
        cct = $(this).attr("ClickResult") ;
    });	
	
//Click action 
	$('.cattopage_wud_split').click(function(){
		var $this = $(this);
		$this.toggleClass('cattopage_wud_split');
		if($this.hasClass('cattopage_wud_split')){
			$("#cattopage_wud_split_"+cct).hide();
		} else {
			$("#cattopage_wud_split_"+cct).show();
		}
	});
	
});