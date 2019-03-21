import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
import 'hammerjs';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(bootstrapModule => {
    // TODO: Remove when https://github.com/angular/angular-cli/issues/8779 is fixed?
    if (
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      environment.production
    ) {
      navigator.serviceWorker
        .register('/ngsw-worker.js')
        .catch(err => console.error('Cannot register service worker.', err));
    }
    return bootstrapModule;
  })
  .catch(err => console.log(err));
