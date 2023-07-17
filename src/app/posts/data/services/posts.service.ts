import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { PaginatedPosts } from '../../models/paginated-posts.model';
import {
  adaptPaginatedPosts,
  adaptPosts,
} from '../adapters/adapt-post-response';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apollo = inject(Apollo);

  getAllPosts(): Observable<Array<Post>> {
    return this.apollo
      .query({
        query: gql`
          query ($options: PageQueryOptions) {
            posts(options: $options) {
              data {
                id
                title
                body
              }
              meta {
                totalCount
              }
            }
          }
        `,
      })
      .pipe(map((response) => adaptPosts(response)));
  }

  getPaginatedPosts(
    page: number,
    limit: number = 10,
    search: string = ''
  ): Observable<PaginatedPosts> {
    return this.apollo
      .query({
        query: gql`
          query ($options: PageQueryOptions) {
            posts(options: $options) {
              data {
                id
                title
                body
              }
              meta {
                totalCount
              }
            }
          }
        `,
        variables: {
          options: {
            paginate: {
              page: page,
              limit: limit,
            },
            search: {
              q: search,
            },
          },
        },
      })
      .pipe(
        map((response) => adaptPaginatedPosts(response, page, limit, search))
      );
  }

  addPost(newPost: Post): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation ($input: CreatePostInput!) {
            createPost(input: $input) {
              id
              title
              body
            }
          }
        `,
        variables: {
          input: {
            title: newPost.title,
            body: newPost.body,
          },
        },
      })
      .pipe(map((response) => (response.data as any).createPost as Post));
  }

  removePost(id: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation ($id: ID!) {
            deletePost(id: $id)
          }
        `,
        variables: {
          id: id,
        },
      })
      .pipe(map((response) => (response.data as any).deletePost));
  }

  updatePost(newPost: Post): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation ($id: ID!, $input: UpdatePostInput!) {
            updatePost(id: $id, input: $input) {
              id
              body
              title
            }
          }
        `,
        variables: {
          id: newPost.id,
          input: {
            body: newPost.body,
            title: newPost.title,
          },
        },
      })
      .pipe(map((response) => (response.data as any).deletePost));
  }
}
