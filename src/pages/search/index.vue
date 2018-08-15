<template>
  <div class="search">
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" confirm-type="search" focus="true" v-model="words" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
        <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
        <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
          alt="">
      </div>
      <div>取消</div>
    </div>
    <div class="searchtips" v-if="words">
      <div @click="searchWords" v-if="tipsData.length!=0" :data-value="item.name" v-for="(item,index) in tipsData" :key="index">
        {{ item.name }}
      </div>
      <div v-if="tipsData.length==0" class="nogoods">
        数据库暂无此类商品...
      </div>
    </div>
    <div class="history" v-if="historyData.length!=0">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory">

        </div>
      </div>
      <div class="cont">
        <div @click="searchWords" :data-value="item.keyword" v-for="(item,index) in historyData" :key="index">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div @click="searchWords" v-for="(item,index) in hotData" :data-value="item.keyword" :class="{active:0==index}" :key="index">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <!--商品列表  -->
    <div v-if="listData.length!=0" class="goodsList">
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合</div>
        <div @click="changeTab(1)" class="price" :class="[1==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">价格</div>
        <div @click="changeTab(2)" :class="[2==nowIndex ?'active':'']">分类</div>
      </div>
      <div class="sortlist">
        <div @click="goodsDetail(item.id)" v-for="(item, index) in listData" :key="index" class="item">
          <img :src="item.list_pic_url" alt="">
          <p class="name">{{item.name}}</p>
          <p class="price">￥{{item.retail_price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    post,
    get,
    getOpenid
  } from "../../utils";
  export default {

    created() {
      this.openid = wx.getStorageSync('openid') || "";
      this.getHotData();
    },
    data() {
      return {
        nowIndex: 0,
        words: "",
        historyData: [],
        hotData: [],
        tipsData: [],
        listData: [],
        openid: "",
        order: "",
        isHot: "",
        isNew: "",

      };
    },
    components: {},
    methods: {
      clearInput() {
        this.words = '';
        this.listData = [];
        this.tipsData = []
      },
      async getlistData() {
        //获取商品列表
        const data = await get("/search/helperaction", {
          keyword: this.words,
          order: this.order
        });
        this.listData = data.keywords;
        this.tipsData = []
      },
      changeTab(index) {
        this.nowIndex = index;
        if (index == 1) {
          this.order = this.order == "asc" ? "desc" : "asc";
        } else {
          this.order = "";
        }
        this.getlistData();
      },
      async clearHistory() {
        const data = await post("/search/clearhistoryAction", {
          openId: this.openid
        })
        console.log(data)
        if (data) {
          this.historyData = [];
        }
      },
      async searchWords(e) {
        var vaule = e.currentTarget.dataset.value
        this.words = vaule || this.words;
        const data = await post("/search/addhistoryaction", {
          openId: this.openid,
          keyword: vaule || this.words
        })
        console.log(data)
        //获取历史数据
        this.getHotData()
        //获取商品列表
        this.getlistData();

      },
      async getHotData(first) {
        const data = await get("/search/indexaction?openId=" + this.openid);
        this.hotData = data.hotKeywordList;
        this.historyData = data.historyData;
      },
      async tipsearch(e) {
        const data = await get("/search/helperaction", {
          keyword: this.words
        });
        this.tipsData = data.keywords;
      },
      topicDetail(id) {
        wx.navigateTo({
          url: "/pages/topicdetail/main?id=" + id
        });
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
