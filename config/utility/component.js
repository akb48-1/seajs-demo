define(function(require, exports) {
    let createElement = require('createElement');

    return function(type, $) {
        return {
            apped: createElement.createElement(type, $)
        }
    }
})