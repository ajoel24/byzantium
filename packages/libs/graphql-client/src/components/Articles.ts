import { Article as BaseArticle } from '../generated/graphql';

export type Article = {
  title: BaseArticle['title'];
  body: BaseArticle['body'];
};
