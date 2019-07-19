<html><head></head><body>function sakuraInit() {
        $(document).snowfall('clear');
        if (document.body.clientWidth > 600) {
            $(document).snowfall({image:"/images/sakura/1.png", flakeCount:7, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"/images/sakura/1.png", flakeCount:7, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"/images/sakura/2.png", flakeCount:7, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"/images/sakura/4.png", flakeCount:7, minSpeed:1, minSize:8, maxSize:15,});
        } else {
            $(document).snowfall({image:"/images/sakura/1.png", flakeCount:3, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"/images/sakura/1.png", flakeCount:3, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"/images/sakura/2.png", flakeCount:3, minSpeed:1, minSize:8, maxSize:15,});
            $(document).snowfall({image:"/images/sakura/4.png", flakeCount:3, minSpeed:1, minSize:8, maxSize:15,});
        }
    }
    window.onload = sakuraInit();
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
      </script></body></html>