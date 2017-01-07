var $ = window.jQuery.noConflict(),
    mask = null,
    performClick = function(id) {
        var elem = document.getElementById(id);
        if(elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    },
    changeOverlay = function(src) { 
        $('#overlay').css('background-image', "url('" + src + "')");
        mask.setOverlay({ path: src, width: 600, height: 600 });
    },
    browse = function() {
        performClick('image');
    };

$(document).ready(function() {
    var width = 600,
        height = 600,
        canvas = document.createElement('canvas');

    canvas.width = 600;
    canvas.height = 600;

    mask = new ImageMask(canvas);
    
    $('#image-cropper').cropit({ 
        allowDragNDrop: false
    });

    $('.download-btn').click(function() {
        var imageData = $('#image-cropper').cropit('export');
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageData;
        mask
            .setImage({ image: img, width: width, height: height })
            .draw(function() {
                $('#download').attr('href', mask.toDataURL());
                performClick('download');
            });
    });

    changeOverlay('img/overlay1.png');
});
    