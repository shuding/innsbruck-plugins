/**
 * Created by shuding on 5/23/16.
 * <ds303077135@gmail.com>
 */

module.exports = {
  db: null,
  init: _db => {
    this.db = _db;
  },
  render: (template, options) => {
    let context = {};

    if (['post-new', 'post-edit'].includes(template)) {
      let thumbnail = (options.post && options.post.plugin ? options.post.plugin.thumbnail || '' : '');
      context.editorArticleBottom = `
      <p>Thumbnail (^upload): <input type="text" name="plugin.thumbnail" placeholder="/static/xxx.jpg" value="${thumbnail}" style="width: inherit"></p>
      `;
    }

    if (template == 'posts') {
      context.head = `
      <style>
      .thumbnail {
        width: 100%;
        height: 10vw;
        max-height: 120px;
        min-height: 80px;
        background-size: cover;
        background-position: center center;
        cursor: pointer;
      }
      </style>
      `;
      context.postLiTitleBottom = post => {
        if (post.plugin && post.plugin.thumbnail) {
          let thumbnail = post.plugin.thumbnail;
          if (thumbnail) {
            return `<a href="/post/${post.link}" style="flex-basis: 100%"><div class="thumbnail" style="background-image: url('${thumbnail}')"></div></a>`;
          }
        }
        return '';
      }
    }

    return context;
  }
};
