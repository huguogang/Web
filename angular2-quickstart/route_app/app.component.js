(function (app) {
  app.AppComponent =
  ng.core.Component({
    selector: 'my-app',
    template: `<h1>Route Demo</h1>
    <nav>
      
    </nav>
    <router-outlet></router-outlet>`
    //<a [routerLink]="['Page1']">Page 1</a>
    //<a [routerLink]="['Page2']">Page 2</a>
  })
    .Class({
      constructor: function () {
        router.config([
          { 'path': '/', 'component': IndexComp },
          { 'path': '/user/:id', 'component': UserComp },
        ]);
      }
    });
})(window.app || (window.app = {}));