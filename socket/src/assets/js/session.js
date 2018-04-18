// 参数是与自己交流的usename
export function getHistory (user) {
  /* eslint-disable-next-line */
  return JSON.parse((sessionStorage.getItem(user) ? sessionStorage.getItem(user) : "[]"))
}

export function setHistory (user, history) {
  if (history.length === 0) {
    return
  }
  if (history.length > 30) {
    history = history.slice(history.length - 50, history.length)
  }
  sessionStorage.setItem(user, JSON.stringify(history))
}

export function deleteHistory () {
  for (let i in sessionStorage) {
    sessionStorage.removeItem(i)
  }
}
