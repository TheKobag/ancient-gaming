import { Post } from './post.model';
import { PostsMeta } from './posts-meta.model';

export interface PaginatedPosts {
  data: Array<Post>;
  meta: PostsMeta;
}
