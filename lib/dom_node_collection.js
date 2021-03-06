function DomNodeCollection(arr) {
  this.arr = arr;
  this.callbacks = {};
}

DomNodeCollection.prototype.html = function(str) {
  if (!str) {
    return this.arr[0].innerHTML;
  } else {
    this.arr.forEach((el) => {
      el.innerHTML = str;
    });
  }
};

DomNodeCollection.prototype.empty = function() {
  this.arr.forEach((el) => {
    el.innerHTML = "";
  });
};

DomNodeCollection.prototype.addClass = function(name) {
  this.arr.forEach( (ele) => {
    ele.className += " " + name ;
  });
};

DomNodeCollection.prototype.removeClass = function(name) {
  this.arr.forEach( (ele) => {
    ele.className = ele.className.replace(name, "");
  });
};

DomNodeCollection.prototype.attr = function(name, value) {
  if (!value) {
    const attrArray = [];
    this.arr.forEach( (ele) => {
      attrArray.push(ele[name]);
    });
    return attrArray;
  }
  else {
    this.arr.forEach( (ele) => {
      ele[name] = value;
    });
  }
    return this.arr;
};

DomNodeCollection.prototype.children = function() {
  const resultArray = [];
  this.arr.forEach((ele) => {
    resultArray.push(ele);
  });
  return resultArray;
};

DomNodeCollection.prototype.last = function() {
  let last = this.arr[this.arr.length - 1];
  return new DomNodeCollection([last]);
};

DomNodeCollection.prototype.first = function() {
  let first = this.arr[0];
  return new DomNodeCollection([first]);
};

DomNodeCollection.prototype.parent = function() {
  const resultArray = [];
  this.arr.forEach((ele) => {
    resultArray.push(ele.parentNode);
  });
  return new DomNodeCollection(resultArray);
};

DomNodeCollection.prototype.find = function(selector) {
  let selectedList = document.querySelectorAll(selector);
  const arr = [];
  selectedList.forEach( (el) => {arr.push(el); });
  return new DomNodeCollection(arr);
};

DomNodeCollection.prototype.remove = function(selector) {
  if (selector === undefined){
    this.parent().remove(this);
  }
  if (selector instanceof DomNodeCollection) {
    selector.arr.forEach( (el) => el.remove() );
  } else {
    this.find(selector).arr.forEach( (el) => el.remove() );
  }
};

DomNodeCollection.prototype.append = function(futureChild) {

  if (futureChild instanceof HTMLElement) {
    this.arr.forEach( (ele) => {
      ele.innerHTML += futureChild.outerHTML;
    });
  } else if (typeof futureChild === "string") {
    this.arr.forEach( (ele) => {
      ele.innerHTML += futureChild;
    });
  } else if (futureChild instanceof DomNodeCollection) {
    this.arr.forEach( (ele) => {
      futureChild.arr.forEach((ele2) => {
        ele.innerHTML += ele2.outerHTML;
      });
    });
  }
};

DomNodeCollection.prototype.css = function(property, value) {
  this.arr.forEach((ele) => {
    ele.style[property] = value;
  });
};

DomNodeCollection.prototype.on = function (type, callback) {
  this.callbacks[type] = callback;
  this.arr.forEach( (ele) => {
    ele.addEventListener(type,callback);
  });
};

DomNodeCollection.prototype.off = function (type) {
  let callback = this.callbacks[type];
  this.callbacks[type] = null;
  this.arr.forEach( (ele) => {
    ele.removeEventListener(type, callback);
  });
};


module.exports = DomNodeCollection;
