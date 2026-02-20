// build.js
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

function copyNonJsFiles(srcDir, destDir) {
  fs.readdirSync(srcDir).forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
      copyNonJsFiles(srcPath, destPath);
    } else if (!file.endsWith('.js') && !file.endsWith('.jsx')) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function build() {
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR);
  function transpileDir(srcDir, destDir) {
    fs.readdirSync(srcDir).forEach(file => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file.replace(/\.jsx$/, '.js'));
      if (fs.statSync(srcPath).isDirectory()) {
        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
        transpileDir(srcPath, destPath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const { code } = babel.transformFileSync(srcPath, {
          presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]]
        });
        // Rewrite .jsx require() paths to .js so the dist/ files resolve correctly
        const rewritten = code.replace(/require\(("[^"]+)\.jsx"\)/g, 'require($1.js")');
        fs.writeFileSync(destPath, rewritten);
      }
    });
  }
  transpileDir(SRC_DIR, DIST_DIR);
  copyNonJsFiles(SRC_DIR, DIST_DIR);
}
build();
