var FP = (function() {
    var timer = null;
    var speed = 0.05;
    var timeUnit = 1;
    var percent = 0.0;

    var updateProgress = function() {
        var p = (percent + speed).toFixed(2);

        if (p < 100) {
            percent = parseFloat(p);
            onPercentChanged(percent);

        } else {
            percent = 100;
            onPercentChanged(percent);
            stop();
        }
    };

    var start = function() {
        if (timer !== null) {
            stop();
        }

        timer = setInterval(updateProgress, timeUnit);
    };

    var stop = function() {
        clearInterval(timer);
        timer = null;
        percent = 0.0;
    };

    var onPercentChanged = function(p) {

    };

    var init = function(options) {
        if (options.onPercentChanged !== undefined && options.onPercentCahnged !== null) {
            if (typeof options.onPercentChanged == "function") {
                onPercentChanged = options.onPercentChanged;
            } else {
                throw "onPercentCahnged is not a function";
            }
        }

        // if (options.speed !== undefined && options.speed !== null) {
        //     if (options.speed > 0) {
        //         speed = options.speed;
        //     } else {
        //         throw "speed should be greater than 0";
        //     }
        // }
    };


    return {
        init: init,
        start: start,
        stop: stop
    };
})();