var through = require("through2");
var gutil = require("gulp-util");

var translate = require("./translate");

var PluginError = gutil.PluginError;

function gulpI1337n(translations, options) {
  var oOptions = options || {};

  if (typeof translations !== "object") {
    throw new PluginError("gulp-i1337n", "Translations must be an object");
  }

  return through.obj(function throughObj(file, encoding, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError("gulp-i1337n", "Streams not supported"), null);
      return;
    }

    var res = translate(file.contents.toString(), translations, oOptions);

    // eslint-disable-next-line no-param-reassign
    file.contents = new Buffer(res.code);

    cb(null, file);
  });
}

module.exports = gulpI1337n;
