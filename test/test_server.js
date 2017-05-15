import test from 'ava';
import rq from 'request-promise';

test.skip('add', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:6601/server/add',
    body: {
      name: '58a526bf06dce3b7a6b6a784', // 1
      hosts: ['http://192.168.202.19:9601'], // 1
      weight: 9,
      _status: 1
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

test.skip('update', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:6601/server/update',
    body: {
      id: '59191b1229b57225481097fb',
      name: '58a526bf06dce3b7a6b6a784', // 1
      hosts: ['http://192.168.150.19:9601'], // 1
      weight: 9,
      _status: 0
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

test.skip('delete', async t => {
  const options = {
    method: 'DELETE',
    uri: 'http://localhost:6601/server/delete',
    qs: {
      id: '59191dc2e31a73286dfd1046'
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

test('get', async t => {
  const options = {
    method: 'GET',
    uri: 'http://localhost:6601/server/get-server-info',
    qs: {
      id: '591925352bfa8e2e5f7967dc'
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
