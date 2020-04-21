import { Clinic } from "./clinic.model";
import { Address } from "./address.model";
import { Invitation } from "./invitation.model";
import { Region } from "./region.model";

export class Maintenance {
  id: number;
  clinic: Clinic;
  address: Address;
  invitation: Invitation;
  region: Region; 

  constructor() {}
  }