
var TutorialNavigator = require('tutorial-navigator');
var assert = require('assert');

describe('TutorialNavigator()', function() {
  it('should initialize', function(done) {
    var tutorial = new TutorialNavigator();
    assert(tutorial);
    done();
  });
});
