/* eslint-disable no-eval */
const test = require("tape");
const gutil = require("gulp-util");
const es = require("event-stream");

const gulpI1337n = require("../src");

test("gulp-i1337n", t => {
  t.throws(() => gulpI1337n(), "didn't throw on missing translations");

  const fake = new gutil.File({
    contents: new Buffer("__('kek');")
  });

  const plugin = gulpI1337n({ kek: "bur" });

  plugin.write(fake);
  plugin.once("data", file => {
    t.ok(file.isBuffer());

    const contents = file.contents.toString("utf8");
    t.equal(eval(contents), "bur");
    t.end();
  });
});

test("gulp-i1337n - null", t => {
  const fake = new gutil.File(null);

  const plugin = gulpI1337n({ kek: "bur" });

  plugin.write(fake);
  plugin.once("data", file => {
    t.equal(fake, file, "input file should equal output file");
    t.end();
  });
});

test("gulp-i1337n - stream", t => {
  const fake = new gutil.File({
    contents: es.readArray(["some", "stream"])
  });

  const plugin = gulpI1337n({ kek: "bur" });

  t.throws(() => plugin.write(fake));
  t.end();
});
