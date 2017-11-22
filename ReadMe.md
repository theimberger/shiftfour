# shiftFour
shiftFour is a lightweight JavaScript library inspired by jQuery.  It allows users to create
DomNodeCollection instances using the primary function, s4.  These instances provide the user a number of
helpful methods, such as #css(property, value), #append, #remove, and #on and #off event listener functions.

Check out a [demo](https://theimberger.github.io/shiftfour_demo/)
(you can see the demo repo [here](https://github.com/theimberger/shiftfour_demo)).

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

### DomNodeCollection
The central class in s4.  Takes a CSS selector and returns an instance of DomNodeCollection.  As
a DomNodeCollection, elements have access to the following methods:

* #html(string) - changes the innerHTML of the element(s) of the collection to the given string
* #empty() - clears the inner HTML of the element(s)
* #addClass(className) - adds the given class to the element(s)
* #removeClass(className) - removes the given class to the element(s)
* #attr(name, value) - sets the given attribute of the element(s) to the given value
* #children - returns an array of children of the element(s)
* #parent - returns the parent of the element(s)
* #last - returns the last element of the collection
* #first - returns the first element of the collection
* #find(selector) - returns elements in the collection with the given selector
* #remove(selector) - removes elements from the collection with the given selector.  If no selector is given, removes the entire collection
* #append(child) - adds the given child to the collection
* #css(property, value) - sets the given css property to the given value
* #on(event, callback) - adds an event listener to the element(s)
* #off(event) - removes the event listener to the element(s)
