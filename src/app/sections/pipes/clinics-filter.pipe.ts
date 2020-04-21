import { Pipe, PipeTransform } from '@angular/core';
import { Clinic } from '../models/clinic.model';
import { FilterValues } from '../models/filter-values.model';

@Pipe({ name: 'clinicsDivisionScreeningFilter' })
export class ClinicsFilterPipe implements PipeTransform {
   transform(clinics: Clinic[], filterValues: FilterValues, addresses): Array<Clinic> {  
       if (!clinics) return [];    
       return clinics.filter(
           item => item.verkOmr == filterValues.screeningType.type 
        && item.division === filterValues.region.division      
        ).sort((a, b): number =>{ 
            if(a.klartext < b.klartext) return -1;
            if(a.klartext > b.klartext) return 1;
            return 0;
        });          
   }
}