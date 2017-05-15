import test from 'ava';
import rq from 'request-promise';

test('add', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:6601/server/add',
    body: {
      name: '58a526bf06dce3b7a6b6a784', // 1
      hosts: ['192.168.202.19'], // 1
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
