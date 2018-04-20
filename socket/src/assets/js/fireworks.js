/* eslint-disable */
let canvas, cxt, ballBox, ballColorNum, timer, DianTime, dianBox, cw, ch, cx, cy, FlowerBox, FlowerSize, ballNum, randomTime, stop
// 参数 canvas对象，烟花的颜色数字
export default function fireworks(canvas,Color=3,size=15,num=50){
    canvas = canvas
    cxt = canvas.getContext('2d');
    ballBox = []
    ballColorNum = Color
    FlowerSize = size
    timer,DianTime
    dianBox = []
    ballNum = num
    cw = window.innerWidth
    ch =  window.innerHeight
    cx = cw / 2
    cy = ch / 2
    FlowerBox = []
    canvas.width = cw
    canvas.height = ch
    init()
    canvas.onclick = function (e) {
        FlowerBox.push(new flower(e.offsetX, e.offsetY))
        if (dianBox.length > 1) {
        dianBox.shift()
        }
    }
    window.onresize = function () {
        cw = window.innerWidth
        ch =  window.innerHeight
        cx = cw / 2
        cy = ch / 2
        canvas.width = cw
        canvas.height = ch
        init()
    }
    document.addEventListener("visibilitychange", function(e){
        if(document.hidden){
            clearInterval(randomTime)
            window.cancelAnimationFrame(stop)
        }else{
            drawRandom()
            animate()
        }
    }, false);
    window.cancelAnimationFrame(stop)
    animate()
// 随机在画布上面画几个小点
    clearInterval(randomTime)
    drawRandom()
}
function drawRandom(){
    randomTime = setInterval(() => {
        dianBox = []
        cxt.clearRect(0,0,cw,ch)
        init()
        for(let i = 0; i < 10; i++) {
        let obj = {
            x: random(0 + 50, cw - 50),
            y: random(0 + 50, ch - 50)
        }
        dianBox.push(obj)
        }
        drawDian(dianBox)
        setTimeout(() => {
            saveFlower()
            clearInterval(DianTime)
            cxt.clearRect(0, 0, cw, ch)
            init()
        } ,1000)
    }, 3000)
}
// 绘制随机的小点
function drawDian(val){
  init()
  let r = 10
  DianTime=setInterval(() => {
    cxt.clearRect(0,0,cw,ch)
    init()
    if (r == 10) {
      r = 5
    }else{
      r = 10
    }
    val.forEach((val) => {
      cxt.beginPath()
      cxt.strokeStyle = 'white'
      cxt.arc(val.x, val.y, r, 0, 2*Math.PI, 0)
      cxt.stroke()
      cxt.closePath()
    })
  }, 200)
}
// 初始化画布
function init(){
    cxt.beginPath()
    cxt.fillStyle = 'rgb(51,52,51)'
    cxt.fillRect(0, 0, cw, ch)
    cxt.closePath()
}
// 选取小球的颜色
function addColor(num){
    let result = []
    for(let i = 0; i < num; i++){
        result.unshift(`${random(0,256)}, ${random(0,256)}, ${random(0,256)}`)
    }
    return result
}
// 画小球
function drawBall(cx, cy, colorBox, size){
    cxt.clearRect(0, 0, cw, ch)
    init()
    for(let i = 0; i < ballNum; i++){
        ballBox.push(new ball(cx, cy, colorBox[random(0, colorBox.length)]))
    }
    ballBox.forEach((val) => {
        cxt.beginPath()
        cxt.fillStyle = val.color
        cxt.arc(val.x, val.y, 1, 0, 2*Math.PI,0)
        cxt.fill()
        cxt.closePath()
    })
    clearInterval(timer)
    timer = setInterval(() => {
        ballBox=ballBox.filter((val) => {
            val.run()
            cxt.beginPath()
            cxt.fillStyle = val.color
            cxt.arc(val.x, val.y, val.size, 0, 2*Math.PI, 0)
            cxt.fill()
            cxt.closePath()
    if(val.opacity<0){
      cxt.clearRect(0, 0, cw, ch)
      init()
    }
    return val.opacity > 0
        })
    },50)
}
// 小球类
function ball(cx, cy, color){
    this.x = random(cx-FlowerSize,cx+FlowerSize);
    this.y = random(cy-FlowerSize,cy+FlowerSize);
    this.speedX = (this.x-cx) !== 0 ? this.x-cx : 1
    this.speedY = (this.y-cy) !== 0 ? this.y-cy : 1
    this.opacity = 1
    this.size = 1
    this.rgb = color
    this.color = `rgba(${this.rgb}, ${this.opacity})`
    this.run = function () {
        this.size += 0.2 
        this.x = this.x + this.speedX
        this.y = this.y + this.speedY
        this.opacity -= 0.1
        this.color = `rgba(${this.rgb}, ${this.opacity})`
        this.speedY += 2
    }
}
// 存烟花类
function  saveFlower(){
    dianBox.forEach((val) => {
        FlowerBox.push(new flower(val.x, val.y))
    })
}
// 烟花类
function flower(x, y){
    this.x = cx
    this.y = cy
    this.endX = x
    this.endY = y
    this.color = 'white'
    this.spendX = (this.endX-this.x)/50
    this.spendY = (this.endY-this.y)/50
    this.state = true
    this.run = function(){
        this.x += this.spendX
        this.y += this.spendY
        if (this.spendX > 0){
            if (this.x > this.endX) {
                this.state = false
                drawBall(this.endX, this.endY, addColor(ballColorNum))
            }
        }else{
            if(this.x < this.endX){
                this.state = false
                drawBall(this.endX, this.endY, addColor(ballColorNum))
            }
        }
    }
}
function random (a, b) {
    return Math.floor(Math.random() * (b - a) + a)
}
function animate () {
    FlowerBox = FlowerBox.filter((val) => {
        cxt.beginPath()
        cxt.fillStyle = val.color
        cxt.arc(val.x, val.y, 1, 0, 2*Math.PI, 0)
        cxt.fill()
        cxt.closePath()
        val.run()
        return val.state == true
    })
    stop = requestAnimationFrame(animate)
}