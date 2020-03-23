/* This script is used to add the git SHA and Build Date to the environment for inclusion on the About page. */
const replace = require('replace-in-file');
const git = require('git-rev-sync');
const gitSha = git.short();

const prodEnvFile = 'src/environments/environment.prod.ts';

const optionsGitSha = {
  files: '',
  from: /gitSha:.*/gm,
  to: `gitSha: '${gitSha}',`,
  allowEmptyPaths: false,
};

const optionsBuildDate = {
  files: '',
  from: /date:.*/gm,
  to: `date: '${new Date().toISOString()}',`,
  allowEmptyPaths: false,
};

function updateEnv(envFile, options) {
  options.files = envFile;
  try {
    let changedFiles = replace.sync(options);
    if (changedFiles === 0) {
      throw "Please make sure that file '" + options.files + "' has " + options.from;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    throw error
  }
}

updateEnv(prodEnvFile, optionsGitSha);
updateEnv(prodEnvFile, optionsBuildDate);

console.log('Build\'s git SHA set: ' + gitSha);
