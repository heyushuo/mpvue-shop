<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <!--  -->
      <div class="item" @touchstart="startMove" @touchmove="deleteGoods" @touchend="endMove" :data-index="index" v-for="(item,index) in listData" :key="index">
        <div class="con" :style="item.textStyle">
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

        <div @click="delGoods(item.id)" class="delete" :style="item.textStyle1">
          <div>
            删除
          </div>
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
import { get, login } from "../../utils";
export default {
  onShow() {
    if (login()) {
      this.userInfo = login();
      this.getListData();
    }
  },
  created() {},
  data() {
    return {
      allcheck: false,
      listData: [],
      Listids: [],
      userInfo: {},
      tranX: 0,
      tranX1: 0,
      startX: "",
      startY: "",
      moveX: "",
      moveY: "",
      moveEndX: "",
      moveEndY: "",
      X: 0,
      Y: ""
    };
  },
  components: {},
  methods: {
    initTextStyle() {
      //滑动之前先初始化数据
      for (var i = 0; i < this.listData.length; i++) {
        this.listData[i].textStyle = "";
        this.listData[i].textStyle1 = "";
      }
    },
    startMove(e) {
      this.initTextStyle();
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      var index = e.currentTarget.dataset.index;
      console.log(index);
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        // transform:'translateX(' + tranX + 'rpx)'
        console.log("heyushuo");

        console.log(this.listData[index].textStyle);

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        console.log(this.listData[index].textStyle1);
        // this.listData = this.listData;
      }
      // if (Math.abs(this.X) > Math.abs(this.Y) && this.X > 20) {
      //   this.scrollflag = false;
      // } else if (Math.abs(this.X) > Math.abs(this.Y) && this.X < 20) {
      //   console.log("right 2 left");
      // }
    },
    endMove(e) {
      var index = e.currentTarget.dataset.index;
      if (this.X > -50) {
        this.tranX1 = 0;
        this.tranX = 0;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -100;
        this.tranX = -100;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
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
    async delGoods(id) {
      var _this = this;
      wx.showModal({
        title: "",
        content: "是否要删除该收货地址",
        success: function(res) {
          if (res.confirm) {
            const data = get("/address/deleteAction", {
              id: id
            }).then(() => {
              _this.getAddressList();
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
            //滑动之前先初始化样式数据
            _this.initTextStyle();
          }
        }
      });
    },
    async getListData() {
      const data = await get("/cart/cartList", {
        openId: this.userInfo.openId
      });
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].textStyle = "";
        data.data[i].textStyle1 = "";
      }
      this.listData = data.data;
      console.log(this.listData);
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
      if (number == this.listData.length && number != 0) {
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
