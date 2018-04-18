export function addClass (el, CN) {
  if (!hasClass(el, CN)) {
    let classBox = el.className.split(' ')
    classBox.push(CN)
    el.className = classBox.join(' ')
  }
}

export function hasClass (el, CN) {
  let classBox = el.className.split(' ')
  for (let i = 0; i < classBox.length; i++) {
    if (classBox[i] === CN) {
      return true
    }
  }
  return false
}
export function removeClass (el, CN) {
  let classBox = el.className.split(' ')
  for (let i = 0; i < classBox.length; i++) {
    if (classBox[i] === CN) {
      classBox.splice(i, 1)
      el.className = classBox.join(' ')
      return
    }
  }
}
