import { terser as rpi_terser } from 'rollup-plugin-terser'

const _rpi_min_ = [ rpi_terser() ]

export default [
  ... add_mjs('imm_pxy'),
  ... add_mjs('imm_raf'),

  ... add_mjs('imm_async'),
  ... add_mjs('imm_evt_core'),
  ... add_mjs('imm_evt'),

  ... add_mjs('imm_dom_core'),
  ... add_mjs('imm_dom'),
  ... add_mjs('imm_dom_ns'),
  ... add_mjs('imm_css'),

  ... add_mjs('imm_tmpl_core'),
  ... add_mjs('imm_tmpl'),

  ... add_mjs('imm_elem_core'),
  ... add_mjs('imm_elem'),
  ... add_mjs('imm_elem_raf'),

  ... add_mjs('beta/imm_elem_auto'),
  ... add_mjs('beta/imm_elem_iter'),

  ... add_mjs('index', 'imm_dom'),
]


function * add_mjs(src_name, umd_module) {
  const input = `code/${src_name}.mjs`
  yield ({ input, plugins: [], output: [
      { file: `esm/${src_name}.mjs`, format: 'es', sourcemap: true },
      umd_module && { file: `umd/${umd_module}.js`, format: 'umd', name: umd_module, sourcemap: true },
    ].filter(Boolean)})

  yield ({ input, plugins: _rpi_min_, output: [
      { file: `esm/${src_name}.min.mjs`, format: 'es', sourcemap: false },
      umd_module && { file: `umd/${umd_module}.min.js`, format: 'umd', name: umd_module, sourcemap: false },
    ].filter(Boolean)})
}
