import TutorialStore from './stores/TutorialStore';
import ArticleStore from './stores/ArticleStore';
import loadSettingsAction from './action/loadSettingsAction';
import navigateAction from './action/navigateAction';
import loadArticleAction from './action/loadArticleAction';
import TutorialNavigator from './components/TutorialNavigator';
import Breadcrumbs from './components/Breadcrumbs';
import Tutorial from './components/Tutorial';
import { ServiceName } from './action/loadArticleAction';
import articleService from './services/articleService';
import NavigatorAndTutorialView  from './view/NavigatorAndTutorialView';
import createCustomContext  from './util/createCustomContext';

module.exports = {
  TutorialNavigator : TutorialNavigator,
  Breadcrumbs: Breadcrumbs,
  Tutorial : Tutorial,
  TutorialStore : TutorialStore,
  ArticleStore : ArticleStore,
  articleService : articleService,
  loadSettingsAction : loadSettingsAction,
  loadArticleAction : loadArticleAction,
  NavigatorAndTutorialView : NavigatorAndTutorialView,
  createCustomContext: createCustomContext,
  navigateAction: navigateAction,
  Constants : {
    ArticleServiceName : ServiceName
  }
}
