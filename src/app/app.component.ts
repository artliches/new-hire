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
  ];

  jobObj = {
    name: '',
    extra: [''],
    descrip: '',
    skill_descrips: [''],
    first_skill: [''],
    second_skill: [''],
    stats: [{}],
    prevValue: -1,
  };

  hasIncantOrRitual = {
    first: '',
    other: ''
  };

  triggerReroll: boolean = false;

  ngOnInit(): void {
    this.getJob();   
  }

  rerollAll() {
    this.getJob();
    this.triggerReroll = !this.triggerReroll;
  }

  getJob() {
    const randNum = this.getRandomNum(JOBS, this.jobObj);
    const chosenJob = JOBS[randNum];

    this.jobObj = {
      name: chosenJob.name,
      extra: chosenJob.extra,
      descrip: chosenJob.descrip,
      skill_descrips: chosenJob.skill_descrips,
      first_skill: chosenJob.first_skill,
      second_skill: chosenJob.second_skill,
      stats: chosenJob?.stats,
      prevValue: randNum
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
