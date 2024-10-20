import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { BAGS, ESSENTIALS, INCANTATIONS, OFFICE_TOOLS, RITUALS, SPECIALS, SUITS } from '../assets/new_hires.contants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent implements OnInit, OnChanges {
  constructor(
    private randomNumber: RandomNumberService
  ) {}

  @Input() job: any;
  @Input() getIncantOrRitual: {first: string, other: string} = {first: '', other: ''};

  armorObj = {
    name: '',
    descrip: '',
    prevValue: -1,
  };

  bagsObj = {
    name: '',
    descrip: '',
    prevValue: -1,
  };

  essentialsObj = {
    descrip: '',
    prevValue: -1,
  };

  specialObj = {
    descrip: '',
    prevValue: -1,
  };

  weaponObj = {
    name: '',
    descrip: '',
    prevValue: -1,
  };

  incantObj: any = [];
  incantsEmpty: boolean = true;
  modifiedIncantArray: Array<any> = [];

  ritualObj: any = [];
  ritualsEmpty: boolean = true;
  modifiedRitualArray: Array<any> = [];

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      if (changes['job'].currentValue !== changes['job'].previousValue || changes['job'].isFirstChange()) {
        this.incantObj = [];
        this.rerollAll();
      }
    }
    if (this.job.name === 'supplier' && changes['getIncantOrRitual']) {
      if (
        changes['getIncantOrRitual'].currentValue['first'].includes('Incantations') ||
        changes['getIncantOrRitual'].currentValue['other'].includes('Incantations')
      ) {
        // do we already have incants?
        if (this.incantObj.length > 1) {
          // we already have incants, don't add another
        }
        else {
          for (let i = 0; i < 2; i++) {
            this.rerollIncantations(false);
          }
        }
      } else if (
        changes['getIncantOrRitual'].previousValue
      ) {
        if (
          changes['getIncantOrRitual'].previousValue['first'].includes('Incantations') ||
          changes['getIncantOrRitual'].previousValue['other'].includes('Incantations')
        ) {
          // we can at most have 3 incants
          for (let i = 1; i >= 0; i --) {
            const pos = INCANTATIONS.map(x => x.name).indexOf(this.incantObj[i].name);
            this.modifiedIncantArray.splice(pos, 0, INCANTATIONS[pos]);
            this.incantObj.pop();
          }
        }
      }

      if (
        changes['getIncantOrRitual'].currentValue['first'].includes('Rituals') ||
        changes['getIncantOrRitual'].currentValue['other'].includes('Rituals')
      ) {
          // do we already have rituals?
          if (this.ritualObj.length > 1) {
            // we already have incants, don't add another
          }
          else {
            for (let i = 0; i < 2; i++) {
              this.rerollRituals();
            }
          }
      } else if (
        changes['getIncantOrRitual'].previousValue
      ) {
        if (
          changes['getIncantOrRitual'].previousValue['first'].includes('Rituals') ||
          changes['getIncantOrRitual'].previousValue['other'].includes('Rituals')
        ) {
          // remove all incants
          this.modifiedRitualArray = JSON.parse(JSON.stringify(RITUALS));
          this.ritualObj = [];
        }
      }
    }
  }

  rerollAll() {
    this.modifiedIncantArray = JSON.parse(JSON.stringify(INCANTATIONS));
    this.modifiedRitualArray = JSON.parse(JSON.stringify(RITUALS));
    if (this.job.name === 'supplier') {
      // check if there's a special incant and remove it.
      // this keeps the extra incants if the supplier pulled them
      if (this.incantObj.length > 2) {
        this.incantObj.shift();
      }
    }
    if (this.job.name === 'designer') {
      this.incantObj = [];
      this.rerollIncantations(false);
    } else if (this.job.name !== 'supplier') this.ritualObj = [];
    this.rerollWeapon(this.job.name === 'designer');
    this.rerollArmor(this.job.name === 'designer');
    this.rerollBags();
    this.rerollEssentials();
    this.rerollSpecials();
  }

  rerollBags() {
    const randNum = this.getRandomNum(BAGS.length, this.bagsObj.prevValue);
    const data = BAGS[randNum];
    this.bagsObj = {
      name: data.name,
      descrip: data.descrip,
      prevValue: randNum,
    };
  };

  rerollEssentials() {
    const randNum = this.getRandomNum(ESSENTIALS.length, this.essentialsObj.prevValue);
    const data = ESSENTIALS[randNum];
    this.essentialsObj = {
      descrip: data,
      prevValue: randNum,
    };
  }

  removeIncantation(index: number, rollSpecials: boolean) {
    const pos = INCANTATIONS.map(x => x.name).indexOf(this.incantObj[index].name);
    this.modifiedIncantArray.splice(pos, 0, INCANTATIONS[pos]);
    this.incantObj.splice(index, 1);
    if (rollSpecials) this.rerollSpecials();
  }

  rerollIncantations(isSpecial: boolean, incantIndex?: number,) {  
    if (this.incantsEmpty) {
      // this is empty
      const randNum = this.randomNumber.getRandomNumber(0, INCANTATIONS.length - 1);
      const data = INCANTATIONS[randNum];
      const newIncant = {
        name: data.name,
        descrip: data.descrip,
        prevValue: randNum,
        isSpecial: isSpecial
      };
      this.incantObj.push(newIncant);
      this.modifiedIncantArray.splice(randNum, 1);

    } else if (incantIndex  !== undefined) {
      // not empty, but not new
      const randNum = this.randomNumber.getRandomNumber(0, this.modifiedIncantArray.length - 1);
      const data = this.modifiedIncantArray[randNum];
      const pos = INCANTATIONS.map(x => x.name).indexOf(this.incantObj[incantIndex].name);
      
      this.incantObj[incantIndex] = {
        name: data.name,
        descrip: data.descrip,
        prevValue: randNum,
        isSpecial: isSpecial
      };
      //remove new value
      this.modifiedIncantArray.splice(randNum, 1);
      // //return the value
      this.modifiedIncantArray.splice(pos, 0, INCANTATIONS[pos]);
    } else {
      // not empty and new
      const randNum = this.randomNumber.getRandomNumber(0, this.modifiedIncantArray.length - 1);
      const data = this.modifiedIncantArray[randNum];
      const newIncant = {
        name: data.name,
        descrip: data.descrip,
        prevValue: randNum,
        isSpecial: isSpecial
      };

      if (isSpecial) {
        // put it in the front
        this.incantObj.unshift(newIncant);
      } else {
        this.incantObj.push(newIncant);
      }

      this.modifiedIncantArray.splice(randNum, 1);
    }
    this.incantsEmpty = this.incantObj.length === 0;
  }

  rerollRituals(ritualIndex?: number) {
    if (this.ritualsEmpty) {
      const randNum = this.randomNumber.getRandomNumber(0, RITUALS.length - 1);
      const data = RITUALS[randNum];
      const newRitual = {
        name: data.name,
        descrip: data.descrip,
        ingredients: data.ingredients,
        condition: data.condition,
        prevValue: randNum
      };

      this.ritualObj.push(newRitual);
      this.modifiedRitualArray.splice(randNum, 1);
    } else if (ritualIndex !== undefined) {
      //not empty, but not new
      const randNum = this.randomNumber.getRandomNumber(0, this.modifiedRitualArray.length - 1);
      const data = this.modifiedRitualArray[randNum];
      const pos = RITUALS.map(x => x.name).indexOf(this.ritualObj[ritualIndex].name);
      
      this.ritualObj[ritualIndex] = {
        name: data.name,
        descrip: data.descrip,
        ingredients: data.ingredients,
        condition: data.condition,
        prevValue: randNum,
      };
      //remove new value
      this.modifiedRitualArray.splice(randNum, 1);
      // //return the value
      this.modifiedRitualArray.splice(pos, 0, RITUALS[pos]);

    } else {
      //not empty and new
      const randNum = this.randomNumber.getRandomNumber(0, this.modifiedRitualArray.length - 1);
      const data = this.modifiedRitualArray[randNum];
      const newRitual = {
        name: data.name,
        descrip: data.descrip,
        ingredients: data.ingredients,
        condition: data.condition,
        prevValue: randNum,
      };

      this.ritualObj.push(newRitual);
      this.modifiedRitualArray.splice(randNum, 1);
    }
    this.ritualsEmpty = this.ritualObj.length === 0;
  }

  rerollSpecials() {
    const randNum = this.getRandomNum(SPECIALS.length, this.specialObj.prevValue);
    const data = SPECIALS[randNum];

    if (data.includes('incantation')) {
      this.specialObj = {
        descrip: '',
        prevValue: randNum
      };
      this.rerollIncantations(true);
    }
    else {
      this.specialObj = {
        descrip: data,
        prevValue: randNum,
      };
    }
  }

  rerollWeapon(isDesigner?: boolean) {
    const randNum = this.getRandomNum(6, this.weaponObj.prevValue);
    const data = OFFICE_TOOLS[randNum];
    this.weaponObj = {
      name: data.name,
      descrip: data.descrip,
      prevValue: randNum,
    };
  }

  rerollArmor(isDesigner?: boolean) {
    const randNum = this.getRandomNum(isDesigner ? 2 : 4, this.armorObj.prevValue);
    const data = SUITS[randNum];
    this.armorObj = {
      name: data.name,
      descrip: data.descrip,
      prevValue: randNum,
    };
  }

  private getRandomNum(arrayLength: number, prevValue: number) {
    return this.randomNumber.getRandomNumber(0, arrayLength - 1, prevValue);
  }
}
