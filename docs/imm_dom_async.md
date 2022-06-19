# Immediate DOM Async Manipulation API

## Examples

##### Using `imma` from `imm_dom_async.mjs`

```javascript
imma(
  h.div('Placeholder')
  render_api_response(),
  { click: evt => console.log("CLICK") })

async function render_api_response() {
  let ans = await fetch('/some/rest/json_api')
  let txt = JSON.stringify(await ans.json(), null, 2)
  return h.pre(h.code(txt))
}
```

## Docs

### Module `imm_dom_async.mjs`

`imma(el_placeholder : HTMLElement, el_promise : Promise<HTMLElement>, attributes) : HTMLElement`
- Use given placeholder DOM element until promised DOM content is resolved. Returns `el_placeholder`.
  After the promise is fulfilled, invokes `el_placeholder.replaceWith(result)` to substitue in the promised `result` after calling `imm(result, attrs)` .

