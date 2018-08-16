<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <input type="text" placeholder="身份、城市、区县" v-model="address">
    </div>
    <div class="item">
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailadress">
    </div>
    <div class="item itemend">
      <label class="checkbox">
        <checkbox class="box" value="设置为默认地址" color="#B4282D" checked="" />设置为默认地址
      </label>
      <!-- <div>
        <checkbox class="radio" color="#B4282D" value="" /> </div> -->
      <div @click="wxaddress">一键导入微信></div>
    </div>
    <div class="bottom">
      保存
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
export default {
  created() {},
  mounted() {
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      console.log(this.res);
      this.userName = this.res.userName;
      this.telNumber = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      this.detailadress = this.res.detailInfo;
    }
  },
  data() {
    return {
      res: {},
      userName: "",
      telNumber: "",
      address: "",
      detailadress: ""
    };
  },

  components: {
    card
  },

  methods: {
    wxaddress() {
      var _this = this;
      wx.chooseAddress({
        success: function(res) {
          _this.userName = _this.res.userName;
          _this.telNumber = _this.res.telNumber;
          _this.address = `${_this.res.provinceName} ${_this.res.cityName} ${_this.res.countyName}`;
          _this.detailadress = _this.res.detailInfo;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
