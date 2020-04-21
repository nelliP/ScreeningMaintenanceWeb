import { Clinic } from "./clinic.model";
import { Address } from "./address.model";
import { Invitation } from "./invitation.model";
import { Region } from "./region.model";

export class MaintenanceLists {
  id: number;
  clinics: Clinic[];
  addresses: Address[];
  invitations: Invitation[];
  regions: Region[]; 

  constructor() {}
  }