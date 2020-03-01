const router = require('express-promise-router')();
const PostsController = require('../controllers/posts');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(PostsController.index)
    .post(validateBody(schemas.userPostSchema), PostsController.newPost)

router.route('/:postId')
    .get(validateParam(schemas.idSchema, 'postId'), PostsController.getPost)
    .put(validateParam(schemas.idSchema, 'postId'), validateBody(schemas.userPostSchema), PostsController.replacePost)
    .patch(validateParam(schemas.idSchema, 'postId'), validateBody(schemas.patchPostSchema),PostsController.updatePost)
    .delete(validateParam(schemas.idSchema, 'postId'), PostsController.deletePost)

module.exports = router;