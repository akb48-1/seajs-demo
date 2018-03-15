define(function(require, exports) {
    var $ = require('jquery');
    var hello = require('hello');
    var component =require('component')('div', $);

    $(function() {
        hello.hello('world');
        
        console.log('num:',hello.num);
        console.log(hello);
        setTimeout(() => {hello.person.name = 'wangwu'}, 10000)
        hello.hello('world');
        setTimeout(() => {console.log(hello)}, 10000)
        
    });
})