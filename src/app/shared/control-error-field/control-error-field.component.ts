import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-error-field',
  templateUrl: './control-error-field.component.html',
  styleUrls: ['./control-error-field.component.css']
})
export class ControlErrorFieldComponent implements OnInit {

  constructor() { }
  @Input() msgErro!: string;
  @Input() mostrarErro!: boolean;
  ngOnInit(): void {
  }

}
