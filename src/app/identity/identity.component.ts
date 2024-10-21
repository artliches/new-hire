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

  nameArray: Array<any> = [];
  nameObj = {
    descrip: '',
    currValue: -1,
  };

  pastArray: Array<any> = [];
  pastObj = {
    descrip: '',
    currValue: -1
  };

  issueArray: Array<any> = [];
  issueObj = {
    descrip: '',
    currValue: -1
  };

  reasonArray: Array<any> = [];
  reasonObj = {
    descrip: '',
    currValue: -1
  };

  stressArray: Array<any> = [];
  stressObj = {
    descrip: '',
    currValue: -1
  };

  yearnArray: Array<any> = [];
  yearnObj = {
    descrip: '',
    currValue: -1
  };

  ngOnInit(): void {
    this.nameArray = this.randomNumber.shuffle(NAMES);
    this.pastArray = this.randomNumber.shuffle(PAST);
    this.issueArray = this.randomNumber.shuffle(ISSUES);
    this.reasonArray = this.randomNumber.shuffle(REASON);
    this.stressArray = this.randomNumber.shuffle(STRESS);
    this.yearnArray = this.randomNumber.shuffle(YEARNING);
    
    this.rerollAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (!changes['reroll'].isFirstChange()) this.rerollAll();
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
    const isEndOfArray = this.nameArray.length === this.nameObj.currValue + 1;
    if (isEndOfArray) {
      this.pastArray = this.randomNumber.shuffle(NAMES);
    }
    const newValue = isEndOfArray ? 0 : this.nameObj.currValue + 1;
    this.nameObj = {
      descrip: this.nameArray[newValue],
      currValue: newValue
    };
  }

  rerollPast() {
    const isEndOfArray = this.pastArray.length === this.pastObj.currValue + 1
    if (isEndOfArray) {
      this.pastArray = this.randomNumber.shuffle(PAST);
    }
    const newValue = isEndOfArray ? 0 : this.pastObj.currValue + 1;
    this.pastObj = {
      descrip: this.pastArray[newValue],
      currValue: newValue
    };
  }

  rerollIssue() {
    const isEndOfArray = this.issueArray.length === this.issueObj.currValue + 1;
    if (isEndOfArray) {
      this.issueArray = this.randomNumber.shuffle(ISSUES);
    }
    const newValue = isEndOfArray ? 0 : this.issueObj.currValue + 1;
    this.issueObj = {
      descrip: this.issueArray[newValue],
      currValue: newValue
    };
  }

  rerollReason() {
    const isEndOfArray = this.reasonArray.length === this.reasonObj.currValue + 1;
    if (isEndOfArray) {
      this.reasonArray = this.randomNumber.shuffle(REASON);
    }
    const newValue = isEndOfArray ? 0 : this.reasonObj.currValue + 1;
    this.reasonObj = {
      descrip: this.reasonArray[newValue],
      currValue: newValue
    };
  }

  rerollStress() {
    const isEndOfArray = this.stressArray.length === this.stressObj.currValue + 1;
    if (isEndOfArray) {
      this.stressArray = this.randomNumber.shuffle(STRESS);
    }
    const newValue = isEndOfArray ? 0 : this.stressObj.currValue + 1;
    this.stressObj = {
      descrip: this.stressArray[newValue],
      currValue: newValue
    };
  }

  rerollYearning() {
    const isEndOfArray = this.yearnArray.length === this.yearnObj.currValue + 1;
    if (isEndOfArray) {
      this.yearnArray = this.randomNumber.shuffle(YEARNING);
    }
    const newValue = isEndOfArray ? 0 : this.yearnObj.currValue + 1;
    this.yearnObj = {
      descrip: this.yearnArray[newValue],
      currValue: newValue
    };
  }
}
