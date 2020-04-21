import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="page-header">
        <h1>Välkommen! <small>Exempelapp för struktur av AngularJS-app</small></h1>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="well text-center">
                <h3>Användare</h3>
                <p>Användaradministration... Den är jätterolig!</p>
            </div>
        </div>
        <div class="col-md-6">
            <div class="well text-center">
                <h3>Om</h3>
                <p>Försök hitta en bättre om-sida!</p>
            </div>
        </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
