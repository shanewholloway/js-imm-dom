let _raf_p, _raf_set = new Set()

export function imm_raf(obj) {
  if (null != obj)
    _raf_set.add(obj)

  if (undefined === _raf_p)
    _raf_p = new Promise(requestAnimationFrame)
      .then(_raf_tick)
  return _raf_p
}

export const imm_raf_sym =
  imm_raf.sym =
    Symbol('imm_raf')

function _raf_tick() {
  let coll = [... _raf_set]
  _raf_set = new Set()
  _raf_p = void 0

  coll.map(_raf_notify)
  return imm_raf
}

async function _raf_notify(obj) {
  obj[await imm_raf_sym](imm_raf)
}

export default imm_raf
