import { PostData } from '../models/posts-data-response';

export function adaptPaginatedPosts(response: any) {
  return {
    data: response.data.posts.data.map((post: PostData) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })),
    meta: {
      totalCount: response.data.posts.meta.totalCount,
    },
  };
}
