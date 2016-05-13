import _ from 'lodash';

export function getPlatformName(appType) {
  var options = {
    'native': 'Native App',
    'web': 'Web Application',
    'service': 'Backend Service'
  };

  return options[appType];
}

export function getQuestion(appType) {
  appType = appType || 'none';
  
  var questions = {
    'none': 'Getting started? Try our quickstarts.',
    'native': 'Select a native SDK',
    'web': 'What technology are you using for your web app?',
    'service': 'Select an API or Backend platform'
  };

  return questions[appType];
}

export function getPlatformSlug(appType) {
  var paths = {
    'native': 'x-native-platforms',
    'web': 'x-web-platforms',
    'service': 'x-service-platforms'
  };

  return paths[appType];
}

export function loadArticle(payload) {
  
  let tokens = ['/docs'];
  if (payload.appType)  tokens.push(getPlatformSlug(payload.appType));
  if (payload.platform) tokens.push(payload.platform);
  if (payload.article)  tokens.push(payload.article);
  
  let url = tokens.join('/') + "?e=1";
  if (payload.clientId) url += `&a=${payload.clientId}`;
  
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
