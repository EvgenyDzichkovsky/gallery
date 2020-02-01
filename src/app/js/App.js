(function($) {
    var $li = $('.gallery__list').find('> li'),
        $links = $li.find('> a'),
        $lightbox = $('.gallery__lightbox'),
        $overlay = $('.gallery__overlay'),
        $prev = $('.gallery__prev'),
        $next = $('.gallery__next'),
        $auto = $('.gallery__auto'),
        liIndex,
        targetImg;

    var time = null;
    var imgs = [];
    var imgSources = [
        './images/img-1-lg.jpg',
        './images/img-2-lg.jpg',
        './images/img-3-lg.jpg',
        './images/img-4-lg.jpg',
        './images/img-5-lg.jpg',
        './images/img-6-lg.jpg',
        './images/img-7-lg.jpg',
        './images/img-8-lg.jpg',
        './images/img-9-lg.jpg',
        './images/img-10-lg.jpg',
        './images/img-11-lg.jpg',
        './images/img-12-lg.jpg',
    ];

    for (var i = 0; i < imgSources.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = imgSources[i];
    }

    function replaceImg(src) {
        $lightbox.find('img').attr('src', src);
    }

    function getHref(index) {
        return $li.eq(index).find('> a').attr('href');
    }

    $links.click(function (evt) {
        evt.preventDefault();
        liIndex = $(this).parent().index();
        targetImg = $(this).attr('href');
        replaceImg(targetImg);
        $lightbox.fadeIn();
    });

    $auto.click(function () {
        if (time == null) {
            time = setInterval(function () {
                $next.click();
            }, 1000);
            $auto.addClass('gallery__stop');
            $auto.removeClass('gallery__auto');
        } else {
            clearInterval(time);
            time = null;
            $auto.removeClass('gallery__stop');
            $auto.addClass('gallery__auto');
        }
    });

    $overlay.click(function () {
        $lightbox.fadeOut();
        clearInterval(time);
        time = null;
        $auto.addClass('gallery__auto');
    });

    $(document).keydown(function (evt) {
        if (evt.keyCode === 27) {
            $lightbox.fadeOut();
            clearInterval(time);
            time = null;
            $auto.addClass('gallery__auto');
        }
    });

    $next.click(function () {
        if ((liIndex + 1) < $li.length) {
            targetImg = getHref(liIndex + 1);
            liIndex++;
        } else {
            targetImg = getHref(0);
            liIndex = 0;
        }

        replaceImg(targetImg);
    });

    $prev.click(function () {
        if (liIndex > 0) {
            targetImg = getHref(liIndex - 1);
            liIndex--;
        } else {
            targetImg = getHref($li.length - 1)
            liIndex = $li.length - 1;
        }

        replaceImg(targetImg);
    });
})(jQuery);

