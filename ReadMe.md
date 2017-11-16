# shiftFour
shiftFour is a lightweight JavaScript library inspired by jQuery.  It allows users to create
DomNodeCollection instances using the primary function, s4.  These instances provide the user a number of
helpful methods, such as #css(property, value), #append, #remove, and #on and #off event listener functions.

## s4
The primary method for shiftFour, takes in either a selector or a function.  Queues functions to fire when
document is loaded or returns a DomNodeCollection instance with HTML elements with the given selector.

```javascript
s4 = function(selector) {
  if (selector instanceof Function){
    if (document.readyState === 'complete') {
      selector();
    } else {
      functArray.push(selector);
    }
    return;
  }

  var elementList;
  if (selector instanceof HTMLElement){
    const arr = [selector];
    var myNode = new DomNodeCollection(arr);
  }
  else {
    elementList = document.querySelectorAll(selector);
    const arr = [];
    elementList.forEach( (el) => {
      arr.push(el);
    });
    myNode = new DomNodeCollection(arr);
  }
}
```
