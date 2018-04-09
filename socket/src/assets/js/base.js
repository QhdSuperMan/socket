export function checkUser (user, password) {
  if (user.indexOf(' ') !== -1 || password.indexOf(' ') !== -1) {
    return '不允许有空格'
  }
  if (user.length > 10 || user.length < 6) {
    return '用户名长度在6-10之间'
  }
  if (password.length > 16 || password.length < 6) {
    return '密码长度长度在6-16之间'
  }
  return '正确'
}
