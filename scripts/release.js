/* eslint-env node */
/* eslint-disable strict, no-console */
'use strict';

const version = require('../package.json').version;
const prompt = require('prompt');
const exec = require('child_process').exec;
const dryRun = process.env.DRY_RUN || false;
const schema = {
  properties: {
    confirmation: {
      required: true,
      pattern: /^(y|n|yes|no)+$/ig,
      description: `You are about to release version ${version}, is that OK? (yes|no)`
    }
  }
};

const pushTag = tag => {
  const cmd = `git push origin ${tag}`;

  exec(cmd, (error, stdout, stderr) => {
    console.log('Tag pushed to origin', tag);
    if (error !== null) {
      console.log(stderr);
    }
  });
};

const createTag = n => {
  const cmd = `git tag -a ${n} -m "Releasing version: ${n}"`;

  if (dryRun) {
    console.log('Pretending to create new tag', n);
  } else {
    exec(cmd, (error, stdout, stderr) => {
      console.log('New git tag created', n);
      pushTag(n);
      if (error !== null) {
        console.log(stderr);
      }
    });
  }
};

prompt.start();
prompt.get(schema, (err, result) => {
  if (err) {
    throw new Error(err);
  }

  const res = result.confirmation.toLowerCase();

  if (res === 'y' || res === 'yes') {
    createTag(version);
  } else {
    console.log('Release aborted');
    process.exit(0);
  }

  return true;
});
