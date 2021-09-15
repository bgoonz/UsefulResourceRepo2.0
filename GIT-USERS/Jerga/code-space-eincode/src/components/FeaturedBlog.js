import React from "react";
import { Link } from "gatsby";

const style = {
  time: {
    fontSize: "12px",
  },
};

export default function FeaturedBlog({ blog }) {
  const { title, subtitle, date, slug, author } = blog.frontmatter;

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{title}</p>
            <p className="subtitle is-6">{author}</p>
          </div>
        </div>
        <div className="content mb-1">
          {subtitle}
          <br />
          <time style={style.time} dateTime={style.time}>
            {date}
          </time>
        </div>
        <Link
          to={`/blogs/${slug}`}
          className="button is-light is-link is-small"
        >
          Continue reading
        </Link>
      </div>
    </div>
  );
}
