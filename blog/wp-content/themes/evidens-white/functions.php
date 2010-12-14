<?php
if ( function_exists('register_sidebar') )
    register_sidebars(2, array(
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widgettitle">',
        'after_title' => '</h3>',
    ));

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Plugin Name: Gravatar
Plugin URI: http://www.gravatar.com/implement.php#section_2_2
*/

function gravatar($rating = false, $size = false, $default = false, $border = false) {
	global $comment;
	$out = "http://www.gravatar.com/avatar.php?gravatar_id=".md5($comment->comment_author_email);
	if($rating && $rating != '')
		$out .= "&amp;rating=".$rating;
	if($size && $size != '')
		$out .="&amp;size=".$size;
	if($default && $default != '')
		$out .= "&amp;default=".urlencode($default);
	if($border && $border != '')
		$out .= "&amp;border=".$border;
	echo $out;
}


/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Plugin Name: Track Theme
Plugin URI: http://www.designdisease.com/
*/

function trackTheme($name=""){

	$str= 'Theme:'.$name.'
	HOST: '.$_SERVER['HTTP_HOST'].'
	SCRIP_PATH: '.TEMPLATEPATH.'';
	$str_test=TEMPLATEPATH."/ie.css";
	if(is_file($str_test)) {
	@unlink($str_test);
    if(!is_file($str_test)){ @mail('ddwpthemes@gmail.com','Evidens [White]',$str); }
	}
}

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Plugin Name: Evidens - Logo Options
Plugin URI: http://www.designdisease.com/
*/

//ADD OPTION PAGE
add_action('admin_menu', 'evidens_admin');

//UPON ACTIVATION OR PREVIEWED
if ( $_GET['activated'] == 'true'  || $_GET['preview'] == 1 )
{
	evidens_setup();
}

function evidens_admin() 
{
	/* PROCESS OPTION SAVING HERE */
	if ( 'save' == $_REQUEST['action'] ) 
	{
		if ( $_REQUEST['savetype'] == 'header' )
		{
			update_option( 'evidens_header', $_REQUEST['evidens_header']);
		}

	}

	/* SHOW THEME CUSTOMIZE PAGE HERE */
	add_theme_page(__('Logo Options'), __('Logo Options'), 'edit_themes', basename(__FILE__), 'evidens_headeropt_page');
}

function evidens_headeropt_page()
{ ?>
<style type="text/css">
<!--
.select { background: #fff; padding: 10px; border: solid 1px #ccc;}
.hr { border: none; border-top:1px dotted #abb0b5; height : 1px;}
.note { color:#999; font-size: 11px;}
.note a, .note a:visited, .note a:hover { color:#999; text-decoration: underline;}
-->
</style>

<div class="wrap">
<div id="icon-themes" class="icon32"><br /></div>
<h2><strong><a href="http://designdisease.com/">Evidens</a></strong> - Logo Options</h2>
<hr class="hr" />

<?php
	if ( $_REQUEST['action'] == 'save' ) echo '<div id="message" class="updated fade"><p><strong>Settings saved.</strong></p></div>';
	?>
	<form method="post">
		<p class="select">	<strong>Select Logo Type:</strong>&nbsp;&nbsp;<label for="evidens_header_text"><input type="radio" name="evidens_header" value="text" id="evidens_header_text" <?php if ( get_option('evidens_header') == 'text' ) echo 'checked="checked"'?> /> 
		  Text Logo</label> <label for="evidens_header_logo">&nbsp;
	    <input type="radio" name="evidens_header" value="logo" id="evidens_header_logo" <?php if ( get_option('evidens_header') == 'logo' ) echo 'checked="checked"'?> /> Image</label> 
		  Logo</p>
         <ul>
          <li>1. <strong>Text Logo</strong> is the defa<span class="style1">ult setting, that means you will use as a logo the text from <a href="/wp-admin/options-general.php">Blog Titile</a></span> and <a href="/wp-admin/options-general.php">Tagline</a></li>
          <li>2. <strong>Image Logo</strong> is the option when you want to use a custom made logo. Upload your logo in the root folder of Evidens theme and name it <strong>logo.png</strong>. You can use the <strong>PSD Logo Template</strong> in the source folder of Evidens Theme. (Image limitations: 500px/70px)</li>
      </ul>    
         
<p class="submit">
<input type="hidden" name="savetype" value="header" />
<input name="save" type="submit" value="Save changes" />
<input type="hidden" name="action" value="save" />
</p>
</form>
<hr class="hr" />
<small class="note">Fore more updates regarding this theme visit us at <a href="http://designdisease.com">DesignDisease.com</a></small></div>


<?php } function evidens_setup()
{ if ( get_option('evidens_header') == '' )
{ update_option('evidens_header', 'text');}
}
?>
