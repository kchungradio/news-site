const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

/*
 * All pages/routes must be defined here.
 *
 * This honors the pages directory, but it makes it so that anything
 * other than a defined page goes to the authorStories route.
 *
 * All this so we can show an author's stories at:
 * https://kchung.news/author-name-slug
 *
 * Note: No author can be named the same as any of the routes.
 *   TODO: make a name check to prevent this
 *
 * See https://github.com/fridays/next-routes
 */

routes.add('stories', '/', 'stories')
routes.add('participate')
routes.add('upload')
routes.add('sign-in')
routes.add('sign-out')
routes.add('confirm', '/registration/confirm', 'confirm')
routes.add('authorStories', '/:authorSlug', 'stories')