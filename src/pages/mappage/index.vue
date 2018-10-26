<template>
  <div class="mappage">
    <div class="section">
      <input @input="bindInput" placeholder="搜索" v-model="keywords" focus="true" />
    </div>
    <scroll-view :scroll-y="true" class="addcont" style="height: 500rpx;">
      <div class="result" @touchstart="bindSearch(item.name)" v-for="(item, index) in tips" :key="index">
        {{item.name}}
      </div>
    </scroll-view>

    <div class="map_container">
      <div class="title">
        显示当前位置:
      </div>
      <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="16" :markers="markers"></map>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { mapMutations } from "vuex";
export default {
  created() { },
  mounted() {
    this.getMapaddress();
  },
  data() {
    return {
      tips: [],
      keywords: "",
      longitude: "",
      latitude: "",
      markers: []
    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),
    bindInput: function (e) {
      var _this = this;
      var keywords = this.keywords;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getInputtips({
        keywords: keywords,
        location: "",
        success: function (data) {
          console.log(data);

          if (data && data.tips) {
            _this.tips = data.tips;
          }
        }
      });
    },
    bindSearch: function (cityName) {
      console.log(cityName);
      // wx.setStorageSync("cityName", cityName);
      this.update({ cityName: cityName });
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    getMapaddress() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        iconPath: "/static/images/marker.png",
        iconWidth: 22,
        iconHeight: 32,
        success: function (data) {
          console.log(data);
          var marker = [
            {
              id: data[0].id,
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              iconPath: data[0].iconPath,
              width: data[0].width,
              height: data[0].height
            }
          ];
          _this.markers = marker;
          _this.latitude = data[0].latitude;
          _this.longitude = data[0].longitude;
        },
        fail: function (info) {
          // wx.showModal({title:info.errMsg})
        }
      });
    },
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
