import {tag} from './imm_dom.js'
export * from './imm_dom.js'

import {immq} from './imm_query.js'
export * from './imm_query.js'

import {imm_parse} from './imm_parse.js'
export * from './imm_parse.js'


export function _imm_css_link() {
  let [,,el_style,el] = immq('*', imm_parse('<style>'))
  let wm_cache = new WeakMap()
  return (parts, ...args) => {
    if ('string' === typeof parts)
      parts = [parts]

    let valid = wm_cache.get(parts)
    if (undefined === valid)
      wm_cache.set(parts,
        valid = _css_valid(
          parts.join('var(--z);')))

    if (!valid)
      throw SyntaxError('imm_css invalid template')

    let i, s=''+parts[0], len=Math.min(args.length, parts.length-1), z=el.style
    for (i=0; i<len; i++) {
      // use style.setProperty to use the browser to parse and validate css values
      z.setProperty('--v', args[i])
      s += z.getPropertyValue('--v') + parts[i+1]
    }
    z.removeProperty('--v')
    return s
  }

  function _css_valid(css_sz) {
    el.style = css_sz
    let valid = !! el.style.cssText
    el.style = '' // clear state

    if (!valid) {
      el_style.innerText = css_sz
      valid = 0 !== el_style.sheet.cssRules.length
      el_style.innerText = '' // clear state
    }

    return valid
  }
}

export const imm_css = /* #__PURE__ */
  _imm_css_link()

export const imm_style = (...args) =>
  tag('style', imm_css(...args))

export {
  imm_css as default,
  imm_css as css,
  imm_style as style
}
