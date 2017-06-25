window.onload = function() {
    var aBannerPic = document.getElementsByClassName('banner-2-pic')[0].getElementsByTagName('img');
    // console.log(aBannerPic);
    setInterval(func, 1000);

    function func() {
        var $aBannerPic = $(aBannerPic);
        // var index;
        for (var i = 0; i < aBannerPic.length; i++) {
            var $this = $(aBannerPic[i]);
            if ($this.hasClass('active')) {
                if (i === aBannerPic.length - 1) {
                    console.log('in if loop')
                    $(aBannerPic[0]).addClass('active');
                } else {
                    console.log('in else loop')
                    $(aBannerPic[i + 1]).addClass('active');
                }
                $this.removeClass('active');
                break;
            }
        }
    }
}

