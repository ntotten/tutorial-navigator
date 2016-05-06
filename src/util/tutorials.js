import _ from 'lodash';

export function getPlatformName(platformType) {
  var options = {
    'native': 'Native App',
    'web': 'Web Application',
    'service': 'Backend Service'
  };

  return options[platformType];
}

export function getQuestion(platformType) {
  platformType = platformType || 'none';
  var questions = {
    'none': 'Getting started? Try our quickstarts.',
    'native': 'Select a native SDK',
    'web': 'What technology are you using for your web app?',
    'service': 'Select an API or Backend platform'
  };

  return questions[platformType];
}

export function getPlatformSlug(platformType) {
  var paths = {
    'native': 'x-native-platforms',
    'web': 'x-web-platforms',
    'service': 'x-service-platforms'
  };

  return paths[platformType];
}

export function getPlatformCollection(quickstart, platformType) {
  if(!platformType) {
    return [];
  }

  var options = {
    'native': quickstart.nativePlatforms,
    'web': quickstart.webPlatforms,
    'service': quickstart.servicePlatforms
  };

  return options[platformType];
}

export function getTechTitle(quickstart, appType, techName) {
  var collection = getPlatformCollection(quickstart, appType);

  var result = _.find(collection, { name: techName });

  if(result) {
    return result.title;
  }
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
