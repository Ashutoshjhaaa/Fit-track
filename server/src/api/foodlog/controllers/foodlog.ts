/**
 * foodlog controller
 */

import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::foodlog.foodlog', ({ strapi }) => ({
    async create(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.unauthorized('You must be logged in');
        }

        const { data } = ctx.request.body as any;

        const entity = await strapi.entityService.create('api::foodlog.foodlog', {
            data: {
                ...data,
                users_permissions_user: user.id,
                publishedAt: new Date(),
            },
        });

        return this.transformResponse(entity);
    },

    async find(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.unauthorized('You must be logged in');
        }

        ctx.query = {
            ...ctx.query,
            filters: {
                ...(ctx.query as any).filters,
                users_permissions_user: { id: user.id },
            },
        };

        return super.find(ctx);
    },
}));
