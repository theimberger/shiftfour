const extend = require("./extend.js");

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
