import { _imm_clone } from './imm_clone.js'
export { _imm_clone } from './imm_clone.js'

// _tkey prefix from valid custom element name of [4.13.3: Core concepts][WHATWG ]
//
// [WHATWG]: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts
const _tkey = 'I\u2133-'+Date.now(), _tqsel = '['+_tkey+']', _ttype = 'text/x-'+_tkey

// #__NO_SIDE_EFFECTS__
export function imm_tmpl_link(invoke_arg) {
  let wm_cache = new WeakMap()
  return (parts, ...args) => {
    // Return cloned template content with args expanded into keyed nodes

    let el = wm_cache.get(parts)
    if (!el)
      wm_cache.set(parts,
        el = _imm_tmpl_c(parts))

    el = _imm_clone(el)
    for (let tgt_elem of el.querySelectorAll(_tqsel)) {
      // remove the tag key -- intentionally ugly!
      let idx = + tgt_elem.getAttribute(_tkey)
      tgt_elem.removeAttribute(_tkey)

      let a = args[+idx]

      // update/replace target node with arg
      invoke_arg(
        tgt_elem, _ttype === tgt_elem.type,
        null == a ? a : a.valueOf(), idx)
    }
    return el
  }
}

// #__NO_SIDE_EFFECTS__
export function _imm_tmpl_c(parts) {
  // Compile into template element with keyed attributes and nodes

  // render all as attributes
  let kinds = Array(parts.length - 1).fill(2)
  let el0 = _imm_tmpl_r(parts, kinds)

  // reset mark node as default rendering
  kinds.fill(1)

  // mark found attributes
  for (let each of el0.content.querySelectorAll(_tqsel))
    kinds[+each.getAttribute(_tkey)] = 2

  // render correctly as node or attribute
  return _imm_tmpl_r(parts, kinds)
}

// #__NO_SIDE_EFFECTS__
export function _imm_tmpl_r(parts, kinds) {
  // Render into template element with keyed attributes.

  // Concatenates `parts` with attribute or node
  // driven by corresponding `kind`

  let s='', i=-1
  for (let p of parts) {
    s += p

    let pk = kinds[++i] | 0
    if (pk) {
      // as attribute
      let pi = ` ${_tkey}=${i}`

      if (1 & pk) // as node
        pi = `<SCRIPT type='${_ttype}' ${pi}>\<\/SCRIPT>`

      // join with attribute or node
      s += pi
    }
  }

  // render into template innerHTML
  let el = document.createElement('template')
  el.innerHTML = s
  return el
}
