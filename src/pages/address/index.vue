<template>
  <div class="address">
    <div class="item">
      <div class="addresslist" v-for="(item, index) in listData" :key="index">
        <div>
          <span>{{item.name}}</span>
          <div v-if="item.is_default" class="moren">
            默认
          </div>
        </div>
        <div class="info">
          <p>{{item.mobile}}</p>
          <p>{{item.address+item.address_detail}}</p>
        </div>
        <div></div>
      </div>
    </div>

    <div class="center">
      <p>收货地址在哪里?</p>
    </div>
    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
import { get, getStorageOpenid } from "../../utils";
export default {
  onShow() {
    this.openId = getStorageOpenid();
    this.getAddressList();
  },
  created() {},
  data() {
    return {
      userInfo: {},
      imgUrl: "",
      listData: []
    };
  },
  components: {},
  methods: {
    async getAddressList() {
      var _this = this;
      const data = await get("/address/getListAction", {
        openId: _this.openId
      });
      this.listData = data.data;
    },
    wxaddress(index) {
      if (index == 1) {
        wx.navigateTo({ url: "/pages/addaddress/main" });
      } else {
        wx.chooseAddress({
          success: function(res) {
            var res = encodeURIComponent(JSON.stringify(res));
            wx.navigateTo({ url: "/pages/addaddress/main?res=" + res });
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
