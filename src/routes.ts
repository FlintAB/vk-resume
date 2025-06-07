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
  PREVIEW: 'preview',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.WELCOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.FORM, '/form', []),
      createPanel(DEFAULT_VIEW_PANELS.PREVIEW, '/preview', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
