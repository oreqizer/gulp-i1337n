const test = require("tape");

const translate = require("../src/translate");

const code = `
  function asd() {
    const v = __('kek');
    const k = t('lol');
    return v.toUpperCase();
  }
`;

test("translate - base", t => {
  const res = translate(code, { kek: "bur" }, {}).code;

  t.ok(res.includes("bur"), "key was not translated");
  t.ok(res.includes("lol"), "key was accidentally translated");
  t.ok(!res.includes("__("), "func was not replaced");
  t.end();
});

test("translate - custom func", t => {
  const res = translate(code, { lol: "rofl" }, { func: "t" }).code;

  t.ok(res.includes("kek"), "key was accidentally translated");
  t.ok(res.includes("rofl"), "key was not translated");
  t.ok(!res.includes("t("), "func was not replaced");
  t.end();
});

test("translate - strict", t => {
  t.throws(() => translate(code, {}, { strict: true }), /missing translation/);
  t.end();
});

test("translate - bad value", t => {
  t.throws(() => translate(code, { kek: null }, {}), /a string/);
  t.end();
});
