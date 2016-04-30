var FP = (function() {
    var _config = {
        default: {
            speed: 0.05,
            timeUnit: 10
        }
    };

    var _timer = null;
    var _speed = _config.default.speed;
    var _timeUnit = _config.default.timeUnit;
    var _percent = 0.0;
    var _isRunning = false;
    var _stopPercent = 100.0;

    var _updateProgress = function() {
        var p = parseFloat((_percent + _speed).toFixed(2));

        if (p < _stopPercent) {
            _percent = p;
            _onPercentChanged(_percent);

        } else {
            _percent = _stopPercent;
            _onPercentChanged(_percent);
            _stop();
        }
    };

    var _start = function() {
        _isRunning = true;
        _timer = setInterval(_updateProgress, _timeUnit);
    };

    var _stop = function(silent) {
        clearInterval(_timer);
        _timer = null;
        _isRunning = false;

        if (!silent) {
            _onStop();
        }
    };

    var _reset = function(onReset) {
        if (_isRunning) {
            _stop(true);
        }

        _percent = 0.0;
        _speed = _config.default.speed;
        _stopPercent = 100.0;
        _onStop = function() {};

        if (typeof onReset == "function") {
            onReset();
        }
    };

    var _onPercentChanged = function(changedPercent) {};

    var _init = function(options) {
        if (options.onPercentChanged !== undefined && options.onPercentCahnged !== null) {
            if (typeof options.onPercentChanged == "function") {
                _onPercentChanged = options.onPercentChanged;
            } else {
                throw "onPercentCahnged is not a function";
            }
        }
    };

    var _onStop = function() {};

    var _validArgs = function(stopPercent, withinMs, onStop) {
        if (stopPercent <= _percent) {
            throw "stopPercent should be greater than current percent";
        }

        if (withinMs <= 0) {
            throw "withInMs should be greater than 0";
        }

        if (onStop !== undefined && onStop !== null) {
            if (typeof onStop != "function") {
                throw "onStop is not a function";
            }
        } else {
            onStop = function() {};
        }
    };

    var _goTo = function(stopPercent, withinMs, onStop) {
        _validArgs(stopPercent, withinMs, onStop);

        if (_isRunning) {
            _stop(true);
        }

        _onStop = onStop;

        var leftPercent = stopPercent - _percent;
        _speed = parseFloat((leftPercent / withinMs * _timeUnit).toFixed(2));
        _stopPercent = stopPercent;
        _start();
    };

    var _goToGdly = function(stopPercent, withinMs, onStop) {
        _validArgs(stopPercent, withinMs, onStop);

        if (_isRunning) {
            _stop(true);
        }

        var leftPercent = stopPercent - _percent;
        var gdlyLevel = parseInt(leftPercent / 15);
        var temp = (gdlyLevel * (gdlyLevel - 1) / 2);
        var a1 = leftPercent % temp;
        var d = parseInt((leftPercent - a1) / temp);
        var avgMs = parseInt(withinMs / gdlyLevel);

        _recurGoTo(_percent + a1 + d, a1, d, 1, avgMs, onStop);
    };

    var _recurGoTo = function(stopPercent, a1, d, n, withinMs, onStop) {
        if (stopPercent >= 100.0) {
            var leftMs = parseInt(withinMs * (100.0 - _percent) / (stopPercent - _percent));
            _goTo(100, leftMs, onStop);
        } else {
            _goTo(stopPercent, withinMs, function() {
                _recurGoTo(stopPercent + a1 + (n + 1) * d, a1, d, n + 1, withinMs, onStop);
            });
        }
    };

    return {
        init: _init,
        reset: _reset,
        goTo: _goTo,
        goToGdly: _goToGdly
    };
})();