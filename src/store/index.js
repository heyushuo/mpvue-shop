import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityName: "定位中.."
  },
  mutations: {
    /**
     * 在main.js例引入
     * import store from './store/index'
     * 把store挂载到全局
     * Vue.prototype.$store = store;
     */

    /**
     * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
     * 使用方法 例:
     * this.$store.update({"cityName":"北京"})
     * 
     *  config需要传入对象
     * @param {*} state 
     * @param {*Object} config 
     */
    update(state, config) {
      Object.keys(config).map((item, key) => {
        state[item] = config[item]
      })
    }
  }
})

export default store;
