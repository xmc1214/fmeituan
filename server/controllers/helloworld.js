const { mysql } = require('../qcloud')


module.exports = async ctx => {
var userId = 1
  // 增
  var user = {
 
    username:"xmq",
    password:'qwe'
  }
  await mysql("userInfo").insert(user)
  await mysql("userInfo").update({username:'谢名丞'}).where({userId})

  var res = await mysql("userInfo").where({ userId }).first()
  
  ctx.state.data = res
}