<template>
  <div class="order">
    <div @click="toAddressList" v-if="address.name" class="address">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.name}}</span>
              <div v-if="address.is_default" class="moren">
                默认
              </div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.address+address.address_detail}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toAdd" v-else class="seladdress">
      请选择收货地址
    </div>
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{allprice}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
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
      </div>
    </div>
    <div class="bottom">
      <div>
        实付 : ￥{{allprice}}
      </div>
      <div @click="pay">
        支付
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
      if (wx.getStorageSync("addressId")) {
        this.addressId = wx.getStorageSync("addressId");
      }
      this.openId = getStorageOpenid();

      this.getDetail();
    },
    created() {},
    mounted() {},
    data() {
      return {
        addressId: "",
        openId: "",
        allprice: "",
        listData: [],
        address: {}
      };
    },
    components: {},
    methods: {
      pay() {
        wx.showToast({
          title: "支付功能暂未开发", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: false, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      },
      toAddressList() {
        wx.navigateTo({
          url: "/pages/addressSelect/main"
        });
      },
      toAdd() {
        wx.navigateTo({
          url: "/pages/addaddress/main"
        });
      },
      async getDetail() {
        const data = await get("/order/detailAction", {
          openId: this.openId,
          addressId: this.addressId
        });
        console.log(data);

        if (data) {
          this.allprice = data.allPrise;
          this.listData = data.goodsList;
          this.address = data.address;
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
