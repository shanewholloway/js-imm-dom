import rpi_terser from '@rollup/plugin-terser'
//import rpi_jsy from '@jsy-lang/jsy/esm/rollup.js'

let is_watch = process.argv.includes('--watch')
const external = [ /http[s]?:\/\//, ]

const _rpi_xform_ = [] //[ rpi_jsy() ]
const _rpi_min_ = is_watch ? [] : [ rpi_terser() ]

export default [
  ... add_esm('imm_tiny'),

  ... add_esm('imm_pxy'),
  ... add_esm('imm_raf'),

  ... add_esm('imm_async'),
  ... add_esm('imm_evt_core'),
  ... add_esm('imm_evt'),

  ... add_esm('imm_dom_core'),
  ... add_esm('imm_dom'),
  ... add_esm('imm_dom_ns'),
  ... add_esm('imm_svg'),
  ... add_esm('imm_xhtml'),
  ... add_esm('imm_css'),

  ... add_esm('imm_htag'),
  ... add_esm('imm_h1'),
  ... add_esm('imm_h'),

  ... add_esm('imm_tmpl_core'),
  ... add_esm('imm_tmpl'),

  ... add_esm('imm_elem_core'),
  ... add_esm('imm_elem_model'),
  ... add_esm('imm_elem'),
  ... add_esm('imm_elem_raf'),
  ... add_esm('imm_clone'),
  ... add_esm('imm_qx'),
  ... add_esm('imm_legacy'),
  ... add_esm('imm_dialog'),

  ... add_esm('beta/imm_elem_auto'),
  ... add_esm('beta/imm_elem_iter'),

  ... add_esm('util/blob'),
  ... add_esm('util/inline_page'),
  ... add_esm('util/inline_js'),
  ... add_esm('util/inline_css'),
  ... add_esm('util/inline_json'),

  ... add_esm('index', 'imm_dom'),
]


function * add_esm(src_name, umd_module) {
  const input = `code/${src_name}.js`
  const output = [ { file: `esm/${src_name}.js`, plugins: [], format: 'es', sourcemap: true } ]

  if (!is_watch) {
    output.push({ file: `esm/${src_name}.min.js`, plugins: _rpi_min_, format: 'es', sourcemap: false })

    if (umd_module)
      output.push(
        { file: `umd/${umd_module}.js`, plugins: [], format: 'umd', name: umd_module, sourcemap: true },
        { file: `umd/${umd_module}.min.js`, plugins: _rpi_min_, format: 'umd', name: umd_module, sourcemap: false },
      )
  }

  yield {input, plugins: _rpi_xform_, external, output}
}
