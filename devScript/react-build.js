const { exec } = require('child_process');
const fs = require('fs');

/**
 * Delete Build Directory & indexMin
 */
exec(`rm -rf ${__dirname}/../build && rm ${__dirname}/../public/indexMin.html`, () => {

  /**
   * Build App with React
   */
  exec('react-scripts build', () => {

    /**
     * Move 'index.html' into public as 'indexMin'
     */
    exec(`mv ${__dirname}/../build/index.html ${__dirname}/../public/indexMin.html && rm ${__dirname}/../build/index*`, () => {

      /**
       * Modify indexMin
       */
      fs.readFile(`${__dirname}/../public/indexMin.html`, 'utf8', (err, data) => {
        /**
         * Modify Script Tags
         */
        data = data.replace(/<script src="/gmi, '<script defer src="');
        /**
         * Write indexMin
         */
        fs.writeFile(`${__dirname}/../public/indexMin.html`, data, () => null);

      });
    });

    /**
     * Modify CSS Files
     */
    fs.readdir(`${__dirname}/../build/static/css`, (err, data) => {
      for (let i = 0; i < data.length; i++) {
        let filePath = `${__dirname}/../build/static/css/${data[i]}`;
        let fileEx = data[i].split('.').slice(-1)[0];
        if (fileEx === 'css') {
          let content = fs.readFileSync(filePath, 'utf8');
          content = content.replace(/\/\/(.*)|\/\*(.*)\*\/|\n|\t/gm, '');
          fs.writeFile(filePath, content, () => null);
        }
      }
    });

    /**
     * Modify JS Files
     */
    fs.readdir(`${__dirname}/../build/static/js`, (err, data) => {
      for (let i = 0; i < data.length; i++) {
        let filePath = `${__dirname}/../build/static/js/${data[i]}`;
        let fileEx = data[i].split('.').slice(-1)[0];
        if (fileEx === 'js') {
          let content = fs.readFileSync(filePath, 'utf8');
          content = content.replace(/\/\/#(.*)|\/\*(.*)\*\/|\n|\t/gm, '');
          fs.writeFile(filePath, content, () => null);
        }
      }
    });

  });
});
