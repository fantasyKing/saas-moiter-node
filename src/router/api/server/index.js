import server from './server';

export default [
  ['POST', '/add', [], server.server10000,
    ['name', 'hosts', 'weight'],
    [1, 0, 0],
    ['string', 'array', 'number']
  ],
  ['POST', '/update', [], server.server10001,
    ['id', 'name', 'hosts', 'weight'],
    [1, 1, 0, 0],
    ['mongoid', 'string', 'array', 'number']
  ]
];
