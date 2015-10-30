export default function NavigateAction(context, payload) {
  return context.dispatch('LOAD_TUTORIAL_NAVIGATOR', {
    appType : payload.appType,
    tech1 : payload.tech1,
    tech2 : payload.tech2,
    baseUrl : payload.baseUrl
  });
};
