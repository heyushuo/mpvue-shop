<template>
  <div class="address">
    <div class="center">
      <p>收货地址在哪里?</p>
    </div>
    <div class="bottom">
      <div>+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
export default {
  created() {
    // this.onShareAppMessage()
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    // wx.hideShareMenu()
  },
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      imgUrl: ""
    };
  },

  components: {
    card
  },

  methods: {
    wxaddress() {
      wx.chooseAddress({
        success: function(res) {
          var res = encodeURIComponent(JSON.stringify(res));
          wx.navigateTo({ url: "/pages/addaddress/main?res=" + res });
        }
      });
    },
    onShareAppMessage(res) {
      console.log(res);
      return {
        title: "自定义转发标题",
        path: "/pages/index",
        imageUrl: "url",
        success: res => {},
        fail: () => {},
        complete: () => {}
      };
    },
    navigateTo() {
      wx.navigateTo({
        url: "/pages/counter/main?id=123&name=何玉硕"
      });
    },
    showModal() {
      wx.showModal({
        title: "提示",
        content: "这是一个模态弹窗",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    showLoading() {
      wx.showLoading({
        title: "加载中"
      });
      setTimeout(function() {
        wx.hideLoading();
      }, 2000);
    },
    showtoast() {
      wx.showToast({
        title: "成功",
        icon: "success",
        duration: 2000
      });
    },
    chooseImg() {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log(res.tempFilePaths);
          _this.imgUrl = res.tempFilePaths;
        }
      });
    },
    previewImage() {
      wx.previewImage({
        current:
          "https://baike.baidu.com/pic/%E7%A7%91%E6%AF%94%C2%B7%E5%B8%83%E8%8E%B1%E6%81%A9%E7%89%B9/318773/0/9e3df8dcd100baa1a5fd20114d10b912c9fc2e42?fr=lemma&ct=single#aid=0&pic=9e3df8dcd100baa1a5fd20114d10b912c9fc2e42", // 当前显示图片的http链接
        urls: [
          "https://baike.baidu.com/pic/%E7%A7%91%E6%AF%94%C2%B7%E5%B8%83%E8%8E%B1%E6%81%A9%E7%89%B9/318773/0/9e3df8dcd100baa1a5fd20114d10b912c9fc2e42?fr=lemma&ct=single#aid=0&pic=9e3df8dcd100baa1a5fd20114d10b912c9fc2e42"
        ] // 需要预览的图片http链接列表
      });
    },
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
