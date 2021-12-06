# Immediate DOM Event API

## Examples

#### Using `imm` and `imm_emit`

```javascript
imm(document.body, {
  my_awesome_event(evt) { // short for elem.addEventListener('my_awesome_event', ...)
    console.log('My awesome custom event', evt.detail)
  },
})

// ... later
imm_emit(some_elem, 'my_awesome_event',
  {ts: new Date, answer: 1942})
```


### Module `imm_evt_core.mjs`

- `imm_emit(target : HTMLElement, evt : string, detail, opt) : Boolean`
  Dispatches custom event with detail from target element
  with `{bubbling:true, cancelable: true}`

- `imm_wcemit(target : HTMLElement, evt : string, detail, opt) : Boolean`
  Dispatches custom event with detail from target element
  with `{composed: true, bubbling:true, cancelable: true}`

- `imm_emit_at(target : HTMLElement, evt : string, detail, opt) : Boolean`
  Dispatches custom event with detail from target element.

- `imm_emit0(target : HTMLElement, evt : string, opt) : Boolean`
  Dispatches `new CustomEvent(evt, opt)` from target element


### Module `imm_async.mjs`

- `imm_fence() : {fence(), resume(), abort()}`
  Returns a fence -- a resetting deferred.

  ```javascript
  let fnc = imm_fence()

  fnc.fence()
    .then(ans => {
      console.log('Fence resolved', {ans})
      return fnc.fence()
    })
    .then(ans => {
      console.log('Fence again', {ans})
    })

  fnc.resolve(1942)
  setTimeout(fnc.resolve, 100, 'after timeout')
  ```

- `imm_defer() : {promise, resolve(), reject()}`
  Returns a new deferred in named form.

  ```javascript
  let d = imm_defer()
  d.promise.then(ans =>
    console.log('Deferred resolved', {ans}))

  d.resolve(2142)
  ```

- `imm_defer_v() : [promise, resolve(), reject()]`
  Returns a new deferred in tuple form.

  ```javascript
  let [promise, resolve, reject] = imm_defer()
  promise.then(ans =>
    console.log('Deferred resolved', {ans}))

  resolve(2142)
  ```

- `imm_defer_ctx(as_res)`
  Implementation for `imm_defer`, `imm_defer_v`, and `imm_fence`
  with callback for result format.

