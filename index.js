/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const extend = function(objects) {
  const args = Array.from(arguments);
  const merged = {};

  args.forEach((obj) => {
    Object.keys(obj).forEach((key) =>{
      merged[key] = obj[key];
    });
  });

  return merged;
};

module.exports = extend;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection  = __webpack_require__(2);
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

  return myNode;

};

s4.extend = __webpack_require__(0);
s4.ajax = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
  var selectedList = document.querySelectorAll(selector);
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
  var callback = this.callbacks[type];
  this.callbacks[type] = null;
  this.arr.forEach( (ele) => {
    ele.removeEventListener(type, callback);
  });
};


module.exports = DomNodeCollection;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const extend = __webpack_require__(0);

const AjaxUtility = function(options){
  const defaults = {
    method: 'GET',
    url: "",
   success: (data) => {
     console.log("Success");
     console.log(data);
   },
   error: () => {
     console.error("Failure");
   }
  };

  options = extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);

  if (options.success) {
    xhr.onload = function (data) {
      return options.success(data);
    };
    if (options.failure) {
      xhr.onerror = function(data) {
        return options.failure(data);
      };
    }

    xhr.onabort = function(data) {
      return options.failure(data);
    };
  } else {
    return new Promise((resolve, reject) => {
      xhr.onload = function (data) {
        return resolve(data);
      };

      xhr.onerror = function(data) {
        return reject(data);
      };
      xhr.send(options.data);
    });
  }


  xhr.send(options.data);




};

module.exports = AjaxUtility;


/***/ })
/******/ ]);