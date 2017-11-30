(function (app) {
  app.AppComponent =
  ng.core.Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1> <i>This header above is provided dynamically from app/app.component.js</i>'
  })
    .Class({
      constructor: function () { }
    });
})(window.app || (window.app = {}));