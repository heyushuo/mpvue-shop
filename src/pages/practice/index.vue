<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <!-- <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
    <div class="picture">
      <div class="btn">
        <button type="primary" @click="navigateTo">跳转页面</button>

      </div>
    </div>
    <div class="picture">
      <h3>图片api相关1</h3>
      <div class="btn">
        <button type="primary" @click="chooseImg">选择图片</button>
        <button type="primary" @click="previewImage">预览图片</button>
        <button type="primary">图片信息</button>

      </div>
      <img v-if="imgUrl" :src="imgUrl" alt="">
    </div>
    <div class="picture">
      <h3>弹窗相关</h3>
      <div class="btn">
        <button type="primary" @click="showtoast">showToast</button>
        <button type="primary" @click="showLoading">showLoading</button>
        <button type="primary" @click="showModal">showModal</button>

      </div>
      <button style="width:50%;margin-top:10rpx;" type="primary" open-type="share">分享</button>

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
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //       }
      //     })
      //   }
      // })
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
