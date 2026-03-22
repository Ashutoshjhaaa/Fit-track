import type { Core } from '@strapi/strapi';

const COMMON_PERMISSIONS = [
  'api::foodlog.foodlog.find',
  'api::foodlog.foodlog.findOne',
  'api::foodlog.foodlog.create',
  'api::foodlog.foodlog.update',
  'api::foodlog.foodlog.delete',
  'api::activity-log.activity-log.find',
  'api::activity-log.activity-log.findOne',
  'api::activity-log.activity-log.create',
  'api::activity-log.activity-log.update',
  'api::activity-log.activity-log.delete',
];

const AUTHENTICATED_ONLY_PERMISSIONS = [
  'plugin::users-permissions.user.update',
  'plugin::users-permissions.user.me',
];

async function grantPermissionsToRole(strapi: Core.Strapi, roleType: 'authenticated' | 'public', extraPermissions: string[] = []) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: roleType },
    populate: ['permissions'],
  });

  if (!role) return;

  const permissionsToGrant = [...COMMON_PERMISSIONS, ...extraPermissions];
  const existingActions = new Set((role.permissions || []).map((p: any) => p.action));

  for (const action of permissionsToGrant) {
    if (!existingActions.has(action)) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: role.id },
      });
      strapi.log.info(`[bootstrap] Granted ${roleType} → ${action}`);
    }
  }
}

export default {
  register() { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPermissionsToRole(strapi, 'authenticated', AUTHENTICATED_ONLY_PERMISSIONS);
    await grantPermissionsToRole(strapi, 'public');
  },
};
