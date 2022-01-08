$(function () {
    // 点击 “去注册账号” 的连接
    $("#link_reg").on("click", function () {
        $(this).parents(".login-box").hide().siblings().show();
    });

    // //  点击 "去登陆"连接
    $("#link_login").on("click", function () {
        $(this).parents(".reg-box").hide().siblings().show();
    });

    // 从layui中获取 form对象
    var form = layui.form;

    let layer = layui.layer;
    // 通过 form.verify自定义校验规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }
        , pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 这是校验两次密码是否一致
        repwd: (value) => {
            // 通过形参拿到的是确认密码框中的内容,还需要拿到密码框中的内容，进行判断两次是否一致，如何判断失败，则return 返回一条提示消息
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return "两次密码不一致";
            }
        }
    });

    // 监听注册表单的事件
    $("#form_reg").on("submit", function (e) {
        // 阻止表单的默认行为
        e.preventDefault();
        let data = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() };
        // 发起POST请求
        $.post("/api/reguser", data, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }

            layer.msg(res.message);
            $("#link_login").click();
        })
    });

    // 监听表单登陆的事件
    $("#form_login").on("submit", function (e) {
        // 阻止表单的默认提交-跳转页面的行为
        e.preventDefault();
        let data = $(this).serialize();
        // 发起POST请求
        $.post("/api/login", data, function (res) {
            if (res.status !== 0) {
                // 显示消息提示用户
                return layer.msg(res.message);
            }

            layer.msg(res.message);

            // 如果请求成功，将token字符串保存到本地
            localStorage.setItem("token", res.token);

            // 跳转到后台
            location.href = "/大事件项目/code/index.html";
        })
    })
})