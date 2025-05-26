import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  WELCOME: 'welcome',
  FORM: 'form',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.WELCOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.FORM, '/form', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
