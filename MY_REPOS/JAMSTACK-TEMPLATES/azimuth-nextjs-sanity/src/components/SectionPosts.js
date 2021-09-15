import React from "react";
import _ from "lodash";

import { Link, markdownify, postUrl } from "../utils";
import PostFooter from "./PostFooter";

export default function SectionPosts(props) {
  const section = _.get(props, "section");
  const posts = _.take(
    _.orderBy(_.get(props, "posts", []), ["date"], ["desc"]),
    3
  );
  return (
    <section
      id={_.get(section, "section_id")}
      className={
        "block posts-block bg-" + _.get(section, "background") + " outer"
      }
    >
      <div className="block-header inner-small">
        {_.get(section, "title") && (
          <h2 className="block-title">{_.get(section, "title")}</h2>
        )}
        {_.get(section, "subtitle") && (
          <p className="block-subtitle">{_.get(section, "subtitle")}</p>
        )}
      </div>
      <div className="inner">
        <div className="post-feed">
          {_.map(posts, (post, postIdx) => (
            <article key={postIdx} className="post post-card">
              <div className="post-card-inside">
                {_.get(post, "thumb_image") && (
                  <Link href={postUrl(post)} className="post-card-thumbnail">
                    <img
                      className="thumbnail"
                      src={_.get(post, "thumb_image")}
                      alt={_.get(post, "title")}
                    />
                  </Link>
                )}
                <div className="post-card-content">
                  <header className="post-header">
                    <h3 className="post-title">
                      <Link href={postUrl(post)} rel="bookmark">
                        {_.get(post, "title")}
                      </Link>
                    </h3>
                  </header>
                  <div className="post-excerpt">
                    {markdownify(_.get(post, "excerpt"))}
                  </div>
                  <PostFooter post={post} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
