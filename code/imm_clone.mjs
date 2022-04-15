
export class ImmClone extends HTMLElement {
  connectedCallback() { this.render() }
  render() {
    this.textContent = '' // inline clear children
    imm_clone(this, this.getAttribute('query'))
  }
}

export class ImmCloneEx extends ImmClone {
  static get observedAttributes() { return ['query'] }
  attributeChangedCallback() { this.render() }
}

export function imm_clone(el_tgt, query, el_root=el_tgt.ownerDocument) {
  for (let el of el_root.querySelectorAll(query || '[data-shadow]')) {
    el = (el.content || el).cloneNode(true)
    el_tgt.append(el)
  }
}

