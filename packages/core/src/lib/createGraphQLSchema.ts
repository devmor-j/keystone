import type { KeystoneConfig, AdminMetaRootVal } from '../types';
import { getAdminMetaSchema } from '../admin-ui/system';
import { graphql } from '../types/schema';
import { InitialisedSchema } from './core/types-for-lists';
import { getGraphQLSchema } from './core/graphql-schema';
export function createGraphQLSchema(
  config: KeystoneConfig,
  lists: Record<string, InitialisedSchema>,
  adminMeta: AdminMetaRootVal
) {
  const adminMetaSchema = getAdminMetaSchema({ adminMeta, config, lists });
  // Start with the core keystone graphQL schema
  let graphQLSchema = getGraphQLSchema(lists, {
    mutation: config.session
      ? {
          endSession: graphql.field({
            type: graphql.nonNull(graphql.Boolean),
            async resolve(rootVal, args, context) {
              if (context.endSession) {
                await context.endSession();
              }
              return true;
            },
          }),
        }
      : {},
    query: adminMetaSchema.fields,
    types: adminMetaSchema.types,
  });

  // Merge in the user defined graphQL API
  if (config.extendGraphqlSchema) {
    graphQLSchema = config.extendGraphqlSchema(graphQLSchema);
  }

  return graphQLSchema;
}
