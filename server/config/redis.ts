import * as redis from 'redis';

export const client = redis.createClient();

client.connect();

client.on('connect', function() {
  console.log('[redis] connected');
});

client.on('error', function (error) {
  console.log(`[redis] ${error}`);
});