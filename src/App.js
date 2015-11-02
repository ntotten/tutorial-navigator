import TutorialStore from './stores/TutorialStore';
import ArticleStore from './stores/ArticleStore';
import loadSettingsAction from './action/loadSettingsAction';
import navigateAction from './action/navigateAction';
import loadArticleAction from './action/loadArticleAction';
import TutorialNavigator from './components/TutorialNavigator';
import Breadcrumbs from './components/Breadcrumbs';
import Tutorial from './components/Tutorial';
import { ServiceName } from './action/loadArticleAction';

module.exports = {
  TutorialNavigator : TutorialNavigator,
  Breadcrumbs: Breadcrumbs,
  Tutorial : Tutorial,
  TutorialStore : TutorialStore,
  ArticleStore : ArticleStore,
  loadSettingsAction : loadSettingsAction,
  loadArticleAction : loadArticleAction,
  navigateAction: navigateAction,
  Constants : {
    ArticleServiceName : ServiceName
  }
}
