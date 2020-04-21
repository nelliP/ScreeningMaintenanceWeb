import { Clinic } from "./clinic.model";
import { Region } from "./region.model";
import { ScreeningType } from "./screening-type.model";;
import { Invitation } from "./invitation.model";
import { Address } from "./address.model";

export class FilterValues {
  region: Region;
  clinic: Clinic;
  address: Address;
  invitation: Invitation;
  screeningType: ScreeningType;
  openModal: boolean;  
  }