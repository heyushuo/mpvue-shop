<template>
  <div class="my">
    <div class="myinfo">
      <img src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="">
      <div>
        <p>何玉硕</p>
        <p>微信用户</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    login
  } from '../../utils'
  export default {
    created() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {
        this.userInfo = login();
      }
    },
    data() {
      return {
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
      };
    },
    components: {},
    methods: {

    },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
