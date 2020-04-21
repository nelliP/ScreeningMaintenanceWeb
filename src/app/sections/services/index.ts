import { MaintenanceListsService } from '../services/maintenance-lists.service';
import { MaintenanceService } from '../services/maintenance.service';
import { ClinicService } from '../services/clinic.service';
import { AddressService } from '../services/address.service';
import { InvitationService } from '../services/invitation.service';

export const services: any[] = [
    MaintenanceListsService,
    MaintenanceService,
    ClinicService, 
    AddressService, 
    InvitationService
];

export * from '../services/maintenance-lists.service';
export * from '../services/maintenance.service';
export * from '../services/clinic.service';
export * from '../services/address.service';
export * from '../services/invitation.service';