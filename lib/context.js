'use strict';

const delegate = require('delegates')

const proto = module.exports = {}

delegate(proto, 'reactor')
  .getter('state')
  .getter('inputs')
  .getter('outputs')
  .method('fetch')
  .method('post')
  .method('send')
  .method('push')
  .method('debug')
  .method('throw')

delegate(proto, 'state')
  .method('clear')            
  .method('delete')
  .method('entries')
  .method('forEach')
  .method('get')
  .method('has')
  .method('set')
  .method('keys')
  .method('set')
  .method('values') 
