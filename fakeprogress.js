var FP = (function() {
    var timer = null;
    var speed = 0.01;
    var timeUnit = 1;
    var percent = 0.0;

    var updateProgress = function() {
        var p = (this.percent + this.speed).toFixed(2);

        if (p < 100) {
            this.percent = p;
            this.onpercentChanged(this.percent);

        } else {
            this.percent = 100;
            this.onpercentChanged(this.percent);
            this.stop();
        }
    };

    var start = function() {
        if (this.timer !== null) {
            this.stop();
        }

        this.timer = setInterval(this.updateProgress, this.timeUnit);
    };

    var stop = function() {
        clearInterval(this.timer);
        this.timer = null;
        this.percent = 0.0;
    };

    var onPercentChanged = function(percent) {

    };

    var init = function(options) {
        if (options.onPercentChanged !== undefined && options.onPercentCahnged !== null) {
            if (typeof options.onPercentChanged == "function") {
                this.onPercentChanged = options.onPercentChanged;
            } else {
                throw "onPercentCahnged is not a function";
            }
        }

        if (options.speed !== undefined && options.speed !== null) {
            if (options.speed > 0) {
                this.speed = options.speed;
            } else {
                throw "speed should be greater than 0";
            }
        }
    };

    var finishWithIn = function(ms) {

    };

    return {

    };
}());