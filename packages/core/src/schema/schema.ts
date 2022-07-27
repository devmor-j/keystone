import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';

import type {
  BaseFields,
  BaseListTypeInfo,
  ExtendGraphqlSchema,
  GraphQLSchemaExtension,
  KeystoneConfig,
  KeystoneContext,
  BaseKeystoneTypeInfo,
  BaseSingletonTypeInfo,
} from '../types';
import { SingletonConfig, ListConfig, ListConfigWithoutKind } from '../types/config/lists';

export function config<TypeInfo extends BaseKeystoneTypeInfo>(config: KeystoneConfig<TypeInfo>) {
  return config;
}

export function list<
  Fields extends BaseFields<ListTypeInfo>,
  ListTypeInfo extends BaseListTypeInfo
>(config: ListConfigWithoutKind<ListTypeInfo, Fields>): ListConfig<ListTypeInfo, any> {
  return { ...config, kind: 'list' };
}

export function singleton<
  Fields extends BaseFields<ListTypeInfo>,
  ListTypeInfo extends BaseSingletonTypeInfo
>(config: Omit<SingletonConfig<ListTypeInfo, Fields>, 'kind'>): SingletonConfig<ListTypeInfo, any> {
  return { ...config, kind: 'singleton', db: { ...config.db, idField: { kind: 'autoincrement' } } };
}

export function gql(strings: TemplateStringsArray) {
  return strings[0];
}

export function graphQLSchemaExtension<Context extends KeystoneContext>({
  typeDefs,
  resolvers,
}: GraphQLSchemaExtension<Context>): ExtendGraphqlSchema {
  return (schema: GraphQLSchema) => mergeSchemas({ schemas: [schema], typeDefs, resolvers });
}
