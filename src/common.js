import {GraphQLClient} from 'graphql-request';

export const baseUrl = new URL(document.currentScript.src).origin;

export const apiUrl = window.location.hostname === 'localhost' ? 'https://keystone-next.docker/api/graphql' : `${baseUrl}/api/v1`;

export const frontendUrl = window.location.hostname === 'localhost' ? '' : `${baseUrl}/frontend/v1`;

export const client = new GraphQLClient(apiUrl);
