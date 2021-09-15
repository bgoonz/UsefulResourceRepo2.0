import React, { useState, useRef } from "react";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import BaseLayout from "../../../layout/BaseLayout";
import withApollo from "../../../hoc/withApollo";
import withAuth from "../../../hoc/withAuth";
import PostItem from "../../../components/forum/PostItem";
import {
  useGetTopicsBySlug,
  useGetPostsByTopic,
  useGetUser,
  useCreatePost,
} from "../../../apollo/actions";
import Replier from "../../../components/shared/Replier";
import AppPagination from "../../../components/shared/Pagination";

const PostsPage = withAuth(
  () => {
    const router = useRouter();
    const { slug, pageN = 1, pageS = 5 } = router.query; //since pageN & pageS are coming from query, they are string. and we need to convert them into int to be assigned correctly

    const [pagination, setPagination] = useState({
      pageNumber: parseInt(pageN, 10),
      pageSize: parseInt(pageS, 10),
    });
    const { pageNumber, pageSize } = pagination;

    const { data: userData } = useGetUser();
    const user = (userData && userData.user) || null;

    const { data: topicData } = useGetTopicsBySlug({
      variables: { topicSlug: slug },
    });
    const topicBySlug = (topicData && topicData.topicBySlug) || {};
    const { title } = topicBySlug;

    const { data: postsData, fetchMore } = useGetPostsByTopic({
      variables: { topicSlug: slug, ...pagination },
    });
    const postsAndCount = (postsData && postsData.postsByTopic) || {
      posts: [],
      count: 0,
    }; //postsAndCount contains posts and count as an object. posts initially is empty array
    const { posts, count } = postsAndCount;

    return (
      <BaseLayout>
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>{title}</h1>
            </div>
          </div>
        </section>
        <Posts
          topicSlug={slug}
          topic={topicBySlug}
          posts={posts}
          user={user}
          fetchMore={fetchMore}
          count={count}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={(pageNumber, pageSize) => {
            router.push(
              "/forum/topics/[slug]",
              `/forum/topics/${slug}?pageN=${pageNumber}&pageS=${pageSize}`,
              { shallow: true }
            );
            setPagination({ pageNumber, pageSize });
          }}
        />
      </BaseLayout>
    );
  },
  ["admin", "instructor", "guest"],
  { ssr: true }
);

const Posts = ({
  topic,
  posts,
  count,
  user,
  topicSlug,
  fetchMore,
  pageNumber,
  pageSize,
  onPageChange,
}) => {
  const pageEnd = useRef(); //create a reference for scroll to a specific position

  let lastPage = Math.ceil(count / pageSize);
  if (count === 0) {
    lastPage = 1;
  }

  const [createPost, { error }] = useCreatePost({
    topicSlug,
    pageNumber: lastPage,
    pageSize,
  });
  const [isReplierOpen, setIsReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }

    reply.topic = topic._id;
    await createPost({ variables: reply });

    lastPage = Math.ceil(count / pageSize);
    if (count === 0) {
      lastPage = 1;
    }

    (lastPage === pageNumber || replyTo) &&
      (await fetchMore({
        variables: { pageSize, pageNum: lastPage },
        updateQuery: (previousResults, { fetchMoreResult }) => {
          return Object.assign({}, previousResults, {
            postsByTopic: { ...fetchMoreResult.postsByTopic },
          });
        },
      }));
    resetReplier();
    cleanup();
  };

  const cleanup = () => {
    setIsReplierOpen(false);
    toast.success("Post has been created!", { autoClose: 2000 });
    scrollToBottom();
  };

  const scrollToBottom = () =>
    pageEnd.current.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="mb-5">
      <div className="fj-post-list">
        {topic._id &&
          pageNumber === 1 && ( //only show the main topic in the first page
            <PostItem post={topic} className="topic-post-lead" />
          )}
        {posts &&
          posts.map((post) => {
            return (
              <div className="row" key={post._id}>
                <div className="col-md-9">
                  <PostItem
                    post={post}
                    canCreate={user !== null} //canCreate=true if user is signed in
                    onReply={(postData) => {
                      //when reply button is clicked, it will hold the post data.
                      setReplyTo(postData); //set the replyTo state with a getting post
                      setIsReplierOpen(true);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  onClick={() => {
                    setReplyTo(null); //no reply to anybody. just send a post. replyTo will take topic title in this case
                    setIsReplierOpen(true); //open the replier window
                  }}
                  className="btn btn-large btn-outline-primary"
                >
                  Create New Post
                </button>
              </div>
            )}
            <div className="pagination-container ml-auto">
              <AppPagination
                onPageChanging={onPageChange}
                count={count}
                pageSize={pageSize}
                pageNumber={pageNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={pageEnd} />
      <Replier
        isOpen={isReplierOpen}
        onClose={() => setIsReplierOpen(false)}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title} //replyTo state is holding the post object from PostItem component
        onSubmit={handleCreatePost}
      />
    </section>
  );
};

export default withApollo(PostsPage, { getDataFromTree });

/*
  Notes
  PostItem can show the main topic and also can show all posts
  In case of showing main topic, we are passing the className of the "topic-post-lead" and not pass the reply button

  we have used scrollToView API to let screen scroll to the bottom whenever new post is created

  fetchMore + updateQuery for caching data with pagination. it is a normal technique with apollo client 2

  to keep pagination on the same page even after refresh, we have used router.push with a query contains information about page number and size.

  shallow rendering will get the updated data for each page by dynamic updating the url without re-fetching since it is already existed
*/
