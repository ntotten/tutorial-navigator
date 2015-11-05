var plugin = require('./lib/App');

module.exports = {
  // Components
  TutorialNavigator : plugin.TutorialNavigator,
  Breadcrumbs: plugin.Breadcrumbs,
  Tutorial : plugin.Tutorial,
  NavigatorAndTutorialView : plugin.NavigatorAndTutorialView,

  // Stores
  TutorialStore : plugin.TutorialStore,
  ArticleStore : plugin.ArticleStore,

  // Actinos
  loadSettingsAction : plugin.loadSettingsAction,
  loadArticleAction : plugin.loadArticleAction,
  navigateAction: plugin.navigateAction,

  // Utils
  createCustomContext: plugin.createCustomContext,

  // Service
  articleService: plugin.articleService,
  Constants : plugin.Constants,
};
