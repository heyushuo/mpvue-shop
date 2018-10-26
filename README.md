# mpvue 仿网易严选
**2018 年 10 月 26 日 :** 在src目录下新增了**minxins文件夹**,这里主要为了解决跳转同一个页面数据数据没有初始化问题,全局添加混合组件,不需要再每个页面onload的时候进行初始化数据了
	
	//在main.js里引入此混合组件
    //全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
	import MyPlugin from './minxins'
	Vue.use(MyPlugin)

**2018 年 9 月 13 日 :**  新增了**VUEX**的引入,在store问价夹里
并且在首页的城市获取,和自己选择城市的页面中使用了VUEX,**大家可以参考mpvue中如何引入和使用vuex的**


**2018 年 9 月 6 日 :**  在首页顶部新增搜索以及引入高德地图api

**1.用户同意获取授权和用户不同意获取授权两种情况**

![](https://user-gold-cdn.xitu.io/2018/9/6/165af1268bc30e93?imageslim)
![](https://user-gold-cdn.xitu.io/2018/9/6/165af12af41b68d6?imageslim)


**2018 年 9 月 5 日 :** 在商品详情页面新增商品转发功能(分享功能)

![Image text](https://github.com/heyushuo/mpvue-shop/blob/master/images/goods.png)

**2018 年 8 月 30 日 :** 好多人反映登录无法登录,因为这个需要自己配置后台才可以,为了可以让大家体验登录后的一些操作,在这里我**添加了默认用户,大家可以体验其他功能!**
这里可能会遇到问题:**大家都是使用的这一个账号,添加购物车,收藏还有一些收货地址之类的可能会显示很多人添加的,我会定期删除线上默认用户的这些信息,** **抓紧 clone 最新的代码体验**

# 大家也可以自己默认账户信息

    大家也可以在App.vue设置自己的默认账户信息(这样就不会和大家冲突了)
    openId修改为一个唯一的值就行

    var userInfo = {"openId":"oQmbb4sNZdxaUQZ0sfYgvtOP2S7c","nickName":"何玉硕","gender":1,"language":"zh_CN","city":"Changping","province":"Beijing","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132","watermark":{"timestamp":1535513485,"appid":"wx601ce71bde7b9add"}};
      var openId = userInfo.openId;
      wx.setStorageSync("userInfo", userInfo);
      wx.setStorageSync("openId", openId);

# 前言

一直打算自己写接口,写一个上线的小程序,数据方面总是无从下手，无意中发现一个网友爬取的网易严选商城的一些数据大概一共有 20 张左右的表,算是相当详细了(对其中部分表的字段和部分数据进行了修改,)平时写项目大部分用的 vue,所以直接选择了 mpvue 开发,后端一开始打算用 php 但是学了半个月感觉需要学的东西太多,短时间里写不出这个线上小程序,最后决定用 node 来开发提供接口。

## 此项目仅供学习参考

# 技术站

前端：小程序、mpvue、async、await

后端：Node、koa2、mysql、knex.js 操作数据库,可视化工具使用的 Navicat

## 运行方法

    npm install 下载依赖
    npm run dev  运行项目
    这里部分项目的接口都可以访问了,但是登录接口不可以,只有本地搭建一套才可以使用登录接口
    因为你用的自己的Appi打开微信开发者工具,无法调用我这边的登录,我后台默认是自己的Appid

# 目前上线状态

由于域名备案小程序暂时无法上线,但是**小程序的服务端已经上线,接口都是访问的线上接口**,你只需要把源码克隆到本地,**直接在微信开发者工具中,就能请求到数据,看到效果** ,备案通过后会把二维码添加进来

# 喜欢的希望大家点个 star 鼓励一下,谢谢大家的支持!!!!

# 商城主要实现的功能

* 首页、专题、分类、购物车、我的
* 小程序授权登陆获取用户信息
* 首页包含品牌制造页、品牌制造详情页面、新品首发页面、人气推荐页面、各分类列表
* 商品详情页面，包含常见问题、大家都在看商品列表、加入购物车、收藏商品、立即购买、下订单、选择收货地址
* 搜索功能，包含历史记录、热门搜索、搜索后列表展示、模糊搜索提示
* 商品列表部分包含综合、价格高低进行排序
* 专题功能，包含专题详情、专题推荐列表
* 分类，包含左边大分类和右边详细分类
* 购物车，包含商品单选全选、左滑删除商品、下订单等功能
* 地址管理，包含新建地址和导入微信地址，地址编辑、左滑删除、设置默认地址
* 我的页，包含我的收藏、地址管理、意见反馈

# 部分效果展示

### 1.首页展示和专题页效果

![](https://user-gold-cdn.xitu.io/2018/8/27/165793588dd8808f?w=323&h=571&f=gif&s=3649872)
![](https://user-gold-cdn.xitu.io/2018/8/25/165717735a9e3c60?w=327&h=573&f=gif&s=3983502)

### 2、分类页面，分类子页面以及搜索功能、搜索列表、历史记录、模糊搜索提示

![](https://user-gold-cdn.xitu.io/2018/8/25/1657185090f5d3cd?w=327&h=573&f=gif&s=884918)
![](https://user-gold-cdn.xitu.io/2018/8/25/1657188bf2746d85?w=327&h=573&f=gif&s=585295)

### 3、购物车功能添加购物车,单选多选,删除和商品收藏功能

![](https://user-gold-cdn.xitu.io/2018/8/25/165719656d9bdb5b?w=327&h=573&f=gif&s=1979300)
![](https://user-gold-cdn.xitu.io/2018/8/25/165719e76bd00f05?w=327&h=573&f=gif&s=1770550)

### 4、地址管理

![](https://user-gold-cdn.xitu.io/2018/8/25/165719e2d9b28ee1?w=327&h=573&f=gif&s=611343)

# 小程序后端送门 [点击进入小程序服务端地址](https://github.com/heyushuo/mpvue-shop-node)

# 项目总结和遇到的一些问题 # [点击进入博客查看详情](https://juejin.im/post/5b6323baf265da0f5511533a)

# 最后

* 喜欢的记得点个 star,鼓励一下谢谢哈!!
* 微信号 hys838723
* qq 群号 647099996
