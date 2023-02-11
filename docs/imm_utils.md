# Immediate DOM Miscellaneous Utilities

Several utilities are available in `imm-dom` for convenience:

## Queries

In order to provide a framework for accessing higher level components, `imm-dom` provides a "query" mechanism for setting data attributes on parent nodes which also doubles as a more efficient way to `querySelector` the component set with `imm_set_qx`.

From `imm_query.js`:

| API Function | Arguments | Usage |
| --- | --- | --- |
| `imm_wchost` | `el` | Returns the root node host for the element. |
| `imm_id` | `el` | Sets a random ID on the element. |
| `imm_set_qx` | `key, el, ctx` | Sets `imm_id` on `el` and assigns a selector for it on the `ctx` [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) which defaults to `parentNode` of `el`. |
| `imm_qx` | `key, ctx` | Query selectors the closest element with the given dataset attribute for `key` (resolves to `data-{key}`) starting with `ctx`. |
| `imm_wcqx` | `key, ctx` | Query selectors the closest element with the given dataset attribute for `key` (resolves to `data-{key}`) starting with `ctx`, passing shadow boundaries as needed. |

### Example:

Given the following HTML (two "branches" of structure in the DOM):

```html
<h3>Tree</h3>
<div id="t" value="tree data"></div>
<div>
    <h3>Branch 1</h3>
    <div id="b1" value="branch 1 data"></div>
    <div id="c1"</div>
</div>
<div>
    <h3>Branch 2</h3>
    <div id="b2" value="branch 2 data"></div>
    <div id="c2"</div>
</div>
```

Use `imm_qx` to access higher level data providers:

```javascript
let $c1 = document.querySelector( '#c1' )
let $c2 = document.querySelector( '#c2' )

imm_set_qx( 'tree_provider', document.querySelector( '#t' ) )
imm_set_qx( 'branch_provider', document.querySelector( '#b1' ) )
imm_set_qx( 'branch_provider', document.querySelector( '#b2' ) )

console.log( 'Consumer in Branch 1 (get tree):', imm_qx( 'tree_provider', $c1 ).getAttribute( 'value' ) )
console.log( 'Consumer in Branch 1 (get branch):', imm_qx( 'branch_provider', $c1 ).getAttribute( 'value' ) )
console.log( 'Consumer in Branch 2 (get tree):', imm_qx( 'tree_provider', $c2 ).getAttribute( 'value' ) )
console.log( 'Consumer in Branch 2 (get branch):', imm_qx( 'branch_provider', $c2 ).getAttribute( 'value' ) )
```

## Dialogs

Convenience mechanism to provide an asynchronous API to `<dialog>` elements.

`imm_dialog` returns an interface with `emit( el, detail )` and `showModal( target, body )`.

Calling `showModal` returns a pending promise which resolves when the dialog is closed. If the dialog is closed with the event `resolve-dialog`, then the event's `detail` is passed along in the resolved promise, otherwise the resolution is `null`.

`emit` may be passed an event (internally will use `event.target`) or an element within the same branch as the dialog (in order to hook the event via bubbling).

The `target` argument serves as the container for the dialog. When the dialog is closed, it removes itself from the DOM.

### Example:

```javascript
import { html as h, imm_dialog } from 'imm-dom'

console.log( await imm_dialog.showModal( document.body, h.button({
    click: e => imm_dialog.emit( e, { some: 'cool data' } )
    , $: 'Click me.'
}) ) )
```

## Cloning

Convenience method for cloning from a `querySelector` and appending to the target. The query selector begins at the target's `ownerDocument` by default but may be changed with the third argument.

### Example:

Get a stylesheet by attribute (eg., copying a top-level CSS into a shadow DOM):

```javascript
import { imm_clone } from 'imm-dom'

imm_clone( this.shadowRoot, '[data-my-styles]', this.getRootNode().host )
```
