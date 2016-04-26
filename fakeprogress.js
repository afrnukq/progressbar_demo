var FP = (function() {
    var _config = {
        default: {
            speed: 0.05,
            timeUnit: 1
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
        if (_isRunning) {
            _stop();
        }

        _isRunning = true;
        _timer = setInterval(_updateProgress, _timeUnit);
    };

    var _stop = function() {
        clearInterval(_timer);
        _timer = null;
        _isRunning = false;
    };

    var _reset = function() {
        if (_isRunning) {
            _stop();
        }
        _percent = 0.0;
    };

    var _onPercentChanged = function(changedPercent) {

    };

    var _init = function(options) {
        if (options.onPercentChanged !== undefined && options.onPercentCahnged !== null) {
            if (typeof options.onPercentChanged == "function") {
                _onPercentChanged = options.onPercentChanged;
            } else {
                throw "onPercentCahnged is not a function";
            }
        }
    };

    var _stopAt = function(stopPercent, withInMs) {
        if (stopPercent <= _percent) {
            throw "stopPercent should be greater than current percent";
        }

        if (withInMs <= 0) {
            throw "withInMs should be greater than 0";
        }

        if (_isRunning) {
            _stop();
        }

        var leftPercent = stopPercent - _percent;
        _speed = leftPercent / withInMs;
        _stopPercent = stopPercent;
        _start();
    };

    return {
        init: _init,
        start: _start,
        stop: _stop,
        stopAt: _stopAt
    };
})();