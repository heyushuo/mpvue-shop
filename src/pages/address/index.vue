<template>
  <div class="address">
    <div v-if="listData.length!=0" class="item">
      <div :style="{transform:'translateX(' + tranX + 'rpx)'}" @touchstart="startMove" @touchmove="deleteGoods" @touchend="endMove"
        class="addresslist" v-for="(item, index) in listData" :key="index">
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
        <div @click="toDetail(item.id)"></div>

        <div class="delete" :style="{transform:'translateX(' + tranX + 'rpx)'}">
          删除
        </div>

      </div>
    </div>

    <div v-else class="center">
      <p>收货地址在哪里?</p>
    </div>
    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    getStorageOpenid
  } from "../../utils";
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
        listData: [],
        tranX: 0,
        startX: "",
        startY: "",
        moveX: "",
        moveY: "",
        moveEndX: "",
        moveEndY: "",
      };
    },
    components: {},
    methods: {
      startMove(e) {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },
      deleteGoods(e) {
        console.log(e)
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        let X = this.moveX - this.startX;
        let Y = this.moveX - this.startY;
        // console.log(X)
        // if (X > 50 || X >= 100) {
        //   X = 0;
        // }
        // if (X < -50 || X <= -100) {
        //   X = -100;
        // }
        //大于这个值认为在滑动
        // if (X > 10 || X < -10) {

        // }
        this.tranX = X;

        //

        if (Math.abs(X) > Math.abs(Y) && X > 20) {
          console.log("left 2 right");
        } else if (Math.abs(X) > Math.abs(Y) && X < 20) {
          console.log("right 2 left");
        }
      },
      endMove(e) {
        console.log(e)
        // this.moveEndX = e.touches[0].pageX;
        // this.moveEndY = e.touches[0].pageY;
        // let X = this.moveEndX - this.startX;
        // let Y = this.moveEndY - this.startY;
        // if (X > 50 || X >= 100) {
        //   X = 0;
        // }
        // if (X < -50 || X <= -100) {
        //   X = -100;
        // }
        // this.tranX = X;
      },
      toDetail(id) {
        wx.navigateTo({
          url: '/pages/addaddress/main?id=' + id
        });
      },
      async getAddressList() {
        var _this = this;
        const data = await get("/address/getListAction", {
          openId: _this.openId
        });
        this.listData = data.data;
      },
      wxaddress(index) {
        if (index == 1) {
          wx.navigateTo({
            url: "/pages/addaddress/main"
          });
        } else {
          wx.chooseAddress({
            success: function (res) {
              var res = encodeURIComponent(JSON.stringify(res));
              wx.navigateTo({
                url: "/pages/addaddress/main?res=" + res
              });
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
