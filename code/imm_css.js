
// #__NO_SIDE_EFFECTS__
function _imm_cssx() {
  var _wm_cache = new WeakMap()

  // use DOMParser for a full document so that cssRules populate
  var _el = new DOMParser().parseFromString('<!DOCTYPE html><style></style>','text/html').head.lastChild
  var _zy=_el.style
  var _try_css = css_sz => (_el.style = css_sz, _el.textContent = css_sz)
  var _css_prop = v => ( _zy.setProperty('--v', v), v && _zy.getPropertyValue('--v') )


  return function imm_css(parts, ...args) {
    // use <style> textContent and style property for browser-based validation
    var i, res, _valid=_wm_cache.get(res=parts)
    if (null == _valid) {
      var {style:[a], sheet:{cssRules: [b]}} =
        _try_css(parts.trim ? parts : parts.join('var(--z);'))

      _try_css('')
      _wm_cache.set(parts, _valid = a || b ? 1 : 0)
    }

    if (!_valid)
      throw SyntaxError('imm_css invalid template')

    if (!res.trim) {
      // if not a string, use speedy indexed for loop
      for (i=0, res=''; i<parts.length; i++) {
        // use style.setProperty to use the browser to parse and validate css values
        res += parts[i] + _css_prop(args[i])
      }
      _css_prop('')
    }
    return res
  }
}

export const imm_css = /* #__PURE__ */
  _imm_cssx()


export {
  imm_css as default,
  imm_css as css,
}

