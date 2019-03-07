import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.volume = 0.25;
    utterance.rate = 1;
    utterance.pitch = 0.5;
    window.speechSynthesis.speak(utterance);
  }
}
