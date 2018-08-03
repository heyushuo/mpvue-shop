<template>
  <div class="login">
    <div class="logo">

    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">微信登录</button>
  </div>
</template>

<script>
var qcloud = require("wafer2-client-sdk/index.js");
export default {
  created() {
    qcloud.setLoginUrl("http://localhost:5757/heyushuo/login");
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    doLogin() {
      const session = qcloud.Session.get();
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            // this.setData({ userInfo: res, logged: true });
            console.log(res);
            wx.setStorageSync("key", "value");
          },
          fail: err => {
            console.error(err);
          }
        });
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            wx.setStorageSync("userInfo", res);
            wx.navigateBack({});
          },
          fail: err => {
            wx.navigateBack({});
          }
        });
      }
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>