import _QTCode from 'https://cdn.skypack.dev/qrjs'

export default class QRCode extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    Object.keys(QRCode.defaultAttributes).forEach((attribute) => {
      this[attribute] =
        this.getAttribute(attribute) ?? QRCode.defaultAttributes[attribute]
    })
  }
  connectedCallback() {
    this.render()
  }

  static get defaultAttributes() {
    return {
      data: null,
      format: 'png',
      size: 5,
      margin: 4,
    }
  }

  static get observedAttributes() {
    return [data, format, size, margin]
  }

  getOptions() {
    const { size, margin } = this
    return {
      modulesize: size ?? Number(size),
      margin: margin ?? Number(margin),
    }
  }

  render() {
    if (this.format === 'png') {
      const src = _QTCode.generatePNG(this.data, this.getOptions())
      this.shadowRoot.innerHTML = `
      <img src='${src}' />
      `
    }
    if (this.format === 'svg') {
      const svg = _QTCode.generateSVG(this.data, this.getOptions())
      this.shadowRoot.appendChild(svg)
    }
  }
}

window.customElements.define('qr-code', QRCode)
