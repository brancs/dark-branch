const canvas = document.getElementById("snow-container")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray = []
const numberOfParticles = 20

function makeParticle(x, y) {
  const particle = {
    x,
    y,
    fillColor: `rgba(255, 255, 255, ${Math.random() * 0.9})`,
    size: Math.random() * 3 + 2,
    weight: Math.random() * 0.5 + 1,
    directionX: -1,
    speed: 0.3,
    update() {
      if (this.y > canvas.height) {
        this.y = 0 - this.size
        this.weight = Math.random() * 0.5 + 1
        this.x = Math.random() * canvas.width * 1.3
      }

      this.weight += 0.01
      this.y += this.weight * this.speed
      this.x += this.directionX * this.speed
    },
    draw() {
      ctx.fillStyle = this.fillColor
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }
  }

  return particle
}

function init() {
  particlesArray = []
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height

    particlesArray.push(makeParticle(x, y))
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.filter = 'blur(2px)';

  particlesArray.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(animate)
}

init()
animate()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})

const introWords = ["blood", "speed", "coffee", "life"]

function writeWords() {
  let count = 2
  setInterval(() => {
    if (count >= 5) {
      count = 1
    }
    const wordsContainer = document.getElementById("title")
    wordsContainer.textContent = introWords[count - 1]
    count ++
  }, 2000)
}

function initWords() {
  writeWords()
  window.removeEventListener("load", initWords)
}

window.addEventListener("load", initWords)

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}