/**
 * Created by shuding on 5/22/16.
 * <ds303077135@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

module.exports = {
  db: null,
  init: _db => {
    this.db = _db;
    let baseDir = path.join(__dirname, '..', 'static');
    if (!fs.existsSync(path.join(baseDir, 'jquery'))) {
      fs.mkdirSync(path.join(baseDir, 'jquery'));
    }
    if (!fs.existsSync(path.join(baseDir, 'jquery', 'jquery.min.js'))) {
      let file = fs.createWriteStream(path.join(baseDir, 'jquery', 'jquery.min.js'));
      https.get('https://code.jquery.com/jquery-1.12.4.min.js', res => res.pipe(file));
      file.on('close', () => console.log('[image-zoom] jquery.min.js installed'));
    }
    if (!fs.existsSync(path.join(baseDir, 'image-zoom'))) {
      fs.mkdirSync(path.join(baseDir, 'image-zoom'));
    }
    if (!fs.existsSync(path.join(baseDir, 'image-zoom', 'transition.js'))) {
      let file = fs.createWriteStream(path.join(baseDir, 'image-zoom', 'transition.js'));
      https.get('https://raw.githubusercontent.com/twbs/bootstrap/master/js/transition.js', res => res.pipe(file));
      file.on('close', () => console.log('[image-zoom] transition.js installed'));
    }
    if (!fs.existsSync(path.join(baseDir, 'image-zoom', 'zoom.min.js'))) {
      let file = fs.createWriteStream(path.join(baseDir, 'image-zoom', 'zoom.min.js'));
      https.get('https://raw.githubusercontent.com/fat/zoom.js/master/dist/zoom.min.js', res => res.pipe(file));
      file.on('close', () => console.log('[image-zoom] zoom.min.js installed'));
    }
    if (!fs.existsSync(path.join(baseDir, 'image-zoom', 'zoom.css'))) {
      let file = fs.createWriteStream(path.join(baseDir, 'image-zoom', 'zoom.css'));
      https.get('https://raw.githubusercontent.com/fat/zoom.js/master/css/zoom.css', res => res.pipe(file));
      file.on('close', () => console.log('[image-zoom] zoom.css installed'));
    }
  },
  render: (template, options) => {
    let context = {};

    if (['post', 'page'].includes(template)) {
      context.head = `<link rel="stylesheet" type="text/css" href="/static/image-zoom/zoom.css">`;

      context.bodyBottom = `
      <script type="text/javascript" src="/static/jquery/jquery.min.js"></script>
      <script type="text/javascript" src="/static/image-zoom/transition.js"></script>
      <script type="text/javascript">
        // Jacob's zoom.js: https://github.com/fat/zoom.js
        (function ($) {
          $('p img').attr('data-action', 'zoom');
        })(jQuery);
      </script>
      <script type="text/javascript" src="/static/image-zoom/zoom.min.js"></script>
      `;
    }

    return context;
  }
};
