import {createMockComponentContext} from 'fluxible/utils';
import TutorialStore from '../src/stores/TutorialStore';
import TutorialNavigator from '../src/components/TutorialNavigator';
import InitialSettingsAction from '../src/action/InitialSettingsAction'
import assert from 'assert';
import Fluxible from 'fluxible';
import { createElementWithContext } from 'fluxible-addons-react';
import jsdom from 'jsdom';

describe('Tutorial Navigator Test', function () {
    var componentContext;
    var React;
    var ReactTestUtils;
    var provideContext;
    var connectToStores;
    var context;

    beforeEach(function (done) {
        var app = new Fluxible({
            component: TutorialNavigator
        });
        app.registerStore(TutorialStore);
        context = app.createContext();

        jsdom.env('<html><body></body></html>', [], function (err, window) {
            global.window = window;
            global.document = window.document;
            global.navigator = window.navigator;

            // React must be required after window is set
            React = require('react');
            ReactTestUtils = require('react/lib/ReactTestUtils');
            provideContext = require('fluxible-addons-react/provideContext');
            connectToStores = require('fluxible-addons-react/connectToStores');

            done();
        });
    });

    afterEach(function () {
        delete global.window;
        delete global.document;
        delete global.navigator;
        context = null;
    });

    it('Store should be registered', function (done) {
      var storeInstance = context.getStore(TutorialStore);
      assert.notEqual(storeInstance, 'undefined');
      done();
    });

    it('Should create Tutorial Navigator structure with context', function (done) {
      var platforms = JSON.parse('{"apptypes":[], "clientPlatforms":[],"nativePlatforms":[],"serverPlatforms":[]}');
      context.getActionContext().executeAction(InitialSettingsAction, {
        quickstart: platforms,
        baseUrl: 'http://localhost:5050'
      }).then(() =>{
        var component = ReactTestUtils.renderIntoDocument(
            createElementWithContext(context)
        );

        done();
      })
    });
});
