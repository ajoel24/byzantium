import { Category as BaseCategory } from '../generated/graphql';

export type Category = {
  type: BaseCategory['type'];
  slug: BaseCategory['slug'];
  description: BaseCategory['description'];
};
