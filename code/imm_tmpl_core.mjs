// _tkey prefix from valid custom element name of [4.13.3: Core concepts][WHATWG ]
//
// [WHATWG]: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts
const _tkey = 'I\u2133-'+Date.now(), _tqsel = '['+_tkey+']'

export function imm_tmpl_link(invoke_arg) {
  let wm_cache = new WeakMap()
  return (parts, ...args) => {
    // Return cloned template content with args expanded into keyed nodes

    let el = wm_cache.get(parts)
    if (!el)
      wm_cache.set(parts,
        el = _imm_tmpl_c(parts))

    el = el.content.cloneNode(true)
    let nodes = el.querySelectorAll(_tqsel)
    for (let idx=0; idx < nodes.length; idx++) {
      let tgt_elem = nodes[idx], a = args[idx]

      // remove the tag key -- intentionally ugly!
      tgt_elem.removeAttribute(tkey)

      // replace attribute
      invoke_arg(
        tgt_elem, tkey === tgt_elem.tagName,
        null == a ? a : a.valueOf(), i)
    }
    return el
  }
}

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

export function _imm_tmpl_r(parts, kinds) {
  // Render into template element with keyed attributes.

  // Concatenates `parts` with attribute or node
  // driven by corresponding `kind`

  let s='', i=0
  for (let p of parts) {
    s += p

    let pk = kinds[i] | 0

    // as attribute
    let pi = pk ? ` ${_tkey}=${i++}` : ''

    if (1 & pk) // as node
      pi = `<${_tkey} ${pi}></${_tkey}>`

    // join with attribute or node
    s += pi
  }

  // render into template innerHTML
  let el = document.createElement('template')
  el.innerHTML = s
  return el
}
