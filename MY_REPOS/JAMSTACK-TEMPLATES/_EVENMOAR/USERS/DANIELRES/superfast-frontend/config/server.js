/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */

module.exports = {
  drawRoutes: function(app) {
    app.post('/login', function(req, res) {
      res.json({ message: 'logging in!' });
    });

    app.post('/logout', function(req, res) {
      res.json({ message: 'logging out!'});
    });

    app.get('/books', function (req, res) {
      res.json([
        {title: 'Great Expectations', author: 'Dickens'},
        {title: 'Foundation Series', author: 'Asimov'},
        {title: 'Treasure Island', author: 'Stephenson'}
      ]);
    });

    app.get('/api/v1/blog/posts', function (req, res) {
      res.json([
        { id: 1, title: 'Title 1 fr', body: 'Lorem 1 fr', author: { id: 1, name: 'Lolo' }, lang: 'fr', },
        { id: 2, title: 'Title 2 fr', body: 'Lorem 2 fr', author: { id: 2, name: 'Toto' }, lang: 'fr', },
        { id: 3, title: 'Title 3 en', body: 'Lorem 3 en', author: { id: 1, name: 'Lolo' }, lang: 'en', },
        { id: 4, title: 'Title 4 en', body: 'Lorem 4 en', author: { id: 1, name: 'Lolo' }, lang: 'en', },
        { id: 5, title: 'Title 5 en', body: 'Lorem 5 en', author: { id: 1, name: 'Lolo' }, lang: 'en', },
      ]);
    });

    app.get('/api/v1/blog/posts/:id', function (req, res) {
      var id = req.params.id;
      res.json(
        { id: id, title: 'Title fr ' + id, body: 'Lorem fr ' + id, author: { id: 1, name: 'Lolo' }, lang: 'fr', }
      );
    });


  }
};
