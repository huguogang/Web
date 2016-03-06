(function (app) {
  app.Page2Component =
  ng.core.Component({
    template: `<i>Page 2 content.</i>`
  })
    .Class({
      constructor: function () { }
    });
})(window.app || (window.app = {}));