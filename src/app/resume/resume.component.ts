import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { JOBS } from '../assets/new_hires.contants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit, OnChanges {
  constructor(
    private randomNumber: RandomNumberService
  ) {}

  @Input() job: any;
  traitsArray = [
    {
      name: 'soft skills',
      value: 0
    },
    {
      name: 'hard skills',
      value: 0
    },
    {
      name: 'flexibility',
      value: 0
    },
    {
      name: 'integrity',
      value: 0
    },
    {
      name: 'knowledge',
      value: 0
    },
  ];

  statsArray = [
    {
      name: 'hp',
      value: 0,
      rolledValue: 0,
    },
    {
      name: 'undos',
      value: 0
    },
    {
      name: '$avings',
      value: 0
    }
  ];

  ngOnInit(): void {
    this.rerollResume();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.rerollResume();
  }

  rerollTrait(traitName: string) {
    const index = this.traitsArray.findIndex(trait => trait.name === traitName);

    let modifier;
    let rawRoll = this.randomNumber.rollMultipleDice(3, 6);
    const jobMod = this.job.stats.find((mod: { name: string; }) => mod.name === traitName);
    
    if (jobMod) rawRoll += jobMod.mod;
    modifier = this.getModifierFromRawRoll(rawRoll);

    if (modifier) this.traitsArray[index].value = modifier;

    if (traitName === 'integrity') {
      this.rerollHP(true);
    }
  }

  rerollResume() {
    //roll traits
    this.traitsArray.forEach((trait) => {
      let modifier;
      let rawRoll = this.randomNumber.rollMultipleDice(3, 6);
      const jobMod = this.job.stats.find((mod: { name: string; }) => mod.name === trait.name);

      if (jobMod) rawRoll += jobMod.mod;
      modifier = this.getModifierFromRawRoll(rawRoll);

      if (modifier) trait.value = modifier;
    });
    this.rerollHP();
  }

  rerollHP(noReroll?: boolean) {
    // integrity + d8, never less than 1
    const index = this.statsArray.findIndex(trait => trait.name === 'hp');
    const integrity = this.traitsArray[this.traitsArray.findIndex(trait => trait.name === 'integrity')].value;
    const hpMod = this.job.stats.find((mod: { name: string; }) => mod.name === 'hp');
    let hp = 0;

    if (hpMod) {
      const dieSize = hpMod.mod[0];
      // only accounting for positive mods!!!
      const numericalMod = hpMod.mod.indexOf('+') !== -1 ?
       Number( hpMod.mod[hpMod.mod.indexOf('+') + 1]) : 0;
      
      this.statsArray[index].rolledValue = noReroll && this.statsArray[index].rolledValue ?
        this.statsArray[index].rolledValue : this.randomNumber.getRandomNumber(1, dieSize);

      hp = this.statsArray[index].rolledValue + integrity + numericalMod;
    } else {
      this.statsArray[index].rolledValue = noReroll && this.statsArray[index].rolledValue ?
      this.statsArray[index].rolledValue : this.randomNumber.getRandomNumber(1, 8);

      hp = this.statsArray[index].rolledValue + integrity;
    }
    this.statsArray[index].value = hp > 0 ? hp : 1;
  }

  private getModifierFromRawRoll(rawRoll: number): number | undefined {
    switch (true) {
      case rawRoll <= 4: {
        return -3;
      }
      case rawRoll === 5 || rawRoll === 6: {
        return -2;
      }
      case rawRoll === 7 || rawRoll === 8: {
        return -1;
      }
      case rawRoll >= 9 && rawRoll <= 12: {
        return 0;
      }
      case rawRoll === 13 || rawRoll === 14: {
        return 1;
      }
      case rawRoll === 15 || rawRoll === 16: {
        return 2;
      }
      case rawRoll >= 17 && rawRoll <= 20: {
        return 3;
      }
      default:
        return undefined;
    }
  }
}
