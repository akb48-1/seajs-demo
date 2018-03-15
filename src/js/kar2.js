define(function(require, exports) {
    /* karJS */
    return function ($) {
        return (function (global) {
            'use strict';

            var Kar = (function () {

                // 定义基础类
                class Kar {
                    constructor() {
                        this.name = 'karJS';
                    }
                    my() {
                        console.log(this)
                    }
                };

                // window.location
                Kar.host = {
                    version: global.browser,
                    host: global.location.host,
                    hostname: global.location.hostname,
                    href: global.location.href,
                    origin: global.location.origin,
                    pathname: global.location.pathname,
                    hash: global.location.hash
                };
                //  正则
                Kar.regexp = {
                    chinese: '^[\u4E00-\u9FA5]+$',
                    date: '^\d{4}-\d{2}-\d{2}$',
                    email: '^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$',
                    hex: '^([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$',
                    integer: '^\d+$',
                    phone: '^(13[0-9]{9}|15[012356789][0-9]{8}|18[0-9][0-9]{8}|147[0-9]{8}|17[0678][0-9]{8}|(0\d{2,3})?(\d{7,8}))$',
                    tel: '^(0\d{2,3})?(\d{7,8})$',
                    uname: '^[\u4E00-\u9FA5\a-zA-Z]{2,15}$',
                    year: '^\d{4}$'
                };
                //判断数据类型与是否是某种数据类型
                Kar.isArray = (obj) => { return Kar.isType(obj) == 'array'; }
                Kar.isString = (obj) => { return Kar.isType(obj) == 'string'; }
                Kar.isNumber = (obj) => { return Kar.isType(obj) == 'number'; }
                Kar.isObject = (obj) => { return Kar.isType(obj) == 'object'; }
                Kar.isFunction = (obj) => { return Kar.isType(obj) == 'function'; }
                Kar.isDate = (obj) => { return Kar.isType(obj) == 'date'; }
                Kar.isDOM = (typeof HTMLElement === 'object') ?
                    (obj) => obj instanceof HTMLElement :
                    (obj) => obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
                Kar.isType = (obj) => {
                    if (Kar.isDOM(obj)) return 'DOM';
                    return Object.prototype.toString.call(obj).toLocaleLowerCase().slice(8, -1);
                };

                const _designMode = {
                    // 观察者模式
                    observer: function () {
                        var list = {},      // 订阅者列表
                            listen,         // 订阅
                            trigger,        // 发布
                            remove;         // 取消订阅
                        listen = function (key, fn) {
                            if (!list[key]) {
                                list[key] = [];
                            }
                            list[key].push(fn);
                        };
                        trigger = function () {
                            var key = Array.prototype.shift.call(arguments),
                                fns = list[key];
                            if (!fns || fns.length === 0) {
                                return false;
                            }
                            for (var i = 0, fn; fn = fns[i++];) {
                                fn.apply(this, arguments);
                            }
                        };
                        remove = function (key, fn) {
                            var fns = list[key];
                            if (!fns) {
                                return false;
                            }
                            if (!fn) {
                                fns && (fns.length = 0);
                            } else {
                                for (var i = fns.length - 1; i >= 0; i--) {
                                    var _fn = fns[i];
                                    if (_fn === fn) {
                                        fns.splice(i, 1);
                                    }
                                }
                            }
                        };
                        return {
                            listen: listen,
                            trigger: trigger,
                            remove: remove
                        }
                    }
                };

                // _ext
                const _ext = {
                    say: function (name) {
                        console.log('my name is ' + name);
                    },
                    hello: function (name) {
                        console.log('hello ' + name);
                    },
                    // 锚点到该区块
                    toSection: function (param, option) {
                        if (!Kar.isArray(param)) return false;

                        var option = option || {};
                        var speed = option.speed || 'slow';     // 默认速度
                        var onClick = option.onClick || function () { };

                        for (let obj of param) {
                            (function (obj) {
                                let catalog = obj['catalog'];   // 目录元素
                                let chapter = obj['chapter'];   // 章节元素
                                let disparity = parseInt(obj['disparity']) || 0;    // 调整差值

                                $(catalog).addClass('kar-ToSection-catalog');   // 添加样式进行标示
                                $(chapter).addClass('kar-ToSection-chapter');   // 添加样式进行标示

                                $(catalog).on('click', function () {
                                    let index = $(this).index();
                                    $('html').animate({
                                        scrollTop: Kar.view.toDocumentTop(chapter) + disparity
                                    }, speed, () => onClick(index));
                                });
                            })(obj)
                        }
                    },
                    // 切换显示目录章节
                    toggleTab: function (catalogs, chapters, option) {
                        if (!$(catalogs).length) return;
                        console.log(catalogs, chapters, option);

                        let maxLen = $(catalogs).length;
                        let $catalogs = $(catalogs);
                        let $chapters = $(chapters);
                        var option = option || {};
                        var event = option.event || 'click';
                        var defaultClass = option.klass || 'current';
                        var initialIndex = (option.initialIndex > 0) ? (option.initialIndex >= maxLen ? maxLen - 1 : option.initialIndex) : 0;
                        var onChange = option.onChange || function () { };
                        let prev = null;
                        let next = null;
                        var autoCutover = option.autoCutover || false;
                        let timer;

                        $catalogs.addClass('kar-ToggleTab-catalog');    // 添加样式进行标示
                        $chapters.addClass('kar-ToggleTab-chapter');    // 添加样式进行标示

                        let changeShow = function (target, index) {
                            target.removeClass(defaultClass).eq(index).addClass(defaultClass);
                        };
                        changeShow($catalogs, initialIndex);
                        changeShow($chapters, initialIndex);

                        let $that;
                        let changeEvent = function (evt) {
                            $that = $(this);
                            var currentIndex = $that.index();

                            changeShow($catalogs, currentIndex);
                            changeShow($chapters, currentIndex);
                            prev = $that.prev(catalogs).index();
                            next = $that.next(catalogs).index();

                            onChange(prev, currentIndex, next);
                        };

                        switch (event) {
                            case 'hover':
                                $catalogs.hover(function (evt) {
                                    changeEvent.call(this, evt);
                                    if (timer) clearInterval(timer);
                                }, function () { });
                                break;
                            default:
                                $catalogs.on('click', function (evt) {
                                    changeEvent.call(this, evt);
                                    if (timer) clearInterval(timer);
                                });
                        };

                        // 开启自动切换
                        if (autoCutover) {
                            (function () {
                                let count = initialIndex;
                                timer = setInterval(() => {
                                    count++;
                                    if (count >= maxLen) count = 0;
                                    changeShow($catalogs, count);
                                    changeShow($chapters, count);
                                    onChange($catalogs.eq(count).prev(catalogs).index(), count, $catalogs.eq(count).next(catalogs).index());
                                }, 3000);
                            })();
                        }
                    }

                };

                // _view
                const _view = {

                    // 元素距离ducument顶部的距离
                    toDocumentTop: function (target) {
                        let offsetTop = 0;
                        var target = Kar.isDOM(target) ? target : $(target)[0];
                        let node = target;

                        while (node) {
                            offsetTop += node.offsetTop;
                            node = node.offsetParent;
                        };
                        return offsetTop;
                    },
                    // 添加回到顶部按钮事件
                    scroolTop: function (param) {
                        if (!param) return false;

                        var param = param;
                        let $goTop = $(param.target);                   // 实例元素，必填
                        let range = parseInt(param.range) || 100;       // 滚动条距离顶部range像素后才显示
                        let speed = param.speed || 'slow';                 // 滚动条滚动速度
                        let onReady = param.onReady || function () { };     // 实例初始化成功后的回调
                        let onClick = param.onClick || function () { };    // 点击实例元素后的回调
                        let that = $goTop[0];
                        $goTop.addClass('scroolTop');   // 添加样式进行标示

                        // 添加回到顶部事件
                        $goTop.on('click', function () {
                            $('html').animate({
                                scrollTop: 0
                            }, speed, () => onClick(that));
                        });

                        // 显示、隐藏条件
                        let showRule = function () {
                            setTimeout(function () {
                                let _top = $(global).scrollTop();
                                if (_top >= range) {
                                    $goTop.fadeIn();
                                } else {
                                    $goTop.fadeOut();
                                }
                            }, 100);
                        };

                        $(global).on('scroll', showRule);
                        onReady(that);
                    },
                    lightPopup: function (param) {

                    },
                    warningPopup: function (param) {

                    }
                };

                Kar.ext = { ..._ext };
                Kar.view = { ..._view };
                Kar.designMode = { ..._designMode };

                return Kar;

            })();

            return global.Kar = Kar;

        })(window)
    }
})