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
      value: 0,
      dieSize: '0',
    }
  ];

  ngOnInit(): void {
    // this.rerollResume();
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
      this.rerollStats('hp', true);
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
    this.statsArray.forEach(stat => {
      this.rerollStats(stat.name);
    })
  }

  rerollStats(statName: string, noReroll?: boolean) {
    //parse class savings
    const index = this.statsArray.findIndex(stat => stat.name === statName);
    const mod = this.job.stats.find((mod: { name: string; }) => mod.name === statName);
    let stat = 0;

    if (statName === 'hp') {
      let hp = 0;
      const integrity = this.traitsArray[this.traitsArray.findIndex(trait => trait.name === 'integrity')].value;
      if (mod) {
        const dieSize = mod.mod[0];
        // only accounting for positive mods!!!
        const numericalMod = mod.mod.indexOf('+') !== -1 ?
         Number( mod.mod[mod.mod.indexOf('+') + 1]) : 0;
        
        this.statsArray[index].rolledValue = noReroll && this.statsArray[index].rolledValue ?
          this.statsArray[index].rolledValue : this.randomNumber.getRandomNumber(1, dieSize);
  
        hp = this.statsArray[index].rolledValue + integrity + numericalMod;
      } else {
        this.statsArray[index].rolledValue = noReroll && this.statsArray[index].rolledValue ?
        this.statsArray[index].rolledValue : this.randomNumber.getRandomNumber(1, 8);
  
        hp = this.statsArray[index].rolledValue + integrity;
      }
      this.statsArray[index].value = hp > 0 ? hp : 1;
    }else if (mod && statName === '$avings') {
      const dieNum = mod.mod[0];
      const multiplier = mod.mod.indexOf('x') > -1 ?
        mod.mod.slice(mod.mod.indexOf('x') + 1) : 1;
      const dieSize = multiplier > 1 ?
        mod.mod.slice(mod.mod.indexOf('d') + 1, mod.mod.indexOf('x')) :
        mod.mod.slice(mod.mod.indexOf('d') + 1);
      
      this.statsArray[index].value = this.randomNumber.rollMultipleDice(dieNum, dieSize) * multiplier;
    } else if(statName === 'undos') {
      const dieSize = mod.mod[mod.mod.indexOf('d') + 1];
      const addition = mod.mod.indexOf('+') > -1 ? 
        mod.mod.slice(mod.mod.indexOf('+') + 1) : 0;
      this.statsArray[index].dieSize = addition > 0 ? `${dieSize} + ${addition}` : `${dieSize}`;
      this.statsArray[index].value = this.randomNumber.getRandomNumber(1, dieSize) + Number(addition);
    }
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
