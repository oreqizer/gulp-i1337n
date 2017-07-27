/* eslint-disable no-eval */
const test = require("tape");

const translate = require("../src/translate");

test("translate - base", t => {
  const res = translate("__('kek');", { kek: "bur" }, {}).code;

  t.equal(eval(res), "bur", "key was not translated");
  t.ok(!res.includes("__("), "func was not replaced");
  t.end();
});

test("translate - custom func", t => {
  const res = translate("t('kek');", { kek: "bur" }, { func: "t" }).code;

  t.equal(eval(res), "bur", "key was not translated");
  t.ok(!res.includes("t("), "func was not replaced");
  t.end();
});

test("translate - strict", t => {
  t.throws(() => translate("__('kek');", {}, { strict: true }), /Missing translation/);
  t.end();
});

test("translate - bad value", t => {
  t.throws(() => translate("__('kek');", { kek: null }, {}), /a string/);
  t.end();
});
