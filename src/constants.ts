import {IHospital} from "./types";

export const HARDCODED_HOSPITALS: IHospital[] = [
  {
    id: 111,
    hospitalName: "Allegheny General Hospital",
    streetLine1: "320 East North Avenue",
    streetLine2: "",
    city: "Pittsburgh",
    state: "PA",
    zip: "15212",
    contactPerson: "John Doe",
    contactCellphone: "+1 (234) 567-89-00",
  },
  {
    id: 222,
    hospitalName: "Butler Memorial Hospital",
    streetLine1: "One Hospital Way",
    streetLine2: "",
    city: "Butler",
    state: "PA",
    zip: "16001-4697",
    contactPerson: "Another John",
    contactCellphone: "+1 (987) 654-32-10",
  },
  {
    id: 333,
    hospitalName: "Chester County Hospital",
    streetLine1: "701 East Marshall Street",
    streetLine2: "",
    city: "West Chester",
    state: "PA",
    zip: "19380-4412",
    contactPerson: "Another John",
    contactCellphone: "+1 (987) 654-32-10",
  },
];