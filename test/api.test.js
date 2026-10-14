const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/server');

test('HTTP contract and deployment entry point', async (t) => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const expected = { unix: 1451606400, natural: 'January 01, 2016' };
  for (const alias of ['ts', 'timestamp', 'timestring', 'v1/ts', 'v1/timestamp', 'v1/timestring']) {
    for (const date of ['1451606400', 'January%201,%202016', '2016-01-01']) {
      const response = await fetch(`${base}/api/${alias}/${date}`);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), expected);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal(response.headers.get('access-control-allow-origin'), '*');
    }
  }
  for (const value of ['random', 'February%2030,%202016', '9999999999999999999999']) {
    assert.deepEqual(await (await fetch(`${base}/api/ts/${value}`)).json(), { unix: null, natural: null });
  }
  assert.equal((await (await fetch(`${base}/api/ts/0`)).json()).unix, 0);
  const current = await (await fetch(`${base}/api/ts`)).json();
  assert.ok(Math.abs(current.unix - Date.now() / 1000) < 2);
  assert.match(current.natural, /\w+ \d{2}, \d{4}/);
  assert.equal((await fetch(`${base}/api/no-such-route`)).status, 404);
  assert.equal((await fetch(`${base}/api/ts/%E0%A4%A`)).status, 400);
  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Timestamp microservice/);
  assert.equal(home.headers.get('x-powered-by'), null);
  assert.equal((await fetch(`${base}/style.css`)).status, 200);
  assert.equal((await fetch(`${base}/client.js`)).status, 200);
  assert.equal((await fetch(`${base}/config.js`)).status, 200);
  assert.deepEqual(await (await fetch(`${base}/health`)).json(), { status: 'ok' });
});

test('rate limiter returns 429 without Redis', async (t) => {
  const server = createApp({ rateLimitMax: 1 }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/api/ts/0`;
  assert.equal((await fetch(url)).status, 200);
  assert.equal((await fetch(url)).status, 429);
});
