const DomNodeCollection  = require("./dom_node_collection.js");
const  functArray = [];

window.onload = () => {
  functArray.forEach((fun) => { fun(); });
};


window.s4 = function(selector) {
  if (selector instanceof Function){
    if (document.readyState === 'complete') {
      selector();
    } else {
      functArray.push(selector);
    }
    return;
  }

  let elementList;
  let myNode;
  if (selector instanceof HTMLElement){
    const arr = [selector];
    myNode = new DomNodeCollection(arr);
  }
  else {
    elementList = document.querySelectorAll(selector);
    const arr = [];
    elementList.forEach( (el) => {
      arr.push(el);
    });
    myNode = new DomNodeCollection(arr);
  }

  return myNode;

};

s4.extend = require("./extend.js");
s4.ajax = require("./ajax_utility.js");
