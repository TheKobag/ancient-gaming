import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './posts/store/posts.effects';
import { postReducer } from './posts/store/posts.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forRoot({}),
    EffectsModule.forFeature([PostsEffect])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
