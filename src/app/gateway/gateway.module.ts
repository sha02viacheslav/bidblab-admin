import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { GatewayComponent } from './gateway.component';

@NgModule({
  imports: [
    CommonModule,
    GatewayRoutingModule
  ],
  declarations: [VerifyAccountComponent, GatewayComponent],
  exports: [
    GatewayComponent
  ]
  
})
export class GatewayModule { }
