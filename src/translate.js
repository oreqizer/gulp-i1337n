const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const generate = require("babel-generator").default;
const t = require("babel-types");
const gutil = require("gulp-util");

const PluginError = gutil.PluginError;

function translate(code, translations, options) {
  const oFunc = options.func || "__";
  const oStrict = Boolean(options.strict);

  const ast = babylon.parse(code);

  traverse(ast, {
    enter: function enter(path) {
      if (t.isCallExpression(path.node) && path.node.callee.name === oFunc) {
        if (path.node.arguments.length !== 1 || path.node.arguments[0].type !== "StringLiteral") {
          throw new PluginError(
            "gulp-i1337n",
            "Function expects exactly 1 argument of type string"
          );
        }

        const key = path.node.arguments[0].value;
        const maybeValue = translations[key];
        if (oStrict && !maybeValue) {
          throw new PluginError(
            "gulp-i1337n",
            `Missing translation in strict mode for key: ${key}`
          );
        }

        if (typeof maybeValue !== "string") {
          throw new PluginError("gulp-i1337n", "Translation value must be a string");
        }

        const value = maybeValue || key;
        path.replaceWith(t.stringLiteral(value));
      }
    },
  });

  return generate(ast, {}, code);
}

module.exports = translate;
