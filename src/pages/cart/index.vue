<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <!--  -->
      <div class="item" @touchstart="startMove" @touchmove="deleteGoods" v-for="(item,index) in listData" :key="index">
        <div class="con" :style="{transform:'translateX(' + tranX + 'rpx)'}">
          <div class="left">
            <div class="icon" @click="changeColor(index)" :class="[ Listids[index] ? 'active' : '',{active:allcheck}]"></div>
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>￥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">
              x{{item.number}}
            </div>
          </div>
        </div>

        <div class="delete" :style="{transform:'translateX(' + tranX + 'rpx)'}">
          删除
        </div>

      </div>
    </div>
    <div v-if="false" class="nogoods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" alt="">
    </div>
    <div class="fixed">
      <div @click="allCheck" :class="{active:allcheck}" class="left">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>
          ￥{{allPrise}}
        </div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    login
  } from "../../utils";
  export default {
    onShow() {
      if (login()) {
        this.userInfo = login();
        this.getListData();
      }
    },
    created() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {
        this.userInfo = login();
        this.getListData();
      }
    },
    data() {
      return {
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        startX: 0,
        startY: 0,
        moveEndX: 0,
        moveEndY: 0,
        tranX: 0
      };
    },
    components: {},
    methods: {
      startMove(e) {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },
      deleteGoods(e) {
        this.moveEndX = e.touches[0].pageX;
        this.moveEndY = e.touches[0].pageY;
        let X = this.moveEndX - this.startX;
        let Y = this.moveEndX - this.startY;
        if (X >= 100) {
          X = 0;
        }
        if (X <= -100) {
          X = -100;
        }
        this.tranX = X;
        if (Math.abs(X) > Math.abs(Y) && X > 0) {
          console.log("left 2 right");
        } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
          console.log("right 2 left");
        }
      },
      orderDown() {
        console.log(this.Listids.length);

        if (this.Listids.length == 0) {
          wx.showToast({
            title: "请选择商品",
            icon: "none",
            duration: 1500
          });
        }
      },
      async getListData() {
        const data = await get("/cart/cartList", {
          openId: this.userInfo.openId
        });
        this.listData = data.data;
        console.log(this.listData);
        console.log(this.Listids);
      },
      allCheck() {
        if (this.allcheck) {
          this.allcheck = false;
          this.Listids = [];
        } else {
          this.allcheck = true;
          this.Listids = this.listData;
        }
      },
      change(e) {},
      changeColor(index) {
        if (this.Listids[index]) {
          this.$set(this.Listids, index, false);
        } else {
          this.$set(this.Listids, index, true);
        }
      }
    },
    computed: {
      isCheckedNumber() {
        let number = 0;
        for (let i = 0; i < this.Listids.length; i++) {
          if (this.Listids[i]) {
            number++;
          }
        }
        console.log(number);

        if (number == this.listData.length && number != 0) {
          console.log("zzzz");

          this.allcheck = true;
        }
        console.log(this.allcheck);

        return number;
      },
      allPrise() {
        var Prise = 0;
        for (let i = 0; i < this.Listids.length; i++) {
          if (this.Listids[i]) {
            Prise = Prise + this.listData[i].retail_price * this.listData[i].number;
          }
        }
        return Prise;
      }
    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
