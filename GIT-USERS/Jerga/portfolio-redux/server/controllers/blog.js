const Blog = require("../models/blog");
const slugify = require("slugify");

exports.getBlogs = (req, res, next) => {
  // get admin blogs here, get query

  return Blog.find({ status: "published" }, (err, blogs) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json(blogs);
    // return res.status(422).send([{title: 'FUck you'}])
  });
};

exports.getUserBlogs = (req, res, next) => {
  const userId = req.user.sub;

  return Blog.find({ userId }, (err, blogs) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json(blogs);
    // return res.status(422).send([{title: 'FUck you'}])
  });
};

exports.getBlogById = (req, res, next) => {
  const id = req.params.id;

  return Blog.findById(id, (err, blog) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json(blog);
    // return res.status(422).send([{title: 'Fuck you'}])
  });
};

exports.getBlogBySlug = (req, res, next) => {
  const slug = req.params.slug;

  console.log(slug.toLowerCase());

  return Blog.findOne({ slug: slug.toLowerCase() }, (err, blog) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json(blog);
    // return res.status(422).send([{title: 'Fuck you'}])
  });
};

exports.saveBlog = (req, res, next) => {
  const blogData = req.body;
  const blog = new Blog(blogData);

  blog.save((err, createdBlog) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err.errors));
    }

    return res.json({ blog: createdBlog });
  });
};

exports.updateBlog = (req, res, next) => {
  const id = req.params.id;
  const blogData = req.body;

  return Blog.findById(id, (err, foundBlog) => {
    if (
      !foundBlog.isSlugCreated &&
      blogData.status &&
      blogData.status === "published"
    ) {
      const title = blogData.title || foundBlog.title;
      foundBlog.slug = slugify(title, {
        replacement: "-", // replace spaces with replacement
        remove: null, // regex to remove characters
        lower: true, // result in lower case
      });
      foundBlog.isSlugCreated = true;
    }

    foundBlog.set(blogData);
    foundBlog.updatedAt = new Date();
    foundBlog.save(function (err) {
      if (err) {
        return res.status(422).send(normalizeErrors(err.errors));
      }

      return res.json({ status: "UPDATED" });
    });
  });
};

exports.deleteBlog = (req, res, next) => {
  const id = req.params.id;

  Blog.deleteOne({ _id: id }, function (err) {
    if (err) return res.status(422).send(normalizeErrors(err.errors));

    return res.json({ status: "deleted" });
  });
};

function normalizeErrors(errors) {
  let normalizeErrors = [];

  for (let property in errors) {
    if (errors.hasOwnProperty(property)) {
      normalizeErrors.push({
        title: property,
        detail: errors[property].message,
      });
    }
  }

  return normalizeErrors;
}
