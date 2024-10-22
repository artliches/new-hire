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
  @Output() getNewJob: EventEmitter<boolean> = new EventEmitter();
  @Output() emitIncantOrRitual: EventEmitter<any> = new EventEmitter();

  getExtraStartSkill: boolean = false;
  extraIgnore: number = -1;
  showAllSkills: boolean = false;

  firstSkillArray: Array<any> = [];
  firstSkillObj = {
    descrip: '',
    currValue: -1,
  };

  secondSkillArray: Array<any> = [];
  secondSkillObj = {
    descrip: '',
    currValue: -1,
  };

  extraSkillArray: Array<any> = [];
  extraSkillObj = {
    descrip: '',
    currValue: -1,
  };

  refArray: Array<any> = [];

  ngOnInit(): void {
    this.showAllSkills = this.job.name === 'salesperson' || this.job.name === 'controller';
    this.getExtraStartSkill = this.job.name === 'helpdesker' || this.job.name === 'supplier';
    if (this.getExtraStartSkill) {
      this.extraSkillArray = this.randomNumber.shuffle(this.job.first_skill);
      this.initalExtraSkills();
    } else {
      this.firstSkillArray = this.randomNumber.shuffle(this.job.first_skill);
      this.newSkill();
    }
    
    if (!this.showAllSkills) {
      this.secondSkillArray = this.randomNumber.shuffle(this.job.second_skill);
      this.newSecondSkill();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['job'].isFirstChange()) {
      this.extraSkillObj = {
        descrip: '',
        currValue: -1
      };

      this.firstSkillObj = {
        descrip: '',
        currValue: -1,
      };

      this.secondSkillObj = {
        descrip: '',
        currValue: -1,
      };

      this.showAllSkills = this.job.name === 'salesperson' || this.job.name === 'controller';
      this.getExtraStartSkill = this.job.name === 'helpdesker' || this.job.name === 'supplier';
      if (this.getExtraStartSkill) {
        this.extraSkillArray = this.randomNumber.shuffle(this.job.first_skill);
        this.initalExtraSkills();
      } else {
        this.firstSkillArray = this.randomNumber.shuffle(this.job.first_skill);
        this.newSkill();

      this.emitIncantOrRitual.emit(
        {
          first: this.firstSkillObj.descrip,
          other: this.extraSkillObj.descrip
        }
      );
      }
      if (!this.showAllSkills) {
        this.secondSkillArray = this.randomNumber.shuffle(this.job.second_skill);
        this.newSecondSkill();
      }
    }
  }

  initalExtraSkills() {
      //get both shuffled arrays
      //give the first entry to first
      this.firstSkillObj = {
        descrip: this.extraSkillArray[0],
        currValue: 0,
      };
      //give second entry to extra
      this.extraSkillObj = {
        descrip: this.extraSkillArray[1],
        currValue: 1,
      }

      this.emitIncantOrRitual.emit(
        {
          first: this.firstSkillObj.descrip,
          other: this.extraSkillObj.descrip
        }
      );
  }

  rerollFirstSkills() {
    if (this.getExtraStartSkill) {
      this.rerollFirstExtraSkill(true);
      this.rerollFirstExtraSkill(false);
    } else {
      this.newSkill();
    }
  }

  rerollFirstExtraSkill(isFirst: boolean) {
    //we're using the same array, easier to track this way
    let posToChange = this.extraSkillArray.indexOf(
      isFirst ? this.firstSkillObj.descrip : this.extraSkillObj.descrip
    );
    const posTosSkip = this.extraSkillArray.indexOf(
      isFirst ? this.extraSkillObj.descrip : this.firstSkillObj.descrip
    );

    //now we need to get the next entry that isn't already in use
    do {
      posToChange += 1
    } while (
      this.extraSkillArray[posToChange] === this.extraSkillArray[posTosSkip]
    );

    // check for end of array
    if (posToChange === this.extraSkillArray.length) {
      posToChange = posTosSkip === 0 ? 1 : 0;
      //reshuffle the array
      this.extraSkillArray = this.randomNumber.shuffle(this.extraSkillArray);
    }
    if (isFirst) {
      this.firstSkillObj = {
        descrip: this.extraSkillArray[posToChange],
        currValue: posToChange
      }
    } else {
      this.extraSkillObj = {
        descrip: this.extraSkillArray[posToChange],
        currValue: posToChange
      }
    }
    this.emitIncantOrRitual.emit(
      {
        first: this.firstSkillObj.descrip,
        other: this.extraSkillObj.descrip
      }
    );
  }

  newSkill() {
    if (this.job.first_skill.length === 1) {
      this.firstSkillObj = {
        descrip: this.job.first_skill[0],
        currValue: 0,
      };
    } else {
      const isEndOfArray = this.firstSkillArray.length === this.firstSkillObj.currValue  + 1;
      if (isEndOfArray) {
        this.firstSkillArray = this.randomNumber.shuffle(this.firstSkillArray);
      }
  
      const newValue = isEndOfArray ? 0 : this.firstSkillObj.currValue + 1;
      this.firstSkillObj = {
        descrip: this.firstSkillArray[newValue],
        currValue: newValue
      };
    }
  }

  newSecondSkill() {
    const isEndOfArray = this.secondSkillArray.length === this.secondSkillObj.currValue + 1;
    if (isEndOfArray) {
      this.secondSkillArray = this.randomNumber.shuffle(this.secondSkillArray);
    }
    const newValue = isEndOfArray ? 0 : this.secondSkillObj.currValue + 1;
    this.secondSkillObj = {
      descrip: this.secondSkillArray[newValue],
      currValue: newValue
    };
  }

  rerollJob() {
    this.getNewJob.emit(true);
  }
}
