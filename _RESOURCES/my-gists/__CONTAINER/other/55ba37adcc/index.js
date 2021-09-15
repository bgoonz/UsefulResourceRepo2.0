export const useCreatePost = ({ topicSlug, pageNumber, pageSize }) =>
  useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      try {
        const { postsByTopic } = cache.readQuery({
          query: GET_POSTS_BY_TOPIC,
          variables: { topicSlug, pageNumber, pageSize },
        });

        const actualPage =
          postsByTopic.posts.length >= pageSize ? pageNumber + 1 : pageNumber;
        const posts = actualPage > pageNumber ? [] : postsByTopic.posts;

        cache.writeQuery({
          query: GET_POSTS_BY_TOPIC,
          data: {
            postsByTopic: {
              posts: [...posts, createPost],
              count: postsByTopic.count,
            },
          },
          variables: { topicSlug, pageNumber: actualPage, pageSize },
        });

        Object.keys(cache.data.data.ROOT_QUERY).forEach((key) => {
          if (key.match(/^postsByTopic/)) {
            const rootQuery = cache.data.data.ROOT_QUERY[key];
            const queryFieldsObj = JSON.parse(
              key.substring("postsByTopic(".length, key.length - 1)
            );
            cache.writeQuery({
              query: GET_POSTS_BY_TOPIC,
              data: {
                postsByTopic: {
                  posts: rootQuery.posts,
                  count: rootQuery.count + 1,
                },
              },
              variables: {
                topicSlug: queryFieldsObj.topicSlug,
                pageNumber: queryFieldsObj.pageNumber,
                pageSize: queryFieldsObj.pageSize,
              },
            });
          }
        });
      } catch (e) {}
    },
  });
