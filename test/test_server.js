import test from 'ava';
import rq from 'request-promise';

test.skip('add', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:6601/server/add',
    body: {
      name: '58a526bf06dce3b7a6b6a784', // 1
      hosts: ['http://192.168.202.19:9601'], // 1
      weight: 9
    },
    json: true
  };
  try {
    const result = await rq(options);
    console.log('result', result);
    t.truthy(result);
  } catch (err) {
    console.log('err', err);
    t.false();
  }
});

test('update', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:6601/server/update',
    body: {
      id: '59191b1229b57225481097fb',
      name: '58a526bf06dce3b7a6b6a784', // 1
      hosts: ['http://192.168.150.19:9601'], // 1
      weight: 9
    },
    json: true
  };
  try {
    const result = await rq(options);
    console.log('result', result);
    t.truthy(result);
  } catch (err) {
    console.log('err', err);
    t.false();
  }
});
