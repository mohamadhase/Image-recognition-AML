import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecognitionComponentComponent } from './recognition-component/recognition-component.component';
import { ResultComponentComponent } from './result-component/result-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RecognitionComponentComponent,
    ResultComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
