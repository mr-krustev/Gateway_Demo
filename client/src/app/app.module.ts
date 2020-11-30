import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { GatewayService } from './services/gateway.service';

// Root
import { AppComponent } from './components/core/root/app.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { ToolbarComponent } from './components/core/toolbar/toolbar.component';

// Pages
import { HomeComponent } from './components/home/home.component';
import { GatewayViewComponent } from './components/gateway-view/gateway-view.component';

// Partials
import { DashboardComponent } from './components/partials/dashboard/dashboard.component';
import { GatewayCardComponent } from './components/partials/gateway-card/gateway-card.component';

// Dialogs
import { AddPeripheralDialogComponent } from './components/partials/dialogs/add-peripheral-dialog/add-peripheral-dialog.component';
import { ConfirmationDialogComponent } from './components/partials/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AddGatewayDialogComponent } from './components/partials/dialogs/add-gateway-dialog/add-gateway-dialog.component';

// Pipes
import { JoinPipe } from './utilities/pipes/join.pipe';
import { RegexSplitPipe } from './utilities/pipes/regex-split.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ToolbarComponent,
    FooterComponent,
    GatewayCardComponent,
    AddPeripheralDialogComponent,
    ConfirmationDialogComponent,
    AddGatewayDialogComponent,
    JoinPipe,
    RegexSplitPipe,
    GatewayViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GatewayService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPeripheralDialogComponent,
    ConfirmationDialogComponent,
    AddGatewayDialogComponent
  ]
})
export class AppModule { }
