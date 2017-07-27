const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const generate = require("babel-generator").default;
const t = require("babel-types");

function translate(code, translations, options) {
  const oFunc = options.func || "__";
  const oStrict = Boolean(options.strict);

  const ast = babylon.parse(code);

  traverse(ast, {
    enter: function enter(path) {
      if (t.isCallExpression(path.node) && path.node.callee.name === oFunc) {
        if (path.node.arguments.length !== 1 || path.node.arguments[0].type !== "StringLiteral") {
          throw new Error("[gulp-i1337n] function expects exactly 1 argument of type string");
        }

        const key = path.node.arguments[0].value;
        const maybeValue = translations[key];
        if (oStrict && !maybeValue) {
          throw new Error(`[gulp-i1337n] missing translation in strict mode for key: ${key}`);
        }

        const value = maybeValue || key;
        path.replaceWith(t.stringLiteral(value));
      }
    },
  });

  return generate(ast, {}, code);
}

module.exports = { translate };
