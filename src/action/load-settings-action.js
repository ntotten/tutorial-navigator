export default function loadSettingsAction(context, payload){
  return context.dispatch('LOAD_SETTINGS', {
    quickstart: payload.quickstart,
    navigation: payload.navigation,
    selectedTutorial: payload.selectedTutorial
  });
};
