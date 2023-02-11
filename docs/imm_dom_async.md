# Immediate DOM Async Manipulation API

## Examples

##### Using `imma` from `imm_dom_async.js`

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

##### Complex example in a pub/sub type environment

```javascript
import { imm, imma, html as h, ImmElem, imm_defer_v } from "imm-dom";

class Client extends ImmElem {
  n = 0;
  queue = {};

  async handleRequest() {
    // get a deferred promise
    const [p, res] = imm_defer_v();
    // track the resolve function with an id since we don't know when the response will get handled
    const id = `_${this.n++}`;
    this.queue[id] = res;
    // fire off the request (eg. something like websockets)
    window.api.send("channel", { id });
    // return an element to swap out with the placeholder when the promise is resolved
    return h.p(await p);
  }

  handleClick(e) {
    // append a load indicator which will be swapped out after the promise resolves in this.handleRequest
    imm(this, imma(h.p("Loading..."), this.handleRequest()));
  }

  handleResponse(e) {
    // find a queued resolver for the imm-dom async renderer by id and call it with data
    const fn = this.queue[e.data.id];
    fn && fn(e.data);
  }

  render0() {
    // set up api response handler
    window.api.onReceive("channel", e => this.handleResponse(e));
    // returning true here will trigger the next render cycle (regular #render)
    return true;
  }

  render() {
    // basic button to kick the request off
    return h.button({
      click: e => this.handleClick(e),
      $: "Talk to API"
    });
  }
}

// define the web component (light dom)
Client.dom("my-client");
```

## Docs

### Module `imm_dom_async.js`

`imma(el_placeholder : HTMLElement, el_promise : Promise<HTMLElement>, attributes) : HTMLElement`

- Use given placeholder DOM element until promised DOM content is resolved. Returns `el_placeholder`.
- After the promise is fulfilled, invokes `el_placeholder.replaceWith(result)` to substitue in the promised `result` after calling `imm(result, attrs)`.