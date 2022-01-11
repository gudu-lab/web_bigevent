// 不论发起 $.get() $.post()  $.ajax()，都会在发起请求之前调用 $.ajaxPrefilter 方法，其中option是 ajax的配置对象;

$.ajaxPrefilter(function (options) {
    // 在发起ajax 请求之前统一拼接请求地址;
    options.url = "http://www.liulongbin.top:3007" + options.url;
    // 请求头的配置对象
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || '',
        }
    };
    // 无论成功还是失败都会拿到 complete回调
    // 全局统一挂载 complete函数
    options.complete = function (res) {
        // 在 complete回调中可以使用 res.responeJSON拿到服务器响应回来的数据

        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            console.log(1);
            // 强制清空 token
            localStorage.removeItem("token");
            // 强制用户跳转到登陆页
            location.href = '/大事件项目/code/login.html';
        }
    };
})