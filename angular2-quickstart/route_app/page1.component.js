(function (app) {
  app.Page1Component =
  ng.core.Component({
    template: `<i>Content for page 1.</i>`
  })
    .Class({
      constructor: function () { }
    });
})(window.app || (window.app = {}));