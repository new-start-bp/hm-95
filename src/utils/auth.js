const KEY='hm-95'


const setUser = (user) => {
  window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
// 获取用户信息
const getUser = () => {
  // 如果KEY对应没有信息，你获取的是null，你可以执行的代码：getUser().id 报错
  return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
// 删除用户信息
const delUser = () => {
  window.sessionStorage.removeItem(KEY)
}

export default { setUser, getUser, delUser }
