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

    var _stop = function() {
        clearInterval(_timer);
        _timer = null;
        _isRunning = false;
        _onStop();
    };

    var _reset = function() {
        if (_isRunning) {
            _stop();
        }

        _percent = 0.0;
        _speed = _config.default.speed;
        _stopPercent = 100.0;
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

    var _stopAt = function(stopPercent, withInMs, onStop) {
        if (stopPercent <= _percent) {
            throw "stopPercent should be greater than current percent";
        }

        if (withInMs <= 0) {
            throw "withInMs should be greater than 0";
        }

        if (onStop !== undefined && onStop !== null) {
            if (typeof onStop != "function") {
                throw "onStop is not a function";
            }
        } else {
            onStop = function() {};
        }

        if (_isRunning) {
            _stop();
        }

        _onStop = onStop;

        var leftPercent = stopPercent - _percent;
        _speed = parseFloat((leftPercent / withInMs * _timeUnit).toFixed(2));
        _stopPercent = stopPercent;
        _start();
    };

    return {
        init: _init,
        reset: _reset,
        stopAt: _stopAt
    };
})();