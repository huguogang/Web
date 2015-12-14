(function () {
  var ChildComponent = ng
    .Component({
      selector: 'child',
      template: '<h2>A child component</h2>',
    })
    .Class({
      constructor: function () { }
    });

  var AppComponent = ng
    .Component({
      selector: 'my-app',
      template: '<h1>My First Angular 2 App</h1><child></child><child></child>',
      directives: [ChildComponent]
    })
    .Class({
      constructor: function () { }
    });

  document.addEventListener('DOMContentLoaded', function () {
    ng.bootstrap(AppComponent);
  });
})();