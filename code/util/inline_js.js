import { rollup } from 'https://unpkg.com/@rollup/browser/dist/es/rollup.browser.js'
import { _qs_inline, _inline_all_done } from './_inline_util.js'
import { mime_js, as_dataurl } from './blob.js'


export const doc_inline_js = (el_root=window.document) =>
  _inline_all_done(el_root,
    ... _qs_inline(el_root, 'script', inline_script) )


export async function inline_script(el, opt={}) {
  const format = {'module':'es', '': 'iife', 'text/javascript': 'iife'}[el.type]
  if (!format.trim) return

  opt.format ??= format
  if (el.src) { // script with src url
    let js_code = await bundle_javascript(el.src, opt)
    el.textContent = ''
    el.src = await as_dataurl(mime_js, js_code)

  } else { // inline script
    let href = (el.ownerDocument ?? document).location.href
    let modules = new Map([[href, el.textContent]])
    let js_code = await bundle_javascript(modules, opt)
    el.textContent = js_code
  }
  return el
}

export async function bundle_javascript(input, opt) {
  let plugins = [_rpi_page_resolve, ... (opt.plugins || [])]

  if (input.get) {
    plugins.unshift(_rpi_page_inline(input))
    ;[input] = input.keys()
  }

  // from Rollup docs at https://rollupjs.org/faqs/#how-do-i-run-rollup-itself-in-a-browser
  let bundle = await rollup({ input, plugins })
  let result = await bundle.generate({ format: opt.format ?? 'es', ... opt?.output })
  return result.output[0].code
}

// from Rollup docs at https://rollupjs.org/faqs/#how-do-i-run-rollup-itself-in-a-browser
const _rpi_page_resolve = {
  name: 'page-url',
  resolveId(source, importer) {
    try { return new URL(source, importer).href }
    catch { return { id: source, external: true } } // Otherwise mark as external
  },
  async load(id) {
    let r = await fetch(id)
    r = await r.text()
    return r
  }
}

const _rpi_page_inline = modules => ({
  name: 'page-inline',
  load: id => modules.get(id),
  resolveId: (source, importer) =>
    modules.has(source) ? source : void 0,
})

