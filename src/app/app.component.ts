import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currTheme: string = 'excel';
  themeArray: Array<string> = [
    'excel',
    'mork',
  ];

  getCurrTheme() {
    return this.currTheme;
  }

  shuffleTheme() {
    const currThemeIndex = this.themeArray.indexOf(this.currTheme);
    const maxArrayLength = this.themeArray.length - 1;
    this.currTheme = currThemeIndex === maxArrayLength ?
      this.themeArray[0] : this.themeArray[currThemeIndex + 1];
  }
}
