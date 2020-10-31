import {createWriteStream} from 'fs'
import {stat, readdir} from 'fs/promises'

const out_doc_path = process.argv[2]
const local_path = './esm'

stat_outputs()
  .then(show_stat_table)

async function stat_outputs() {
  let dir = await readdir(local_path)
  dir = dir
    .filter(e => e.includes('.mjs'))
    .sort()

  let by_name = {}

  for (let e of dir) {
    let {size} = await stat(`${local_path}/${e}`)

    let [name0, kind] = e.split('.mjs')
    let name = name0.replace(/\.min$/,'')
    kind = kind ? kind.replace(/^\./,'')
      : name === name0 ? 'raw' : 'min'

    let row = by_name[name] || {name: `\`${name}\``.padEnd(15)}
    row[kind] = `${size}`.padStart(6, ' ')
    by_name[name] = row
  }
  return by_name
}

async function show_stat_table(by_name) {
  let out = out_doc_path
    ? createWriteStream(out_doc_path)
    : process.stdout


  out.write(`# Size of Immediate-mode DOM tools\n`)
  out.write(`\n`)
  out.write(`| module          |  bytes |    min | gziped | brotli |\n`)
  out.write(`|:----------------|-------:|-------:|-------:|-------:|\n`)
  for (let o of Object.values(by_name))
    out.write(`| ${o.name} | ${o.raw} | ${o.min} | ${o.gz} | ${o.br} |\n`)
  out.write(`\n`)

  out.end()
}

