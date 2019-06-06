    function sakuraInit() {
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
