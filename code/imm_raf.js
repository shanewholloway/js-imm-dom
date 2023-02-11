export const imm_raf_sym =
  imm_raf.sym = Symbol.for('imm_raf')

let _raf_p=0, _raf_map = new Map()

export function imm_raf(obj, x) {
  if (null != obj && !_raf_map.has(obj))
    _raf_map.set(obj, x)

  if (0 === _raf_p)
    _raf_p = new Promise(requestAnimationFrame)
      .then(_raf_tick)
  return _raf_p
}

function _raf_tick() {
  let coll = [... _raf_map.entries()]
  _raf_map = new Map()
  _raf_p = 0

  coll.map(_raf_notify)
}

async function _raf_notify([obj, x]) {
  obj[await imm_raf_sym](imm_raf, x) }

export default imm_raf
