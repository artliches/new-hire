import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  constructor() { }

  getRandomNumber(min: number, max: number, prev?: number, extraIgnore?: number): number {
    let numToReturn = Math.floor(Math.random() * (max - min + 1) ) + min;
    if (
        prev !== undefined && prev > -1 && prev === numToReturn ||
        extraIgnore !== undefined && extraIgnore > -1 && extraIgnore === numToReturn
      ) {
        do {
            numToReturn = Math.floor(Math.random() * (max - min + 1) ) + min;
        } while (prev === numToReturn || extraIgnore === numToReturn);
    }
      return numToReturn;
    }

    rollMultipleDice(dieNum: number, dieSize: number): number {
      let sum = 0;
      for (let i = 0; i < dieNum; i++) {
        sum += this.getRandomNumber(1, dieSize);
      }
      return sum;
    }
}
