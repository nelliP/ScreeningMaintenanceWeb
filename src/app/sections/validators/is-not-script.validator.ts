import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export function ValidateIsNotScript(findScript: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => { 
    const isMatch = findScript.test(control.value);
    return isMatch ? {'webTidbokKommentar': {value: control.value}} : null;
  }; 
}