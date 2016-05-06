export default function navigateAction(context, payload) {
  return context.dispatch('LOAD_TUTORIAL_NAVIGATOR', {
    appType: payload.appType,
    platform: payload.platform,
    article: payload.article
  });
};
