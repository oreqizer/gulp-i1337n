var babylon = require("babylon");
var traverse = require("babel-traverse").default;
var generate = require("babel-generator").default;
var t = require("babel-types");
var gutil = require("gulp-util");

var PluginError = gutil.PluginError;

function translate(code, translations, options) {
  var oFunc = options.func || "__";
  var oStrict = Boolean(options.strict);

  var ast = babylon.parse(code, {
    plugins: ["jsx", "flow"]
  });

  traverse(ast, {
    enter: function enter(path) {
      if (t.isCallExpression(path.node) && path.node.callee.name === oFunc) {
        if (path.node.arguments.length !== 1 || path.node.arguments[0].type !== "StringLiteral") {
          throw new PluginError(
            "gulp-i1337n",
            "Function expects exactly 1 argument of type string"
          );
        }

        var key = path.node.arguments[0].value;
        var maybeValue = translations[key];
        if (oStrict && !(key in translations)) {
          throw new PluginError(
            "gulp-i1337n",
            "Missing translation in strict mode for key: " + key
          );
        }

        if (typeof maybeValue !== "string") {
          throw new PluginError("gulp-i1337n", "Translation value must be a string");
        }

        var value = maybeValue || key;
        path.replaceWith(t.stringLiteral(value));
      }
    }
  });

  return generate(ast, {}, code);
}

module.exports = translate;
