// 星空连线接收五个参数
// canvas的dom元素。宽度x(number),高度y(number)，小球数量num(number) ，密度radius(number)
let mark = false
export default function Bgcanvas (canvas, x, y, num, radius, addNumber = 5) {
  canvas.width = x
  canvas.height = y
  if (mark) {
    /* eslint-disable */
    window.cancelAnimationFrame(stop)
  }
  mark = true
  let mouseX, mouseY, clickX, clickY
  let cxt = canvas.getContext('2d')
  let ballBox = []
  canvas.onmousemove = function (e) {
    mouseX = e.offsetX
    mouseY = e.offsetY
  }
  canvas.onclick = function (e) {
    clickX = e.offsetX
    clickY = e.offsetY
    if (ballBox.length > 300) {
        return 
    }
    for (let i = 0; i < addNumber; i++) {
      ballBox.push(new Ball(x, y, clickX, clickY))
    }
  }
  // 小球类
  function Ball (x, y, addX, addY) {
    this.x = addX || randomNum(3, x - 3)
    this.y = addY || randomNum(3, y - 3)
    this.r = randomNum(1, 3)
    this.speedX = randomNum(-2, 2)
    this.speedY = randomNum(-2, 2)
    this.color = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`
  }
  // 生成小球
  for (let i = 0; i < num; i++) {
    let val = new Ball(x, y)
    ballBox.push(val)
  }
  // 画小球
  Ball.prototype.draw = function () {
    cxt.beginPath()
    cxt.fillStyle = this.color
    cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, 0, 0)
    cxt.globalAlpha = 1
    cxt.fill()
    cxt.closePath()
  }
  // 小球移动
  Ball.prototype.move = function () {
    this.x = this.x + this.speedX
    this.y = this.y + this.speedY
    if (this.x > x - this.r || this.x < 0 + this.r) {
      this.speedX = -this.speedX
    }
    if (this.y > y - this.r || this.y < 0 + this.r) {
      this.speedY = -this.speedY
    }
  }
  // 动画运动
  function run () {
    cxt.clearRect(0, 0, x, y)
    ballBox.forEach((val) => {
      val.draw()
      val.move()
    })
    // 鼠标画线
    drawMouseLine()
    // 小球画线
    drawLine()
    stop = window.requestAnimationFrame(run)
  }
  function drawLine () {
    for (let i = 0; i < ballBox.length; i++) {
      for (let j = 0; j < ballBox.length; j++) {
        if (Math.sqrt(Math.pow((ballBox[i].x - ballBox[j].x), 2) + Math.pow((ballBox[i].y - ballBox[j].y), 2)) < radius) {
          cxt.beginPath()
          cxt.moveTo(ballBox[i].x + ballBox[i].r / 2, ballBox[i].y + ballBox[i].r / 2)
          cxt.lineTo(ballBox[j].x + ballBox[j].r / 2, ballBox[j].y + ballBox[j].r / 2)
          cxt.strokeStyle = 'white'
          cxt.globalAlpha = 0.2
          cxt.stroke()
          cxt.closePath()
        }
      }
    }
  }
  function drawMouseLine () {
    for (let i = 0; i < ballBox.length; i++) {
      if (Math.sqrt(Math.pow((ballBox[i].x - mouseX), 2) + Math.pow((ballBox[i].y - mouseY), 2)) < radius) {
        cxt.beginPath()
        cxt.moveTo(ballBox[i].x + ballBox[i].r / 2, ballBox[i].y + ballBox[i].r / 2)
        cxt.lineTo(mouseX, mouseY)
        cxt.strokeStyle = 'white'
        cxt.globalAlpha = 0.2
        cxt.stroke()
        cxt.closePath()
      }
    }
  }
  run()
}
function randomNum (a, b) {
  let box = Math.floor(Math.random() * (b - a) + a)
  return box === 0 ? 1 : box
}
