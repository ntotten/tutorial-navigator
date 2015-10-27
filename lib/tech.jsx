var Tech = React.createClass({
  handleClick: function(tech) {
    var tutorial = this.props.tutorial;
    var config = {
      path: '/' + tutorial.appType + '/' + tech.name + '/'
    };

    if(tutorial.options === 'backend' || tutorial.options === 'webapp') {
      config.skippable = false;

      if(tutorial.tech1) {
        config.path = '/' + tutorial.appType + '/' + tutorial.tech1 + '/' + tech.name;
        return this.props.onClick(tutorial.appType, tutorial.tech1, tech.name);
      }
    }

    return this.props.onClick(tutorial.appType, tech.name);
  },
  render: function() {
    var tech = this.props.model;
    var style = {
      animationDelay: this.props.delay + "ms",
      WebkitAnimationDelay: this.props.delay + "ms",
      animationDuration: "200ms",
      WebkitAnimationDuration: "200ms",
      animationTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      WebkitAnimationTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)"
    };

    return (
      <li className="animated scaleIn" style={style}>
        <div data-name={tech.name} className="circle-logo" onClick={this.handleClick.bind(this, tech)}>
          <div className="logo"></div>
          <div className="title">{tech.title}</div>
        </div>
      </li>
    );
  }
});

module.exports = Tech;
