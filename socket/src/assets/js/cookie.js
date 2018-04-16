export function getUsename (id) {
  let cookieStr = document.cookie.split(';')
  for (let i = 0; i < cookieStr.length; i++) {
    let item = cookieStr[i].split('=')
    if (item[0] === id) {
      return decodeURI(item[1])
    }
  }
  return ''
}
