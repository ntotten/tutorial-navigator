'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesArticleStore = require('../stores/ArticleStore');

var _storesArticleStore2 = _interopRequireDefault(_storesArticleStore);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var Tutorial = (function (_React$Component) {
  _inherits(Tutorial, _React$Component);

  function Tutorial() {
    _classCallCheck(this, Tutorial);

    _get(Object.getPrototypeOf(Tutorial.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Tutorial, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initClient();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.initClient();
    }
  }, {
    key: 'initClient',
    value: function initClient(html) {
      if (typeof document !== 'undefined') {
        if (this.props.onDocumentLoaded) {
          this.props.onDocumentLoaded.call(this);
        }
        var article = this.refs.article;
        if (article) {
          var child = article.firstChild;
          if (child.nodeName === 'H1' || child.nodeName === 'H2') {
            child.classList.add('hide');
          }
        }
      }
    }
  }, {
    key: 'createMarkup',
    value: function createMarkup() {
      return { __html: this.props.articleHtml };
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.articleHtml) {
        return _react2['default'].createElement('div', { id: this.props.tabName,
          className: 'tab-pane' + (this.props['default'] ? ' active' : ''),
          dangerouslySetInnerHTML: this.createMarkup(),
          ref: 'article' });
      } else {
        return _react2['default'].createElement(
          'div',
          { id: this.props.tabName, className: 'loading-tutorial' },
          _react2['default'].createElement(
            'div',
            { className: 'auth0-spinner' },
            _react2['default'].createElement('div', { className: 'spinner' })
          )
        );
      }
    }
  }]);

  return Tutorial;
})(_react2['default'].Component);

Tutorial.contextTypes = {
  getStore: _react2['default'].PropTypes.func,
  executeAction: _react2['default'].PropTypes.func
};

Tutorial = (0, _fluxibleAddonsReact.connectToStores)(Tutorial, [_storesArticleStore2['default']], function (context, props) {
  return {
    articleHtml: context.getStore(_storesArticleStore2['default']).getArticleHtml(props.appType, props.tech)
  };
});

exports['default'] = Tutorial;
module.exports = exports['default'];