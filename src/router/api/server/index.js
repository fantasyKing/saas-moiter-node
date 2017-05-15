import server from './server';

export default [
  ['POST', '/add', [], server.server10000,
    ['name', 'hosts', 'weight', '_status'],
    [1, 0, 0, 1],
    ['string', 'array', 'number', 'number']
  ],
  ['POST', '/update', [], server.server10001,
    ['id', 'name', 'hosts', 'weight', '_status'],
    [1, 1, 0, 0, 1],
    ['mongoid', 'string', 'array', 'number', 'number']
  ],
  ['DELETE', '/delete', [], server.server10002,
    ['id'],
    [1],
    ['mongoid']
  ]
];
