import React from 'react';
import ReactDOM from 'react-dom';
import NavigatorAndTutorialView from '../view/navigator-and-tutorial-view';

export default function renderElement(mountPoint, options) {
  ReactDOM.render(
    React.createElement(NavigatorAndTutorialView, options),
    mountPoint
  );
}
