const {
  mysql
} = require('../../mysql');

async function submitAction(ctx) {
  const {
    openId,
    name,
    content,
    phone
  } = ctx.request.body;


}

module.exports = {
  submitAction
}
