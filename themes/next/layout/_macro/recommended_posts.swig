<div class="post-body">
<div class="note primary">
<div class="recommended_posts">
     {% set recommended_posts = recommended_posts(post, site) %}
     <h4 class="recommended">{{ __('post.recommended_posts') }} </h4>
     <ul class="recommended-ul">
         {{ popular_posts( { maxCount: 5 , ulClass: 'popular-posts' , PPMixingRate: 0.4 , isDate: false , isImage: false , isExcerpt: false } , post ) }}
         {% for link in recommended_posts  %}
             <li><a href="{{ link.permalink }}" target="_blank">{{ link.title }}</a></li>
         {% endfor %}
     </ul>
</div>
</div>
</div>