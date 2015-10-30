export default function initialSettingsAction(context, payload){
  context.dispatch('LOAD_SETTINGS', {
    quickstart : payload.quickstart,
    baseUrl: payload.baseUrl,
    navigation: payload.navigation
  });
};
