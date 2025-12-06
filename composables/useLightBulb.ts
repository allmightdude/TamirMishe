export class LightBulbController {
  private elements: {
    bulb: HTMLElement | null
    bulbContainer: HTMLElement | null
    lightEffect: HTMLElement | null
    softwareSection: HTMLElement | null
    ropePath: SVGPathElement | null
    ropeSvg: SVGElement | null
  }

  private state = {
    isDragging: false,
    isLightOn: true,
    isDarkMode: false,
    startY: 0,
    currentY: 0,
    dragThreshold: 30,
    originalRopeLength: 30,
    maxDragDistance: 1,
    dragSensitivity: 0.1,
  }

  constructor() {
    this.elements = {
      bulb: document.getElementById('draggable-lightbulb'),
      bulbContainer: document.getElementById('light-bulb-container'),
      lightEffect: document.getElementById('light-effect'),
      softwareSection: document.getElementById('software-section'),
      ropePath: document.getElementById('rope-path') as SVGPathElement | null,
      ropeSvg: document.getElementById('rope-svg') as SVGElement | null,
    }

    this.init()
  }

  private init() {
    if (!this.elements.bulb) return

    this.bindEvents()
    this.turnOnLight()
  }

  private bindEvents() {
    this.elements.bulb!.addEventListener('mousedown', this.handleStart.bind(this))
    document.addEventListener('mousemove', this.handleMove.bind(this))
    document.addEventListener('mouseup', this.handleEnd.bind(this))

    this.elements.bulb!.addEventListener('touchstart', this.handleStart.bind(this))
    document.addEventListener('touchmove', this.handleMove.bind(this))
    document.addEventListener('touchend', this.handleEnd.bind(this))
  }

  private handleStart(e: MouseEvent | TouchEvent) {
    this.state.isDragging = true
    this.state.startY =
      e.type === 'touchstart' ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY

    this.elements.bulb!.style.cursor = 'grabbing'
    e.preventDefault()
  }

  private handleMove(e: MouseEvent | TouchEvent) {
    if (!this.state.isDragging) return

    this.state.currentY =
      e.type === 'touchmove' ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY

    const dragDistance = this.state.currentY - this.state.startY

    if (dragDistance > 0) {
      this.updateBulbPosition(dragDistance)
    }
  }

  private handleEnd() {
    if (!this.state.isDragging) return

    this.state.isDragging = false
    this.elements.bulb!.style.cursor = 'pointer'

    const dragDistance = this.state.currentY - this.state.startY

    if (dragDistance > this.state.dragThreshold) {
      this.toggleDarkMode()
    }

    this.resetPosition()
  }

  private updateBulbPosition(dragDistance: number) {
    const bulbMove = Math.min(dragDistance * this.state.dragSensitivity, this.state.maxDragDistance)

    if (this.elements.bulbContainer) {
      this.elements.bulbContainer.style.transform = `translateY(${bulbMove}px)`
    }

    if (this.elements.ropePath && this.elements.ropeSvg) {
      const ropeLength = this.state.originalRopeLength + 4 + bulbMove
      this.elements.ropeSvg.setAttribute('height', ropeLength.toString())
      this.elements.ropeSvg.setAttribute('viewBox', `0 0 4 ${ropeLength}`)

      const newPath = `M2 0 Q1 5 2 10 Q3 15 2 20 Q1 25 2 ${
        ropeLength - 5
      } Q3 ${ropeLength} 2 ${ropeLength}`
      this.elements.ropePath.setAttribute('d', newPath)
    }
  }

  private resetPosition() {
    const transition = 'transform 0.3s ease-out'

    if (this.elements.bulbContainer) {
      this.elements.bulbContainer.style.transition = transition
      this.elements.bulbContainer.style.transform = 'translateY(0px)'
    }

    // Reset rope
    if (this.elements.ropePath && this.elements.ropeSvg) {
      this.elements.ropeSvg.style.transition = 'height 0.3s ease-out'
      this.elements.ropeSvg.setAttribute('height', this.state.originalRopeLength.toString())
      this.elements.ropeSvg.setAttribute('viewBox', `0 0 4 ${this.state.originalRopeLength}`)
      this.elements.ropePath.setAttribute('d', 'M2 0 Q1 5 2 10 Q3 15 2 20 Q1 25 2 30')
    }

    setTimeout(() => {
      if (this.elements.bulbContainer) this.elements.bulbContainer.style.transition = ''
      if (this.elements.ropeSvg) this.elements.ropeSvg.style.transition = ''
    }, 300)
  }

  private toggleDarkMode() {
    this.state.isDarkMode = !this.state.isDarkMode

    if (this.state.isDarkMode) {
      this.elements.softwareSection!.style.background =
        'linear-gradient(to bottom right, #1a1a1a, #2d2d2d, #1a1a1a)'
      this.turnOffLight()
    } else {
      this.elements.softwareSection!.style.background =
        'linear-gradient(to bottom right, #1e3a8a, #1e40af, #1e3a8a)'
      this.turnOnLight()
    }
  }

  private turnOnLight() {
    this.state.isLightOn = true
    this.elements.bulb!.classList.remove('text-white')
    this.elements.bulb!.classList.add('text-yellow-300')

    this.elements.lightEffect!.style.background = `radial-gradient(circle 200px at 50% 0%, 
      rgba(255, 255, 150, 0.3) 0%, 
      rgba(255, 255, 100, 0.2) 20%, 
      rgba(255, 255, 50, 0.1) 40%, 
      transparent 70%)`
    this.elements.lightEffect!.style.opacity = '1'
  }

  private turnOffLight() {
    this.state.isLightOn = false
    this.elements.bulb!.classList.remove('text-yellow-300')
    this.elements.bulb!.classList.add('text-white')
    this.elements.lightEffect!.style.opacity = '0'
  }
}

export function useLightBulb() {
  const initLightBulb = () => {
    new LightBulbController()
  }

  return {
    initLightBulb,
  }
}
