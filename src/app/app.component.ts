import { Alphabet } from './models/alphabet';
import { AlphabetService } from './services/alphabet.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, merge, forkJoin } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeechService } from './services/text-to-speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-ar-alphabets';

  alphabets: string[];
  alphabet: string;
  subscription: Subscription;
  alphabetData: Alphabet;
  currentIndex = 0;
  isLoading: boolean;
  swipeAction = { Left: 'swipeleft', Right: 'swiperight' };
  constructor(private alphabetService: AlphabetService,
              private sanitizer: DomSanitizer,
              private textToSpeechService: TextToSpeechService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.alphabetService.getAlphabetList().subscribe(a => {
      this.alphabet = a[0];
      this.alphabets = a;

      this.setAlphabetData();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSwipe(currentIndex: number, action: any) {
    let nextIndex = 0;
    if (action === this.swipeAction.Right) {
      if (currentIndex === 0) {
        nextIndex = this.alphabets.length - 1;
      } else {
        nextIndex = (currentIndex - 1) % this.alphabets.length;
      }
    } else if (action === this.swipeAction.Left) {
      nextIndex = (currentIndex + 1) % this.alphabets.length;
    }
    this.alphabet = this.alphabets[nextIndex];
    this.currentIndex = nextIndex;
    this.setAlphabetData();
  }

  setAlphabetData() {
    this.isLoading = true;
    this.subscription = this.alphabetService.getAlphabet(this.alphabet).subscribe(ad => {
      this.isLoading = false;
      this.alphabetData = ad;
    });
  }

  speak() {
    this.textToSpeechService.speak(this.alphabetData.obj);
  }

  cleanURL(oldURL: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
}
