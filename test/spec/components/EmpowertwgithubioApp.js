'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var EmpowertwgithubioApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    EmpowertwgithubioApp = require('components/EmpowertwgithubioApp.js');
    component = React.createElement(EmpowertwgithubioApp);
  });

  it('should create a new instance of EmpowertwgithubioApp', function () {
    expect(component).toBeDefined();
  });
});
