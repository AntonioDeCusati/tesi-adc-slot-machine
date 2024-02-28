import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent {
  @ViewChild('slot1') slot1: ElementRef | any;
  @ViewChild('slot2') slot2: ElementRef | any;
  @ViewChild('slot3') slot3: ElementRef | any;
  @ViewChild('buttonSlot') buttonSlot: ElementRef | any;

  disableButtons: boolean = false;
  t1 = 0;
  t2 = 0;
  t3 = 0;
  disableButton = true;
  preventClick= false;
  saldo = 0;
  soldiTotaliInseriti = 0;
  clickFatti= 0;

  arraySimboli = ['🍎', '🍑', '🍉', '🥕', '🥔', '🍇', '💎', '🍄'];

  ngAfterViewInit(): void {
    this.slot1.nativeElement.innerHTML =
      this.arraySimboli[this.generaRandom(this.arraySimboli.length)];
    this.slot2.nativeElement.innerHTML =
      this.arraySimboli[this.generaRandom(this.arraySimboli.length)];
    this.slot3.nativeElement.innerHTML =
      this.arraySimboli[this.generaRandom(this.arraySimboli.length)];
  }

  game() {


    this.clickFatti = this.clickFatti +1;

    this.disableButton = true;
    this.saldo = this.saldo - 1;

    const attempts1 = this.numberAttempts(2, 6);
    const attempts2 = this.numberAttempts(7, 13);
    const attempts3 = this.numberAttempts(14, 20);

    (this.t1 = 0), (this.t2 = 0), (this.t3 = 0);

    let slot1Aw: any = setInterval(
      () => this.playGameT1(this.slot1, attempts1, slot1Aw),
      100
    );
    let slot2Aw: any = setInterval(
      () => this.playGameT2(this.slot2, attempts2, slot2Aw),
      100
    );
    let slot3Aw: any = setInterval(
      () => this.playGameT3(this.slot3, attempts3, slot3Aw),
      100
    );
  }

  playGameT1(slot: any, attempts: any, slotAw: any) {
    let numberRandom = this.generaRandom(this.arraySimboli.length);
    slot.nativeElement.innerHTML = this.arraySimboli[numberRandom];
    this.t1 = this.t1 + 1;
    if (this.t1 == attempts) {
      clearInterval(slotAw);
      return null;
    }
    return null;
  }
  playGameT2(slot: any, attempts: any, slotAw: any) {
    let numberRandom = this.generaRandom(this.arraySimboli.length);
    slot.nativeElement.innerHTML = this.arraySimboli[numberRandom];
    this.t2 = this.t2 + 1;
    if (this.t2 == attempts) {
      clearInterval(slotAw);
      return null;
    }
    return null;
  }
  playGameT3(slot: any, attempts: any, slotAw: any) {
    let numberRandom = this.generaRandom(this.arraySimboli.length);
    slot.nativeElement.innerHTML = this.arraySimboli[numberRandom];
    this.t3 = this.t3 + 1;
    if (this.t3 == attempts) {
      clearInterval(slotAw);

      this.victory();
      return null;
    }
    return null;
  }

  victory() {
    if (
      this.slot1.nativeElement.innerHTML ==
        this.slot2.nativeElement.innerHTML &&
      this.slot2.nativeElement.innerHTML == this.slot3.nativeElement.innerHTML
    ) {
      console.log('Vittoria TOTALE');
      if (this.slot1.nativeElement.innerHTML === '💎') {
        this.saldo = this.saldo + 8;
      } else {
        this.saldo = this.saldo + 5;
      }
    } else if (
      this.slot1.nativeElement.innerHTML ==
        this.slot2.nativeElement.innerHTML ||
      this.slot2.nativeElement.innerHTML ==
        this.slot3.nativeElement.innerHTML ||
      this.slot1.nativeElement.innerHTML == this.slot3.nativeElement.innerHTML
    ) {
      console.log('Vittoria parziale');
      if (
        (this.slot1.nativeElement.innerHTML ==
          this.slot2.nativeElement.innerHTML &&
          this.slot1.nativeElement.innerHTML === '💎') ||
        (this.slot2.nativeElement.innerHTML ==
          this.slot3.nativeElement.innerHTML &&
          this.slot2.nativeElement.innerHTML === '💎') ||
        (this.slot1.nativeElement.innerHTML ==
          this.slot3.nativeElement.innerHTML &&
          this.slot1.nativeElement.innerHTML === '💎')
      ) {
        this.saldo = this.saldo + 4;
        this.disableButton = false;
      } else {
        this.saldo = this.saldo + 2;
        this.disableButton = false;
      }
    } else {
      console.log('Peccato hai perso');
      console.log('saldo: ', this.saldo);
      if (this.saldo === 0) {
        this.disableButton = true;
      }else{
        this.disableButton = false;
      }
    }

    console.log(this.clickFatti)

  }

  addMoney(money: number) {
    this.saldo = this.saldo + money;

    if (this.saldo > 0) {
      this.disableButton = false;
    }
  }


  generaRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  numberAttempts(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
