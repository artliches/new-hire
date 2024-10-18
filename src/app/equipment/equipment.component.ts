import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { BAGS, ESSENTIALS, INCANTATIONS, OFFICE_TOOLS, SPECIALS, SUITS } from '../assets/new_hires.contants';
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

  incantObj = [{
    name: '',
    descrip: '',
    prevValue: -1
  }];

  ritualObj = {
    descrip: '',
    prevValue: -1,
  };

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rerollAll();
  }

  rerollAll() {
    this.rerollWeapon();
    this.rerollArmor();
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

  rerollIncantations(isSupplier?: boolean) {
    // const newIncant = {
    //   name: '',
    //   descrip: '',
    //   prevValue: -1
    // }
    // this.incantObj.push(newIncant);
    const randNum = this.randomNumber.getRandomNumber(0, INCANTATIONS.length - 1, this.incantObj[0].prevValue);
    const data = INCANTATIONS[randNum];
    this.incantObj[0] = {
      name: data.name,
      descrip: data.descrip,
      prevValue: randNum
    };
  }

  rerollRituals() {

  }

  rerollSpecials() {
    const randNum = this.getRandomNum(SPECIALS.length, this.specialObj.prevValue);
    const data = SPECIALS[randNum];

    if (data.includes('incantation')) {
      this.specialObj = {
        descrip: '',
        prevValue: randNum
      };
      this.rerollIncantations();
    }
    else {
      this.incantObj[0] = {
        name: '',
        descrip: '',
        prevValue: -1
      },
      this.specialObj = {
        descrip: data,
        prevValue: randNum,
      };
    }
  }

  rerollWeapon() {
    const randNum = this.getRandomNum(6, this.weaponObj.prevValue);
    const data = OFFICE_TOOLS[randNum];
    this.weaponObj = {
      name: data.name,
      descrip: data.descrip,
      prevValue: randNum,
    };
  }

  rerollArmor() {
    const randNum = this.getRandomNum(4, this.armorObj.prevValue);
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
