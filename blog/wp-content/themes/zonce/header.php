<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-7638418-3']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script');
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 
        'http://www') + '.google-analytics.com/ga.js';
    ga.setAttribute('async', 'true');
    document.documentElement.firstChild.appendChild(ga);
  })();
</script>
<head profile="http://gmpg.org/xfn/11">
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<title><?php if (is_home() ) { ?><?php bloginfo('name'); ?><?php } else {?><?php wp_title(''); ?> | <?php bloginfo('name'); ?><?php } ?></title>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" />
	<?php if (is_home()){
	$description = "ZWWoOoOo's Blog,关注铁血联盟2v1.13及其汉化,wordpress,模板,主题,插件";
	$keywords = "ZWWoOoOo's Blog,JA2,Jagged Alliance 2,铁血联盟2,Jagged Alliance 2 v1.13,JA2 v1.13,铁血联盟2 v1.13,汉化,教程,DBB,Cosplay,HAM,wildfire,野火,wordpress,模板,主题,插件,zwwooooo,便携软件"; //You can edit your keywords in here.
	} elseif (is_single()){
	$description = $post->post_title ;
	$keywords = "";
	$tags = wp_get_post_tags($post->ID);
	foreach ($tags as $tag ) {
	$keywords = $keywords . $tag->name . ", ";
	}
	} elseif(is_category()){
	$description = category_description();
	}
	?>
	<meta name="keywords" content="<?php $keywords?>" />
	<meta name="description" content="<?php $description?>" />
	<?php if ( is_single() ) { ?>
	<meta name="description" content="<?php $key="description"; echo get_post_meta($post->ID, $key, true); ?>" />
	<?php } ?>
	<?php if ( !(is_home()) and !(is_single()) ) { ?><meta name="Googlebot" content="noindex,follow" /><?php }?>
	<link rel="shorcut icon" type="image/x-ico" href="<?php bloginfo('template_url') ?>/images/favicon.ico" />
	<link rel="stylesheet" type="text/css" media="screen" href="<?php bloginfo('stylesheet_url'); ?>" />
	<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<!--?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?-->
	<?php wp_head(); ?>
</head>
<body>
<div id="wrapper">
	<div id="header">
		<h1><a href="<?php echo get_settings('home'); ?>"><?php bloginfo('name') ?></a></h1>
		<h2><?php bloginfo('description');?></h2>
		<span id="search">
			<?php include (TEMPLATEPATH . '/searchform.php'); ?>
		</span>
		<span id="pages"><ul><li<?php if ( is_home() ) { echo ' class="current_page_item"'; }?>><a href="<?php echo get_settings('home'); ?>">Home</a></li><?php wp_list_pages('title_li=&depth=2'); ?></ul></span>
		<span id="categories"><ul><?php wp_list_categories('title_li=&depth=2'); ?></ul></span>
		<span id="rss">
			<a class="feedburner" href="http://feeds.feedburner.com/zwwooooo" rel="nofollow" title="RSS Feed">FeedBurner 订阅</a>
			<br /><a class="feedsky" href="http://feed.zww.me" rel="nofollow" title="RSS Feed">FeedSky 订阅</a>
		</span>
		</div>
<hr />
