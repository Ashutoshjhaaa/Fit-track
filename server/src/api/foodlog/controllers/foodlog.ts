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

        const entity = await (strapi.documents as any).create({
            model: 'api::foodlog.foodlog',
            data: {
                ...data,
                user: user.id,
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
                user: { id: user.id },
            },
        };

        return super.find(ctx);
    },
}));
