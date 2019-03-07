import { AlphabetService } from './services/alphabet.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { TextToSpeechService } from './services/text-to-speech.service';

export class AlphaHammerConfig extends HammerGestureConfig {
  overrides = {
    // override hammerjs default configuration
    pan: { threshold: 5 },
    swipe: {
      velocity: 0.4,
      threshold: 20,
      direction: Hammer.DIRECTION_ALL
    }
  } as any;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    AlphabetService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AlphaHammerConfig
    },
    TextToSpeechService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
