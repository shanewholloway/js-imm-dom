import { terser as rpi_terser } from 'rollup-plugin-terser'

let is_watch = process.argv.includes('--watch')
const _rpi_min_ = is_watch ? [] : [ rpi_terser() ]

export default [
  ... add_esm('imm_pxy'),
  ... add_esm('imm_raf'),

  ... add_esm('imm_async'),
  ... add_esm('imm_evt_core'),
  ... add_esm('imm_evt'),

  ... add_esm('imm_dom_core'),
  ... add_esm('imm_dom'),
  ... add_esm('imm_dom_ns'),
  ... add_esm('imm_css'),

  ... add_esm('imm_tmpl_core'),
  ... add_esm('imm_tmpl'),

  ... add_esm('imm_elem_core'),
  ... add_esm('imm_elem'),
  ... add_esm('imm_elem_raf'),
  ... add_esm('imm_clone'),
  ... add_esm('imm_qx'),
  ... add_esm('imm_dialog'),

  ... add_esm('beta/imm_elem_auto'),
  ... add_esm('beta/imm_elem_iter'),

  ... add_esm('index', 'imm_dom'),
]


function * add_esm(src_name, umd_module) {
  const input = `code/${src_name}.mjs`
  yield ({ input, plugins: [], output: [
      { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true },
      { file: `esm/${src_name}.js`, format: 'es', sourcemap: true },
      umd_module && { file: `umd/${umd_module}.js`, format: 'umd', name: umd_module, sourcemap: true },
    ].filter(Boolean)})

  yield ({ input, plugins: _rpi_min_, output: [
      { file: `esm/${src_name}.min.mjs`, format: 'es', sourcemap: false },
      { file: `esm/${src_name}.min.js`, format: 'es', sourcemap: false },
      umd_module && { file: `umd/${umd_module}.min.js`, format: 'umd', name: umd_module, sourcemap: false },
    ].filter(Boolean)})
}
