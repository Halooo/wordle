const w = require('./words.json');
const d = require('./dictionary.json');

w.forEach((i) => {
  const lower = i.toLowerCase();
  if(d[lower] !== 1) {
    console.log('fail', i)
  }
})