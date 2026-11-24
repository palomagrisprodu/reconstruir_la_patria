function es_tactil() {
    var _toca = (navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
    var _grueso = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    return (_toca && _grueso) ? 1 : 0;
}

function bloquear_horizontal() {
    try {
        var _el = document.documentElement;
        var _pedir = _el.requestFullscreen || _el.webkitRequestFullscreen;
        var _bloquear = function () {
            try {
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(function () {});
                }
            } catch (e) {}
        };
        if (_pedir) {
            var _p = _pedir.call(_el);
            if (_p && _p.then) { _p.then(_bloquear, _bloquear); } else { _bloquear(); }
        } else {
            _bloquear();
        }
        return 1;
    } catch (e) {
        return 0;
    }
}

function volver_atras() {
    if (window.history.length > 1) {
        window.history.back();
        return 1;
    }
    return 0;
}