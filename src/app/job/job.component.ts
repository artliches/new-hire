import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit, OnChanges {
  constructor(
    private randomNumber: RandomNumberService
  ) {}
  @Input() job: any;
  @Output() getNewJob: EventEmitter<boolean> = new EventEmitter();;
  isHelpDesker: boolean = false;
  extraIgnore: number = -1;
  showAllSkills: boolean = false;
  firstSkillObj = {
    descrip: '',
    prevValue: -1,
  };

  secondSkillObj = {
    descrip: '',
    prevValue: -1,
  };

  extraSkillObj = {
    descrip: '',
    prevValue: -1,
  };

  ngOnInit(): void {
    // this.isHelpDesker = this.job.name === 'helpdesker';
    // this.rerollAllSkills();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.extraSkillObj = {
      descrip: '',
      prevValue: -1
    };
    this.isHelpDesker = this.job.name === 'helpdesker';
    this.rerollAllSkills();
  }

  rerollSkills(isHelpDesker: boolean) {
    this.rerollFirstSkill(isHelpDesker);
    if (isHelpDesker) {
      this.rerollExtraSkill();
    }
  }

  rerollJob() {
    this.getNewJob.emit(true);
  }

  rerollAllSkills() {
    this.showAllSkills = this.job.name === 'salesperson' || this.job.name === 'controller';
    this.rerollFirstSkill(this.isHelpDesker);
    if (this.isHelpDesker) {
      this.rerollExtraSkill();
    }
    if (!this.showAllSkills) {
      this.rerollSecondSkill();
    } 
  }

  rerollFirstSkill(isHelpdesker?: boolean) {
    if (isHelpdesker) {
      this.firstSkillObj = this.getSkills(this.job.first_skill, this.firstSkillObj, this.extraSkillObj.prevValue);
    } else {
      this.firstSkillObj = this.getSkills(this.job.first_skill, this.firstSkillObj);
    }
  }

  rerollExtraSkill() {
    this.extraSkillObj = this.getSkills(this.job.first_skill, this.extraSkillObj, this.firstSkillObj.prevValue);
  }

  rerollSecondSkill() {
    this.secondSkillObj = this.getSkills(this.job.second_skill, this.secondSkillObj);
  }

  getSkills(skillArray: Array<string>, infoObj: any, extraIgnore?: number) {
    let randNum;
    let chosenSkill;
    if (skillArray.length > 1) {
      randNum = this.getRandomNum(skillArray, infoObj, extraIgnore);
      chosenSkill = skillArray[randNum];
    } else {
      randNum = -1;
      chosenSkill = skillArray[0];
    }
    return infoObj = {
      descrip: chosenSkill,
      prevValue: randNum
    };
  }

  private getRandomNum(array: Array<any>, infoObj: {descrip: string, prevValue: number}, extraIgnore?: number) {
    return this.randomNumber.getRandomNumber(0, array.length - 1, infoObj.prevValue, extraIgnore);
  }

}
