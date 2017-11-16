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
