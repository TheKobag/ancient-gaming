import { PaginatedPosts } from '../../models/paginated-posts.model';
import { Post } from '../../models/post.model';

export function adaptPaginatedPosts(
  response: any,
  page: number,
  limit: number,
  search: string
): PaginatedPosts {
  return {
    data: response.data.posts.data.map((post: Post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })),
    meta: {
      totalCount: response.data.posts.meta.totalCount,
      page: page,
      lastPage: Math.trunc(response.data.posts.meta.totalCount / limit),
      search: search,
    },
  };
}
