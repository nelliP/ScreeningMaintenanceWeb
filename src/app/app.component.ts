import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                  
                    <span class="icon-bar"></span>
                </button>
                <span class="navbar-brand">Screening Underhåll</span>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li routerLinkActive="active"><a routerLink="/main">Mottagning</a></li>
                    
                    <li routerLinkActive="active"><a routerLink="/auth/signOut">Logga ut</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
        <router-outlet></router-outlet>
      
        <hr />
       
    </div>
  `,
//styleUrls: ['../styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent { }
