(function () {

    // 存缓存图片
    var imageCache = [];
    // 图片加载完后的回调函数
    var callBacks = [];

    // 加载函数
    function load(imageUrl) {
        // 判断是单个照片还是多个照片
        if (imageUrl instanceof Array) {
            imageUrl.forEach(function (url) {
                loadUrl(url);
            });
        }
        else {
            loadUrl(url);
        }
    }

    // 加载处理函数
    function loadUrl(url) {
        // 有缓存，直接返回
        if (imageCache[url]) {
            return imageCache[url];
        }
        // 没有缓存，创建缓存
        else {
            var image = new Image();
            // 加载完成后，加入缓存数组
            image.onload = function () {
                imageCache[url] = image;

                // 所有图片加载完后，执行函数
                if (isReady()) {
                    callBacks.forEach(function (func) {
                        func();
                    });
                }
            }
            // 监听事件放在触发事件之前
            imageCache[url] = false;
            image.src = url;
        }
    }

    // 获取某个缓存图片
    function get(url) {
        return imageCache[url];
    }

    // 判断图片是否完全加载完，执行回调函数
    function isReady() {
        var ready = true;
        for (var img in imageCache) {
            if (!imageCache[img]) {
                ready = false;
                break;
            }
        }

        return ready;
    }

    // 加载执行函数
    function onReady(func) {
        callBacks.push(func);
    }

    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };

})();