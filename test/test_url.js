import test from 'ava';
import url from 'url';

test('resolve', async t => {
  try {
    const result = url.parse('http://192.168.202.19:9601');
    console.log('resolve result--->', result);
    t.truthy(result);
  } catch (err) {
    console.error(err);
    t.falsy(false);
  }
});
