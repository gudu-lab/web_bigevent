// 不论发起 $.get() $.post()  $.ajax()，都会在发起请求之前调用 $.ajaxPrefilter 方法，其中option是 ajax的配置对象;

$.ajaxPrefilter(function (options) {
    // 在发起ajax 请求之前统一拼接请求地址;
    options.url = "http://www.liulongbin.top:3007" + options.url;
})