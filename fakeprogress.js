var FP = (function() {
    var timer;
    var speed = 0.01;
    var timeUnit = 1;

    var update = function() {

    };

    var start = function() {
        if (timer !== null) {
            this.stop();
        }

        timer = setInterval(update, timeUnit);
    };


    return {

    };
}());