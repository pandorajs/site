{% if page.comments && config.duoshuo_shortname %}
<section id="comments">
  <div class="ds-thread" data-thread-key="{{ page.path }}" data-title="{{ page.title }}" data-url="{{ url }}"></div>
  <script type="text/javascript">
  var duoshuoQuery = {short_name:'{{ config.duoshuo_shortname }}'};
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';ds.async = true;
      ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0] 
       || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
    </script>
</section>
{% endif %}
