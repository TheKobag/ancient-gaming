import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { PaginatedPosts } from '../../models/paginated-posts.model';
import { adaptPaginatedPosts } from '../adapters/adapt-post-response';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apollo = inject(Apollo);

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
}
