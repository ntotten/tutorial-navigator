'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var TenantSwitcher = _react2['default'].createClass({
  displayName: 'TenantSwitcher',

  getInitialState: function getInitialState() {
    return {
      tenant: this.props.tenants[0],
      client: this.props.tenants[0].clients[0]
    };
  },
  getClients: function getClients() {
    var clientArray = this.state.tenant.clients;
    var list = [];

    clientArray.forEach(function (client, i) {
      list.push(_react2['default'].createElement(
        'option',
        { key: i, value: i },
        client.name
      ));
    });

    return list;
  },
  getTenants: function getTenants() {
    var tenants = this.props.tenants;
    var list = [];

    tenants.forEach(function (item, i) {
      list.push(_react2['default'].createElement(
        'option',
        { key: i, value: i },
        item.tenant
      ));
    });

    return list;
  },
  onClientChange: function onClientChange(event) {
    var currentClient = this.state.tenant.clients[event.target.value];

    this.setState({
      client: currentClient
    });

    this.props.updateTutorial({
      clientID: currentClient.clientID
    });
  },
  onTenantChange: function onTenantChange(event) {
    var currentTenant = this.props.tenants[event.target.value];

    this.setState({
      tenant: currentTenant,
      client: currentTenant.clients[0]
    });

    this.props.updateTutorial({
      clientID: currentTenant.clients[0].clientID
    });
  },
  render: function render() {
    var cssClass = this.props.tutorial.appType ? 'hide tenant-switcher' : 'tenant-switcher';

    return _react2['default'].createElement(
      'div',
      { key: this.props.tutorial.appType, className: cssClass },
      _react2['default'].createElement(
        'div',
        { className: 'text' },
        'Choose an account or application to customize your Tutorials'
      ),
      _react2['default'].createElement('span', { className: 'icon icon-budicon-300' }),
      _react2['default'].createElement(
        'div',
        { className: 'custom-select' },
        _react2['default'].createElement(
          'span',
          { 'data-select-value': true },
          this.state.tenant.tenant,
          ' ',
          _react2['default'].createElement('i', { className: 'icon-budicon-460' })
        ),
        _react2['default'].createElement(
          'select',
          { name: 'tenant', onChange: this.onTenantChange },
          this.getTenants()
        )
      ),
      _react2['default'].createElement('span', { className: 'icon icon-budicon-375' }),
      _react2['default'].createElement(
        'div',
        { className: 'custom-select' },
        _react2['default'].createElement(
          'span',
          { 'data-select-value': true },
          this.state.client.name,
          ' ',
          _react2['default'].createElement('i', { className: 'icon-budicon-460' })
        ),
        _react2['default'].createElement(
          'select',
          { name: 'app', onChange: this.onClientChange },
          this.getClients()
        )
      )
    );
  }
});

exports['default'] = TenantSwitcher;
module.exports = exports['default'];