const fs = require('fs');

const path = require('path');

const copyRecursive = (source, target) => {
  // Directory `source/a/b/c` is stored as `[a, b, c]`.
  let nextRelativePaths = [''];
  while (nextRelativePaths.length !== 0) {
    const relativePath = nextRelativePaths.pop();
    const sourcePath = path.join(source, relativePath);
    const targetPath = path.join(target, relativePath);
    // Copy files
    if (!fs.lstatSync(sourcePath).isDirectory()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
      }
      const childrenBasenames = fs.readdirSync(sourcePath);
      const childrenRelativePaths = (
        childrenBasenames.map((name) => path.join(relativePath, name))
      );
      nextRelativePaths = nextRelativePaths.concat(childrenRelativePaths);
    }
  }
};

copyRecursive('public', 'build');
