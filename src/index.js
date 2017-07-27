const through = require("through2");
const gutil = require("gulp-util");

const translate = require("./translate");

const PluginError = gutil.PluginError;

function gulpI1337n(translations, options) {
  const oOptions = options || {};

  if (typeof translations === "object") {
    throw new PluginError("gulp-i1337n", "Translations must be an object");
  }

  return through.obj((file, encoding, cb) => {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isBuffer()) {
      // TODO
    }

    if (file.isStream()) {
      // TODO
    }

    cb(null, file);
  });
}

module.exports = gulpI1337n;
