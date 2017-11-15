const DomNodeCollection  = require("./dom_node_collection.js");
const  functArray = [];

window.onload = () => {
  functArray.forEach((fun) => { fun(); });
};


window.$l = function(selector) {
  if (selector instanceof Function){
    if (document.readyState === 'complete') {
      selector();
    } else {
      functArray.push(selector);
    }
    return;
  }

  var elementList = document.querySelectorAll(selector);
  if (selector instanceof HTMLElement){
    const arr = [];
    elementList.forEach( (el) => {
      arr.push(el);
    });
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

  return myNode;

};


$l.extend = function(objects) {
  const args = Array.from(arguments);
  const merged = {};

  args.forEach((obj) => {
    Object.keys(obj).forEach((key) =>{
      merged[key] = obj[key];
    });
  });

  return merged;
};

$l.ajax = function(options){
  const defaults = {
    type: 'GET',
    url: "",
   success: (data) => {
     console.log("Success");
     console.log(data);
   },
   error: () => {
     console.error("Failure");
   }
  };

  options = this.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options[type],options[url]);

  xhr.onload = function () {
    return options[success]();
  };

  xhr.send();
};
