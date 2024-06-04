import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  @ViewChild('matTab') matTab!: MatTabGroup;

  switchToLoginTab() {
    this.matTab.selectedIndex = 0;
  }
}
