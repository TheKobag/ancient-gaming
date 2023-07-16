import { DefaultRenderComponent, MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;
  let component: DefaultRenderComponent<AppComponent>;

  beforeEach(async () => {
    await MockBuilder(AppComponent, AppModule);

    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
