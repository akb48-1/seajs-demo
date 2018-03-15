define(function(require, exports) {
    let num = 0;
    let person = {
        name: 'lisi'
    };

    exports.hello = function (text) {
        num += 1;
        console.log('num:', num);
        console.log('person.name:', person.name);
        console.log('hello ' + text);
    }
    exports.num = num;
    exports.person = person;
});