<?php get_header() ?>
<div id="content">
	<div class="post">
		<h2 class="title-other">404 Error - Not found</h2>
		<div class="entry">
			<h3>Random Posts</h3>
			<ul>
				<?php
					$rand_posts = get_posts('numberposts=5&orderby=rand');
					foreach( $rand_posts as $post ) :
				?>
				<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
				<?php endforeach; ?>
			</ul>
			<h3>Tag Cloud</h3>
			<ul>
				<?php wp_tag_cloud('smallest=9&largest=22&unit=pt&number=200&format=flat&orderby=name&order=ASC');?>
			</ul>
		</div>
	</div>
</div><!--content-->
<?php get_sidebar() ?>
<?php get_footer() ?>