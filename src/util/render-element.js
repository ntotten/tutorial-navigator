import React from 'react';
import NavigatorAndTutorialView from '../view/navigator-and-tutorial-view';

export default function renderElement(documentElement, options){
  React.render(
      React.createElement(NavigatorAndTutorialView, options),
      documentElement
  );
}
