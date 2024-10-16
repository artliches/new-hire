import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IdentityComponent } from "./identity/identity.component";
import { ResumeComponent } from './resume/resume.component';
import { JOBS } from './assets/new_hires.contants';
import { RandomNumberService } from './services/random-number.service';
import { JobComponent } from "./job/job.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, IdentityComponent, ResumeComponent, JobComponent],
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
    descrip: '',
    skill_descrips: [''],
    first_skill: [''],
    second_skill: [''],
    prevValue: -1,
  };

  ngOnInit(): void {
    this.getJob();   
  }

  getJob() {
    const randNum = this.getRandomNum(JOBS, this.jobObj);
    const chosenJob = JOBS[randNum];

    this.jobObj = {
      name: chosenJob.name,
      descrip: chosenJob.descrip,
      skill_descrips: chosenJob.skill_descrips,
      first_skill: chosenJob.first_skill,
      second_skill: chosenJob.second_skill,
      prevValue: randNum
    };
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
