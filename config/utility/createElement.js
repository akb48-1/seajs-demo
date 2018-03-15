define(function (require, exports) {
    require('./UI.css');

    exports.createElement = function(type, $) {
        let ele = document.createElement(type);
        ele.id = 'new-' + type;
        document.body.appendChild(ele);
        console.log('已添加元素:', ele);
        console.log('***********')
        console.log('$:', $);
    };
})