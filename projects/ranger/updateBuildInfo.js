const replace = require('replace-in-file');
const git = require('git-rev-sync');
const gitSha = git.short();

const optionsGitSha = {
  files: 'src/environments/environment.prod.ts',
  from: /gitSha:.*/gm,
  to: `gitSha: '${gitSha}',`,
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(optionsGitSha);
  if (changedFiles == 0) {
    throw "Please make sure that file '" + options.files + "' has \"GIT_VERSION_STRING\"";
  }
  console.log('Build\'s git SHA set: ' + gitSha);
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}
