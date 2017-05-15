import server from './server';

export default [
  ['POST', '/add', [], server.server10000,
    ['name', 'hosts', 'weight'],
    [1, 0, 0],
    ['string', 'array', 'number']
  ]
];
