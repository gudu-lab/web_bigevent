$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "用户呢称必须为 1~6个字符之间"
            }
        }
    });
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("获取用户信息失败");
                }
                console.log(res);
                // 调用 form.val()快速为表单赋值
                form.val("formUserInfo", res.data);
            }
        })
    }
    // 重置表单
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    });

    // 监听表单的提交事件
    $(".layui-form").on("submit", function (e) {
        // 阻止表单的默认提交
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("更新用户信息失败");
                }

                layer.msg("更新用户信息成功");

                // 调用父页面的方法，重新渲染用户的头像 和 信息
                window.parent.getUserInfo();
            }
        })
    })
})