const {
    mysql
} = require('../../mysql');

module.exports = async (ctx) => {
    //轮播数据
    const banner = await mysql('nideshop_ad').where({
        ad_position_id: 1
    }).select();
    //类型
    const channel = await mysql('nideshop_channel').select();
    //类型
    //这几个id有商品详情
    const newGoods = await mysql('nideshop_goods').whereIn('id', [1181000, 1135002, 1134030, 1134032]).andWhere("is_new", 1).select();

    // const newGoods = await mysql('nideshop_goods').where("is_new", 1).limit(7).select();
    /**
     * 热门商品
     * 选择对象的列字段
     * retail_price  零售价
     * goods_brief   简明描述
     */
    const hotGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief').where({
        is_hot: 1
    }).limit(5).select();
    /**
     * 品牌列表
     */
    const brandList = await mysql('nideshop_brand').where({
        is_new: 1
    }).orderBy("new_sort_order", 'asc').limit(4).select();
    /**
     * 主题列表
     */
    const topicList = await mysql('nideshop_topic').limit(3).select();
    /**
     * 类别列表
     */
    //1.查询到所有的主类别
    const categoryList = await mysql('nideshop_category').where({
        parent_id: 0
    }).select();
    //2.查询住类别对应的子类别
    const newCategoryList = [];


    for (let i = 0; i < categoryList.length; i++) {
        var item = categoryList[i];
        let childCategoryIds = await mysql('nideshop_category').where({
            parent_id: item.id
        }).column('id').select();
        //需要变成数组形式childCategoryIds [1020000,1036002]
        childCategoryIds = childCategoryIds.map((item) => {
            return item.id;
        })
        //在商品中找到 在childCategoryIds里的七条数据
        const categoryGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price').whereIn('category_id', childCategoryIds).limit(7).select();
        newCategoryList.push({
            "id": item.id,
            "name": item.name,
            "goodsList": categoryGoods
        })
    }
    //这里如果使用map就无法使用await了
    // categoryList.map((item) => {

    // })

    ctx.body = {
        "banner": banner,
        "channel": channel,
        "newGoods": newGoods,
        "hotGoods": hotGoods,
        "brandList": brandList,
        "topicList": topicList,
        "newCategoryList": newCategoryList,
        "message": null,
        "success": true
    }

}