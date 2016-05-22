/**
 * Created by shuding on 5/22/16.
 * <ds303077135@gmail.com>
 */

module.exports = {
  db: null,
  init: _db => {
    this.db = _db;
  },
  render: (template, options) => {
    let disqus = options.blog.plugin ? options.blog.plugin.disqus || '' : '';
    let context = {};

    if (template == 'settings') {
      // settings page
      context.settings =
        `<div class="input-group">
          <h5>Disqus</h5>
          <p><input type="text" name="plugin.disqus" placeholder="xxxx" value="${disqus}" style="width: inherit"> .disqus.com</p>
        </div>`;
    }

    if (disqus)
      context.postBottom = context.pageBottom =
        `<div id="disqus_thread" style="margin-top: 50px"></div>
        <script>
          (function() { var d = document, s = d.createElement('script'); s.src = '//${disqus}.disqus.com/embed.js'; s.setAttribute('data-timestamp', +new Date()); (d.head || d.body).appendChild(s); })();
        </script>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
      `;

    return context;
  }
};
