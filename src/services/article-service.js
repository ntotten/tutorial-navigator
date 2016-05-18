import _ from 'lodash';

let ArticleService = {};

ArticleService.loadArticle = function(quickstarts, payload) {
  
  let {appType, platform, article, clientId} = payload;
  
  let tokens = ['/docs'];
  if (appType)  tokens.push(quickstarts[appType].slug);
  if (platform) tokens.push(platform);
  if (article)  tokens.push(article);
  
  let url = tokens.join('/') + "?e=1";
  if (clientId) url += `&a=${clientId}`;
  
  function checkStatus(response) {
   if (response.status >= 200 && response.status < 400) {
     return response;
   } else {
     var error = new Error(response.statusText);
     error.status = response.status;
     error.response = response;
     throw error;
   }
  }

  return fetch(url, {credentials: 'include'})
  .then(checkStatus)
  .then(function(response) {
    return response.text();
  });
  
};

export default ArticleService;
