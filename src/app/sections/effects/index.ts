import {MaintenanceListsEffects} from './maintenance-lists.effect';
import {MaintenanceEffects} from './maintenance.effect';
import {ClinicEffects} from './clinic.effect';
import {AddressEffects} from './address.effect';
import {InvitationEffects} from './invitation.effect';

export const effects: any[] = [
    MaintenanceListsEffects,
    MaintenanceEffects, 
    ClinicEffects, 
    AddressEffects, 
    InvitationEffects];

export * from './maintenance-lists.effect';
export * from './maintenance.effect';
export * from './clinic.effect';
export * from './address.effect';
export * from './invitation.effect';