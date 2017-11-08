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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection  = __webpack_require__(1);
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
  else { //string with css selector
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

  // step 3 - register a callback
  xhr.onload = function () {
    // console.log(xhr.status); // for status info
    // console.log(xhr.responseType); //the type of data that was returned
    // console.log(xhr.response); //the actual response. For json api calls, this will be a json string
    return options[success]();
  };

  // step 4 - send off the request with optional data
  xhr.send();
};


//


/***/ }),
/* 1 */
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
    resultArray.push(ele.children);
  });
  return new DomNodeCollection(resultArray);
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
  selectedList.forEach( (el) => {
  arr.push(el); });
  return new DomNodeCollection(arr);
};

DomNodeCollection.prototype.remove = function(selector) {
  this.find(selector).arr.forEach( (el) => el.remove() );
};

DomNodeCollection.prototype.append = function(futureChild) {
  //switch for string, one HTML element
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


/***/ })
/******/ ]);