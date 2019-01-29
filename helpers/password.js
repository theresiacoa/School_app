const crypto = require('crypto');

function generateSecret() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let counter = 10;
  let result = '';
  while(counter > 0) {
    const random = Math.floor(Math.random() * 26);
    result += alphabet[random];
    counter--;
  }
  return result;
}

function hash(password, secret = null) {
  if (!secret) {
    secret = generateSecret();
  }

  let hash = crypto.createHmac('sha256', secret)
                .update(password)
                .digest('hex');
  
  return {encrypt: hash, key: secret};
}

module.exports = hash;