export default function loadSettingsAction(context, payload){
  return context.dispatch('LOAD_SETTINGS', {
    quickstart : payload.quickstart,
    baseUrl: payload.baseUrl,
    navigation: payload.navigation,
    selectedTutorial: payload.selectedTutorial
  });
};
