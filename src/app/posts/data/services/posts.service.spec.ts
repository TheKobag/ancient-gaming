import { Apollo } from 'apollo-angular';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    return MockBuilder(PostsService).provide([MockProvider(Apollo)]);
  });

  it('should be created', () => {
    service = MockRender(PostsService).point.componentInstance;
    expect(service).toBeTruthy();
  });
});
