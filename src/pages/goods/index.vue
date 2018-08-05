<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
        <p>￥{{info.retail_price}}</p>
        <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>

    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">
        商品参数
      </div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
    </div>
    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']">

        </div>

      </div>
      <div @click="toCart">
        <div class="car">
          <span>
            {{number}}
          </span>
          <img src="../../../static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="bug">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>
    <!-- 选择规格部分 -->
    <div v-show="showpop" class="pop">

    </div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格￥{{info.retail_price}}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div @click="showType" class="close">
          X
        </div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div @click="reduce" class="cut">-</div>
          <input class="number" disabled="" v-model="number" />
          <div @click="add" class="add">+</div>
        </div>
      </div>
    </div>

    <!-- 选择规格部分 -->
  </div>
</template>

<script>
  import {
    get,
    post,
    toLogin,
    login
  } from "../../utils";
  import wxParse from "mpvue-wxparse";

  export default {
    created() {
      //判断是否登录获取用户信息
      if (login()) {
        this.userInfo = login();
      }
    },
    mounted() {
      this.id = this.$root.$mp.query.id;
      this.goodsDetail();
      console.log(this.id);
    },
    data() {
      return {
        collectFlag: false,
        number: 1,
        showpop: true,
        gallery: [],
        info: {},
        brand: {},
        attribute: [],
        goods_desc: "",
        id: "",
        userInfo: "",
        goodsId: ""
      };
    },
    components: {
      wxParse
    },
    methods: {
      add() {
        this.number = this.number + 1;
      },
      reduce() {
        if (this.number > 1) {
          this.number = this.number - 1;
        } else {
          return false;
        }
      },
      bug() {
        if (toLogin()) {}
      },
      async collect() {
        if (toLogin()) {
          this.collectFlag = !this.collectFlag;
          const data = await post("/collect/addcollect", {
            openId: this.userInfo.openId,
            goodsId: this.goodsId
          });
        }
      },
      async addCart() {
        if (toLogin()) {
          const data = await post("/cart/addCart", {
            openId: this.userInfo.openId,
            goodsId: this.goodsId,
            number: this.number
          })
          //添加成功后
          if (data) {
            wx.showToast({
              title: "添加购物车成功",
              icon: "success",
              duration: 1500
            });
          }

        }
      },
      toCart() {
        wx.navigateTo({
          url: '/pages/cart/main'
        });
      },
      async goodsDetail() {
        const data = await get("/goods/detailaction", {
          id: this.id
        });
        this.gallery = data.gallery;
        this.info = data.info;

        this.goodsId = data.info.id;
        this.brand = data.brand;
        this.attribute = data.attribute;
        this.goods_desc = data.info.goods_desc;
      },
      showType() {
        this.showpop = !this.showpop;
        console.log(this.showpop);
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  .wxParse .p {
    margin: 0 !important;
  }

  @import "./style.scss";

</style>
