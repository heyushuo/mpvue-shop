<template>
  <div class="search">
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" confirm-type="search" v-model="words" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
      </div>
      <div>取消</div>
    </div>
    <div class="searchtips" v-if="words">
      <div v-if="tipsData.length!=0" v-for="(item,index) in tipsData" :key="index">
        {{ item.name }}
      </div>
      <div v-if="tipsData.length==0" class="nogoods">
        数据库暂无此类商品...
      </div>
    </div>
    <div class="history">
      <div class="t">
        <div>历史记录</div>
        <div></div>
      </div>
      <div class="cont">
        <div>
          szzdfsdf
        </div>
      </div>
    </div>
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div v-for="(item,index) in hotData" :class="{active:0==index}" :key="index">
          {{item.keyword}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    getOpenid
  } from "../../utils";
  export default {

    created() {
      this.getHotData();
      // getOpenid()
      this.openid = wx.getStorageSync('openid') || "";
    },
    data() {
      return {
        words: "",
        historyData: [],
        hotData: [],
        tipsData: [],
        openid: ""

      };
    },
    components: {},
    methods: {
      async searchWords() {
        conssole.log(11111)
        const data = await post("/search/addHistoryAction", {
          openid: this.openid,
          words: this.words
        })
        console.log(data)
      },
      async getHotData(first) {
        const data = await get("/search/indexaction");
        this.hotData = data.hotKeywordList;
      },
      async tipsearch() {
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
