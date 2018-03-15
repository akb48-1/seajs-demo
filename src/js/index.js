define(function(require, exports) {
    var $ = require('jquery');
    var hello = require('hello');
    var component = require('component')('div', $);
    var kar = require('./kar2')($);

    $(function() {
        /*
        hello.hello('world');
        
        console.log('num:',hello.num);
        console.log(hello);
        setTimeout(() => {hello.person.name = 'wangwu'}, 10000)
        hello.hello('world');
        setTimeout(() => {console.log(hello)}, 10000);
        

        var aa = new kar.ext.toSection([
            {
                catalog: 'ul li:eq(0) button',
                chapter: '.a:eq(0)'
            }, {
                catalog: 'ul li:eq(1) button',
                chapter: '.a:eq(1)'
            }, {
                catalog: 'ul li:eq(2) button',
                chapter: '.a:eq(2)'
            }, {
                catalog: 'ul li:eq(3) button',
                chapter: '.a:eq(3)'
            },
        ],{
            onClick: function (i) {
                console.log(i)
            }
        });
        
        var bb = new kar.ext.toggleTab('ul li', '.a', {
            event: 'click',
            autoCutover: true
        });
        var cc = kar.view.toDocumentTop(document.querySelectorAll('ul')[0]);
        */
        var dd = new kar.view.scroolTop({
            target: '.goto'
        })
        console.log(dd, kar.isType([]))
    });
})