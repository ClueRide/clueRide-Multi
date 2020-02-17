const fs = require('fs');
const git = require('git-rev-sync');
const { exec } = require('child_process');

const gitSha = git.short();

console.log('Incrementing Build Number for SHA', gitSha);

exec('grep -l GIT_VERSION_STRING www/*',
  (err, stdout) => {
    console.log('Result of grep');
    const fileNames = stdout.split('\n');
    console.log(fileNames);

    fileNames.forEach(
      (fileName) => {
        if (fileName.length > 0) {
          console.log('Substituting on the file', fileName);
          let file = fs.readFileSync(fileName, 'utf8');
          let pass1 = file.replace(/GIT_VERSION_STRING/g, gitSha);
          let pass2 = pass1.replace(/BUILD_DATE/g, new Date());
          console.log('Writing result');
          fs.writeFileSync(fileName, pass2);
        }
      }
    );

    console.log('Incrementing Build Number Completed');
  });
