import { AbstractControl, ValidatorFn } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs';


export function ValidateShortTitle(shortTitlesObs: Observable<string[]>): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    var shortTitles: string[];
    shortTitlesObs.subscribe(
      x => shortTitles = x
    );      
      for (let index = 0; index < shortTitles.length; index++) {
      const element = shortTitles[index];
      var isMatch: boolean = element == (control.value).toUpperCase() ?  true : false;
        if(isMatch){
          break;
        }
      }
    return isMatch ? {'avdTeam': {value: control.value}} : null;
  }; 
}