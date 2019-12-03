googleanalytics_proxy 
!function(a,b,c,d,e){var f=c.screen,g=encodeURIComponent,h=["ga="+a,"dt="+g(d.title),"dr="+g(d.referrer),"ul="+(e.language||e.browserLanguage||e.userLanguage),"sd="+f.colorDepth+"-bit","sr="+f.width+"x"+f.height,"vp="+Math.max(d.documentElement.clientWidth,c.innerWidth||0)+"x"+Math.max(d.documentElement.clientHeight,c.innerHeight||0),"z="+ +new Date];c.__ga_img=new Image,c.__ga_img.src=b+"?"+h.join("&amp;")}("UA-118566890-1","https://ga.giuem.com",window,document,navigator,location);
<script>
        document.querySelectorAll('.github-emoji')
          .forEach(el => {
            if (!el.dataset.src) { return; }
            const img = document.createElement('img');
            img.style = 'display:none !important;';
            img.src = el.dataset.src;
            img.addEventListener('error', () => {
              img.remove();
              el.style.color = 'inherit';
              el.style.backgroundImage = 'none';
              el.style.background = 'none';
            });
            img.addEventListener('load', () => {
              img.remove();
            });
            document.body.appendChild(img);
          });
      </script>