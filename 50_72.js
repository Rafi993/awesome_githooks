#!/usr/bin/env node

// This commit-msg hook script checks if you follow 50/72 in commit message else it prevents commit
const fs = require('fs')
const commitMsgFile = process.argv[2]

let commitMsg = '';

try {
  commitMsg = fs.readFileSync(commitMsgFile, 'utf8').split('\n')
} catch (err) {
  console.log(err)
}

console.log(commitMsg)
const error = (lineLength, expectedLength, msg) => {
  if(lineLength > expectedLength) {
    console.log(msg)
    process.exit(1)
  }
}

if(commitMsg.length < 3) {
  console.log('Please follow 50/72 rule https://medium.com/@preslavrachev/what-s-with-the-50-72-rule-8a906f61f09c')
  process.exit(1)
}

commitMsg.forEach((line, index) => {
  switch(index) {
   case 0: error(line.length, 50, 'Header should be at max 50 characters long'); break;
   case 1: error(line.length, 0, 'Line after header should be blank'); break;
   default: error(line.length, 72, 'All other lines other than header and blank line after that should be of 72 characters long')
  }
})

