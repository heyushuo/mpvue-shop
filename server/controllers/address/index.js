const {
  mysql
} = require("../../mysql");

/**
 * 添加或者跟新收货地址
 * @param {*} ctx
 */
async function saveAction(ctx) {
  var addressId = ctx.request.body.addressId;
  const {
    userName,
    telNumber,
    address,
    detailadress,
    checked,
    openId
  } = ctx.request.body;

  //如果是默认选中
  //先在数据库查询是否默认的地址
  if (checked) {
    const isDefault = await mysql("nideshop_address").where({
      user_id: openId,
      is_default: 1
    });
    if (isDefault.length > 0) {
      await mysql("nideshop_address")
        .where({
          user_id: openId,
          is_default: 1
        })
        .update({
          is_default: 0
        });
    }
  }


  if (!addressId) {
    //添加地址
    const data = await mysql("nideshop_address").insert({
      name: userName,
      mobile: telNumber,
      address: address,
      address_detail: detailadress,
      user_id: openId,
      is_default: checked == "true" || checked ? 1 : 0
    });
    if (data) {
      ctx.body = {
        data: true
      };
    } else {
      ctx.body = {
        data: false
      };
    }
  } else {
    // console.log(checked == "true" || checked ? 1 : 0);
    // console.log(addressId);

    //跟新地址
    const data = await mysql("nideshop_address")
      .where({
        id: addressId
      })
      .update({
        name: userName,
        mobile: telNumber,
        address: address,
        address_detail: detailadress,
        user_id: openId,
        is_default: checked == "true" || checked ? 1 : 0
      });
    if (data) {
      ctx.body = {
        data: true
      };
    } else {
      ctx.body = {
        data: false
      };
    }
  }
}

/**
 * 收货地址列表
 * @param {*} ctx
 */
async function getListAction(ctx) {
  var openId = ctx.query.openId;
  const addressList = await mysql("nideshop_address")
    .where({
      user_id: openId
    }).orderBy('is_default', 'desc')
    .select();

  ctx.body = {
    data: addressList
  };
}

/**
 * 获取收货地址详情
 * @param {*} ctx
 */
async function detailAction(ctx) {
  var id = ctx.query.id;
  const detailData = await mysql("nideshop_address")
    .where({
      id: id
    })
    .select();

  ctx.body = {
    data: detailData[0]
  };
}

/**
 * 删除收货地址
 * @param {*} ctx
 */
async function deleteAction(ctx) {
  var id = ctx.query.id;
  const delData = await mysql("nideshop_address")
    .where({
      id: id
    })
    .del();
  if (delData) {
    ctx.body = {
      data: true
    };
  } else {
    ctx.body = {
      data: false
    };
  }

}

module.exports = {
  saveAction,
  getListAction,
  detailAction,
  deleteAction
};