'use strict';

module.exports = (_config, { strapi }) => {
  initialize(strapi);
};

async function initialize(strapi) {
  return async (ctx, next) => {
    if (isValidRequest(ctx)) {
      if (isAuthHeadersPresent(ctx)) {
        await performAuthChecks();
      } else {
        authFailure();
      }
    }

    await next();
  };
}

function isValidRequest(ctx) {
  return ctx.request.url === '/graphql' && ctx.request.method === 'POST';
}

function isAuthHeadersPresent(ctx) {
  return ctx.request && ctx.request.header && ctx.request.header.authorization;
}

async function handleAuth(ctx, strapi) {
  // get token data
  const { id } = await strapi.plugins[
    'users-permissions'
  ].services.jwt.getToken(ctx);

  if (id === undefined) {
    throw new Error('Invalid token: Token did not contain required fields');
  }

  // check if the id match to the user you want
  if (id !== 'my-user-id') {
    return handleErrors(
      ctx,
      'unauthorized',
      'You are not authorized to access to the GraphQL API'
    );
  }
}

async function performAuthChecks(ctx, strapi) {
  try {
    await handleAuth(ctx, strapi);
  } catch (err) {
    return handleErrors(ctx, err, 'unauthorized');
  }
}

function authFailure() {
  return handleErrors(
    ctx,
    'You need to be authenticated to request GraphQL API',
    'unauthorized'
  );
}

function handleErrors(ctx, type, err = undefined) {
  if (ctx.request.graphql === null) {
    ctx.request.graphql = strapi.errors[type](err);
    return ctx.request.graphql;
  }

  return ctx[type](err);
}
