import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight: number = 0;
  height: number = 0;
  imc: number = 0;
  classification: string = '';
  degree: number = 0;

  constructor(private toastCtrl: ToastController) {}

  onCalculate() {
    if (this.height <= 0 || this.weight <= 0) {
      return;
    }

    this.imc = this.weight / (this.height * this.height);
    this.onSetClassification();
    this.showIMC();
  }

  onSetClassification() {
    if (this.imc < 18.5) {
      this.classification = 'MAGREZA';
      this.degree = 0;
    } else if (this.imc >= 18.5 && this.imc <= 24.9) {
      this.classification = 'NORMAL';
      this.degree = 0;
    } else if (this.imc >= 25 && this.imc <= 29.9) {
      this.classification = 'SOBREPESO';
      this.degree = 1;
    } else if (this.imc >= 30 && this.imc <= 39.9) {
      this.classification = 'OBESIDADE';
      this.degree = 2;
    } else if (this.imc >= 40) {
      this.classification = 'OBESIDADE GRAVE';
      this.degree = 3;
    }
  }

  async showIMC() {
    const toast = await this.toastCtrl.create({
      message: `IMC = ${this.imc.toFixed(2)}, CLASSIFICAÇÃO: ${
        this.classification
      }, GRAU DE OBESIDADE: ${this.degree}`,
      duration: 3000,
      color: 'secondary',
    });

    toast.present();
  }
}
