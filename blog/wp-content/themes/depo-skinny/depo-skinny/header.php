<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php if (is_single() || is_page() || is_archive()) { bloginfo('name'); echo(' - '); wp_title('',true); } else { bloginfo('name'); echo(' - '); bloginfo('description'); } ?></title>
<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" /> <!-- leave this for stats -->
<link href=' http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php wp_head(); ?>
</head>

<body>
<div class="body">
	<div class="header">

<h1>
<span class='icons'>
<a href="http://www.twitter.com/liangch"><img src="http://twitter-badges.s3.amazonaws.com/t_small-b.png" alt="Follow liangch on Twitter" /></a>

<a href="http://cn.linkedin.com/in/liangch"><img src="http://www.linkedin.com/img/webpromo/btn_in_20x15.png" alt="View Liang Chen's LinkedIn profile" /></a>
</span>
        	<?php if (is_home()) : ?>
        		<?php bloginfo('name'); ?> 
        	<?php else : ?>
		        <a href="<?php echo get_settings('home'); ?>/"><?php bloginfo('name'); ?></a> 
            <?php endif; ?>
				<span><?php bloginfo('description'); ?></span>

</h1>
	</div><!-- end header -->
<div class="container">

