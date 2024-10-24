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

  armorArray: Array<any> = [];
  armorObj = {
    name: '',
    descrip: '',
    currValue: -1,
  };

  bagsArray: Array<any> = [];
  bagsObj = {
    name: '',
    descrip: '',
    currValue: -1,
  };

  essentialsArray: Array<any> = [];
  essentialsObj = {
    descrip: '',
    currValue: -1,
  };

  specialArray: Array<any> = [];
  specialObj = {
    descrip: '',
    currValue: -1,
  };

  weaponArray: Array<any> = [];
  weaponObj = {
    name: '',
    descrip: '',
    currValue: -1,
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
        this.ritualObj = [];

        this.weaponArray = this.randomNumber.shuffle(OFFICE_TOOLS);
        // need to preserve the order of SUITS in case it's a designer
        this.armorArray = this.randomNumber.shuffle(JSON.parse(JSON.stringify(SUITS)));
        this.bagsArray = this.randomNumber.shuffle(BAGS);
        this.essentialsArray = this.randomNumber.shuffle(ESSENTIALS);
        this.specialArray = this.randomNumber.shuffle(SPECIALS);
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
          //reshuffle ritual array and remove all rituals
          this.modifiedRitualArray = JSON.parse(JSON.stringify(RITUALS));
          this.ritualObj = [];
        }
      }
    }
  }

  rerollAll() {

    this.modifiedIncantArray = this.randomNumber.shuffle(JSON.parse(JSON.stringify(INCANTATIONS)));
    this.modifiedRitualArray = this.randomNumber.shuffle(JSON.parse(JSON.stringify(RITUALS)));
    if (this.job.name === 'supplier') {
      // check if there's a special incant and remove it.
      // this keeps the extra incants if the supplier pulled them
      if (this.incantObj.length > 2) {
        this.incantObj.shift();
      }
    }
    if (this.job.name === 'designer') {
      this.incantObj = [];
      this.armorObj = {
        name: '',
        descrip: '',
        currValue: -1,
      }; 
      this.rerollIncantations(false);
    } else if (this.job.name !== 'supplier') {
      this.ritualObj = [];
      this.incantObj = [];
    } 
    this.rerollWeapon(this.job.name === 'designer');
    this.rerollArmor(this.job.name === 'designer');
    this.rerollBags();
    this.rerollEssentials();
    this.rerollSpecials();
  }

  rerollBags() {
    const isEndOfArray = this.bagsArray.length === this.bagsObj.currValue + 1;
    if (isEndOfArray) this.bagsArray = this.randomNumber.shuffle(this.bagsArray);

    const newValue = isEndOfArray ? 0 : this.bagsObj.currValue + 1;
    this.bagsObj = {
      name: this.bagsArray[newValue].name,
      descrip: this.bagsArray[newValue].descrip,
      currValue: newValue,
    };
  };

  rerollEssentials() {
    const isEndOfArray = this.essentialsArray.length === this.essentialsObj.currValue + 1;
    if (isEndOfArray) this.essentialsArray = this.randomNumber.shuffle(this.essentialsArray);

    const newValue = isEndOfArray ? 0 : this.essentialsObj.currValue + 1;
    this.essentialsObj = {
      descrip: this.essentialsArray[newValue],
      currValue: newValue,
    };
  }

  removeIncantation(index: number, rollSpecials: boolean) {
    this.incantObj.splice(index, 1);
    if (rollSpecials) this.rerollSpecials();
  }

  private seekNewIncantPosition(index?: number): number {
    const posToSkip: Array<number> = [];
    this.incantObj.forEach((incant: { name: string; }) => posToSkip.push(this.modifiedIncantArray.findIndex(modIncant => modIncant.name === incant.name)));

    let newPos;
    if (index !== undefined) {
      newPos = this.incantObj[index].prevValue;
    } else {
      newPos = -1;
    }
    do {
      newPos += 1
      if (newPos === this.modifiedIncantArray.length) {
        //if the newPos is past the end of the array, go the front
        newPos = 0;
      }
    } while (posToSkip.includes(newPos));
    return newPos;
  }

  rerollIncantations(isSpecial: boolean, incantIndex?: number,) {  
    if (this.incantsEmpty) {
      // this is empty
      const newIncant = {
        name: this.modifiedIncantArray[0].name,
        descrip: this.modifiedIncantArray[0].descrip,
        prevValue: 0,
        isSpecial: isSpecial
      };
      this.incantObj.push(newIncant);
    } else if (incantIndex  !== undefined) {
      // not empty, but not new
      // we need to get the next pos that isn't in use
      const newPos = this.seekNewIncantPosition(incantIndex);

      //we've got a position that works, assign it to current index
      this.incantObj[incantIndex] = {
        name: this.modifiedIncantArray[newPos].name,
        descrip: this.modifiedIncantArray[newPos].descrip,
        prevValue: newPos,
        isSpecial: isSpecial
      };
    } else {
      const newPos = this.seekNewIncantPosition();

      //we have a newPos that works, add it to the incantObj
      const newIncant = {
        name: this.modifiedIncantArray[newPos].name,
        descrip: this.modifiedIncantArray[newPos].descrip,
        prevValue: newPos,
        isSpecial: isSpecial
      };
      if (isSpecial) {
        // put it in the front
        this.incantObj.unshift(newIncant);
      } else {
        this.incantObj.push(newIncant);
      }
    }
    this.incantsEmpty = this.incantObj.length === 0;
  }

  private seekNewRitualPosition(index?: number): number {
    const posToSkip: Array<number> = [];
    this.ritualObj.forEach((ritualName: { name: any; }) => posToSkip.push(
      this.modifiedRitualArray.findIndex(modName => {
        return modName.name === ritualName.name;
      })
    ))

    let newPos = index !== undefined ?
      this.ritualObj[index].prevValue : -1;

    do {
      newPos += 1
      if (newPos === this.modifiedRitualArray.length) {
        //if the newPos is past the end of the array, go the front
        newPos = 0;
      }
    } while (posToSkip.includes(newPos));

    return newPos;
  }

  rerollRituals(ritualIndex?: number) {
    if (this.ritualsEmpty) {
      const newRitual = {
        name: this.modifiedRitualArray[0].name,
        descrip: this.modifiedRitualArray[0].descrip,
        ingredients: this.modifiedRitualArray[0].ingredients,
        condition: this.modifiedRitualArray[0].condition,
        prevValue: 0
      };

      this.ritualObj.push(newRitual);
    } else if (ritualIndex !== undefined) {
      //not empty, but not new
      // we need to get the next pos that isn't in use
      const newPos = this.seekNewRitualPosition(ritualIndex);

      //we've got a position that works, assign it to current index
      this.ritualObj[ritualIndex] = {
        name: this.modifiedRitualArray[newPos].name,
        descrip: this.modifiedRitualArray[newPos].descrip,
        ingredients: this.modifiedRitualArray[newPos].ingredients,
        condition: this.modifiedRitualArray[newPos].condition,
        prevValue: newPos,
      };
    } else {
      //not empty and new
      const newPos = this.seekNewRitualPosition();

      const newRitual = {
        name: this.modifiedRitualArray[newPos].name,
        descrip: this.modifiedRitualArray[newPos].descrip,
        ingredients: this.modifiedRitualArray[newPos].ingredients,
        condition: this.modifiedRitualArray[newPos].condition,
        prevValue: newPos,
      };

      this.ritualObj.push(newRitual);
    }
    this.ritualsEmpty = this.ritualObj.length === 0;
  }

  rerollSpecials() {
    const isEndOfArray = this.specialArray.length === this.specialObj.currValue + 1;
    if (isEndOfArray) this.specialArray = this.randomNumber.shuffle(this.specialArray);

    const newValue = isEndOfArray ? 0 : this.specialObj.currValue + 1;

    if (this.specialArray[newValue].includes('incantation')) {
      this.specialObj = {
        descrip: '',
        currValue: newValue
      };
      this.rerollIncantations(true);
    }
    else {
      this.specialObj = {
        descrip: this.specialArray[newValue],
        currValue: newValue,
      };
    }
  }

  rerollWeapon(isDesigner?: boolean) {
    const isEndOfArray = this.weaponArray.length === this.weaponObj.currValue + 1;
    if (isEndOfArray) this.weaponArray = this.randomNumber.shuffle(this.weaponArray);

    const newValue = isEndOfArray ? 0 : this.weaponObj.currValue + 1;
    this.weaponObj = {
      name: this.weaponArray[newValue].name,
      descrip: this.weaponArray[newValue].descrip,
      currValue: newValue,
    };
  }

  rerollArmor(isDesigner?: boolean) {
    let isEndOfArray: boolean = false;
    if (isDesigner) {
      this.armorArray = JSON.parse(JSON.stringify(SUITS));
      isEndOfArray = 2 <= this.armorObj.currValue + 1;
      const newValue = isEndOfArray ? 0 : this.armorObj.currValue + 1;
      this.armorObj = {
        name: this.armorArray[newValue].name,
        descrip: this.armorArray[newValue].descrip,
        currValue: newValue,
      };
    } else {
      isEndOfArray = this.armorArray.length === this.armorObj.currValue + 1;

      if (isEndOfArray && !isDesigner) this.armorArray = this.randomNumber.shuffle(this.armorArray);

      const newValue = isEndOfArray ? 0 : this.armorObj.currValue + 1;
      this.armorObj = {
        name: this.armorArray[newValue].name,
        descrip: this.armorArray[newValue].descrip,
        currValue: newValue,
      };
    }
  }
}
