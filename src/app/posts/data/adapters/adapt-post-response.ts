import { PaginatedPosts } from '../../models/paginated-posts.model';
import { PostData } from '../models/posts-data-response';

export function adaptPaginatedPosts(response: any, page: number, limit: number): PaginatedPosts {
  return {
    data: response.data.posts.data.map((post: PostData) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })),
    meta: {
      totalCount: response.data.posts.meta.totalCount,
      page: page,
      lastPage: Math.trunc(response.data.posts.meta.totalCount / limit),
    },
  };
}
