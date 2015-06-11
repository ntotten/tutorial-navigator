/**
 * Module dependencies.
 */

var _ = require('to-function');
var modella = require('modella');
var defaults = require('modella-defaults');
/**
 * Define model
 */

var Tutorial = module.exports = modella('Tutorial');

/**
 * Extend model with `defaults` plugin
 */

Tutorial.use(defaults);

/**
 * Define attributes
 */

Tutorial
  .attr('clientId', { default: '' })
  .attr('docsDomain', { default: 'https://docs.auth0.com' })
  .attr('apptype', { default: '' })
  .attr('nativePlatform', { default: '' })
  .attr('hybridPlatform', { default: '' })
  .attr('clientPlatform', { default: '' })
  .attr('serverApi', { default: '' })
  .attr('serverPlatform', { default: '' })
  .attr('apptypes', { default: [] })
  .attr('nativeplatforms', { default: [] })
  .attr('hybridplatforms', { default: [] })
  .attr('clientplatforms', { default: [] })
  .attr('serverplatforms', { default: [] })
  .attr('serverapis', { default: [] })
  .attr('codevisible', { default: false })
  .attr('nativevisible', { default: false })
  .attr('hybridvisible', { default: false })
  .attr('clientvisible', { default: false })
  .attr('serverapivisible', { default: false })
