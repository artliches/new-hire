import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { ISSUES, NAMES, PAST, REASON, STRESS, YEARNING } from '../assets/new_hires.contants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss'
})
export class IdentityComponent implements OnInit, OnChanges {
  constructor(
    private randomNumber: RandomNumberService,
  ) {}

  @Input() reroll: boolean = false;

  nameObj = {
    descrip: '',
    prevValue: -1,
  };

  pastObj = {
    descrip: '',
    prevValue: -1
  };

  issueObj = {
    descrip: '',
    prevValue: -1
  };

  reasonObj = {
    descrip: '',
    prevValue: -1
  };

  stressObj = {
    descrip: '',
    prevValue: -1
  };

  yearnObj = {
    descrip: '',
    prevValue: -1
  };

  ngOnInit(): void {
    this.rerollAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.rerollAll();
  }

  rerollAll() {
    this.rerollPast();
    this.rerollReason();
    this.rerollYearning();
    this.rerollStress();
    this.rerollName();
    this.rerollIssue();
  }

  rerollName() {
    const randNum = this.getRandomNum(NAMES, this.nameObj);
    this.nameObj = {
      descrip: NAMES[randNum],
      prevValue: randNum
    };
  }

  rerollPast() {
    const randNum = this.getRandomNum(PAST, this.pastObj);
    this.pastObj.descrip = PAST[randNum];
    this.pastObj.prevValue = randNum;
  }

  rerollIssue() {
    const randNum = this.getRandomNum(ISSUES, this.issueObj);
    this.issueObj = {
      descrip: ISSUES[randNum],
      prevValue: randNum
    };
  }

  rerollReason() {
    const randNum = this.getRandomNum(REASON, this.reasonObj);
    this.reasonObj.descrip = REASON[randNum];
    this.reasonObj.prevValue = randNum;
  }

  rerollStress() {
    const randNum = this.getRandomNum(STRESS, this.stressObj);
    this.stressObj.descrip = STRESS[randNum];
    this.stressObj.prevValue = randNum;
  }

  rerollYearning() {
    const randNum = this.getRandomNum(YEARNING, this.yearnObj);
    this.yearnObj.descrip = YEARNING[randNum];
    this.yearnObj.prevValue = randNum;
  }

  private getRandomNum(array: Array<any>, infoObj: {descrip: string, prevValue: number}) {
    return this.randomNumber.getRandomNumber(0, array.length - 1, infoObj.prevValue);
  }

}
