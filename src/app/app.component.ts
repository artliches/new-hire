import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IdentityComponent } from "./identity/identity.component";
import { ResumeComponent } from './resume/resume.component';
import { JOBS } from './assets/new_hires.contants';
import { RandomNumberService } from './services/random-number.service';
import { JobComponent } from "./job/job.component";
import { EquipmentComponent } from "./equipment/equipment.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, IdentityComponent, ResumeComponent, JobComponent, EquipmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private randomNumber: RandomNumberService
  ) {}

  currTheme: string = 'excel';
  themeArray: Array<string> = [
    'excel',
    'mork',
    'blackout',
    'bos',
  ];

  jobArray: Array<any> = [];
  jobObj = {
    name: '',
    extra: [''],
    descrip: '',
    skill_descrips: [''],
    first_skill: [''],
    second_skill: [''],
    stats: [{}],
    currValue: -1,
  };

  hasIncantOrRitual = {
    first: '',
    other: ''
  };

  triggerReroll: boolean = false;

  ngOnInit(): void {
    this.jobArray = this.randomNumber.shuffle(JOBS);
    this.getJob();   
  }

  print() {
    window.print();
  }

  rerollAll() {
    this.getJob();
    this.triggerReroll = !this.triggerReroll;
  }

  getJob() {
    const isEndOfArray = this.jobArray.length === this.jobObj.currValue + 1;
    if (isEndOfArray) this.jobArray = this.randomNumber.shuffle(JOBS);

    const newValue = isEndOfArray ? 0 : this.jobObj.currValue + 1;
    this.jobObj = {
      name: this.jobArray[newValue].name,
      extra: this.jobArray[newValue].extra,
      descrip: this.jobArray[newValue].descrip,
      skill_descrips: this.jobArray[newValue].skill_descrips,
      first_skill: this.jobArray[newValue].first_skill,
      second_skill: this.jobArray[newValue].second_skill,
      stats: this.jobArray[newValue].stats,
      currValue: newValue
    };
  }

  getIncantOrRitual(event: any) {
    this.hasIncantOrRitual = event;
  }

  private getRandomNum(array: Array<any>, infoObj: {descrip: string, prevValue: number}) {
    return this.randomNumber.getRandomNumber(0, array.length - 1, infoObj.prevValue);
  }

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
