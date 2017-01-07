(function($, a, b) {
    var masker = function(el) {
        var vm = this,
            canvas = typeof el === 'string'?b.getElementById(el):el,
            ctx = canvas.getContext('2d'),
            canvasW = canvas.offsetWidth,
            canvasH = canvas.offsetHeight,
            imgcommon = { path: "", x: 0, y: 0, width: canvasW, height: canvasH},
            layers = [],
            mask = $.extend({}, imgcommon),
            image = $.extend({}, imgcommon),
            overlay = $.extend({}, imgcommon),
            assetsLoaded = 0,
            imageScale = 1,
            setImageScale = function(scale) { imageScale = scale; setImageCenter(); return this; },
            setImageCenter = function() {
                var x = 0 - Math.round((image.width * imageScale / 2) - (canvasW / 2));
                var y = 0 - Math.round((image.height * imageScale / 2) - (canvasH / 2));
                image = $.extend(image, { x: x, y: y });
                return this;
            },
            setMask = function(newMask) { var tmp = new Image(); tmp.crossOrigin = "anonymous"; tmp.src = newMask.path || mask.path; mask = $.extend(mask, { image: tmp }, newMask); return this; },
            setImage = function(newImage) { var tmp = new Image(); tmp.crossOrigin = "anonymous"; tmp.src = newImage.path || image.path; image = $.extend(image, { image: tmp}, newImage); return this; },
            setOverlay = function(newOverlay) { var tmp = new Image(); tmp.crossOrigin = "anonymous"; tmp.src = newOverlay.path || overlay.path; overlay = $.extend(overlay, { image: tmp }, newOverlay); return this},
            preloadAssets = function(cb) {
                var onload = function(e) { cb(); },
                    onerror = function(e) { console.log(e); };
                
                if(mask.image) {
                    mask.image.addEventListener('load', onload);
                    mask.image.addEventListener('error', onerror);
                }
                
                if(image.image) {
                    image.image.addEventListener('load', onload);
                    image.image.addEventListener('error', onerror);
                }
                
                if(overlay.image) {
                    overlay.image.addEventListener('load', onload);
                    overlay.image.addEventListener('error', onerror);
                }
                
            },
            clean = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            },
            redraw = function(done) {
                clean();
                ctx.save();
                
                if(image.image) {
                    ctx.drawImage(image.image, image.x, image.y, (image.width || image.image.width) * imageScale, (image.height || image.image.height) * imageScale);
                }
                
                ctx.globalCompositeOperation = "source-over";
                
                if(overlay.image) {
                    ctx.drawImage(overlay.image, overlay.x, overlay.y, overlay.width || overlay.image.width, overlay.height || overlay.image.height );
                    
                }

                if(mask.image) {
                    ctx.globalCompositeOperation = mask.type || "destination-in";
                    ctx.drawImage(mask.image, mask.x, mask.y, mask.width || mask.image.width, mask.height || mask.image.height);
                }

                ctx.restore();
                if(done) { 
                    done(vm);
                }
            },
            draw = function(done) {
                preloadAssets(function() {
                    redraw(done);
                });
            },
            toDataURL = function() {
                return canvas.toDataURL();
            };
            
        return {
            setMask: setMask,
            setImage: setImage,
            setImageCenter: setImageCenter,
            setImageScale: setImageScale,
            setOverlay: setOverlay,
            draw: draw,
            redraw: redraw,
            toDataURL: toDataURL
        };
    };
    a.ImageMask = masker;
})(window.jQuery, window, document);