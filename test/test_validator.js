import test from 'ava';
import validator from 'validator';

test('isUrl', async t => {
  try {
    const result = validator.isURL('192.168.202.19', { protocols: ['http'], require_protocol: true });
    console.log('validate result--->', result);
    t.truthy(result);
  } catch (err) {
    console.error(err);
    t.falsy(false);
  }
});
