import hospitalsReducer, {
  deleteHospitalById,
  updateHospital,
  addHospital
} from "./hospitalsSlice";
import {HARDCODED_HOSPITALS} from "../../constants";

describe("hospitals reducer", () => {

  const initialState = {
    isLoading: false,
    error: "",
    data: HARDCODED_HOSPITALS,
  }

  it('should delete hospital by id', function () {
    const actual = hospitalsReducer(initialState, deleteHospitalById(222))
    expect(actual.data).toEqual([
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
    ]);
  });

  it('should set hospital data', function () {
    const actual = hospitalsReducer(initialState, updateHospital({
      id: 333,
      hospitalName: "Updated Hospital",
      streetLine1: "701 Updated Marshall Street",
      streetLine2: "Updated",
      city: "West Updated",
      state: "Updated",
      zip: "19381",
      contactPerson: "Updated John",
      contactCellphone: "+1 (Updated) 654-32-10",
    }));
    expect(actual.data).toEqual([
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
        hospitalName: "Updated Hospital",
        streetLine1: "701 Updated Marshall Street",
        streetLine2: "Updated",
        city: "West Updated",
        state: "Updated",
        zip: "19381",
        contactPerson: "Updated John",
        contactCellphone: "+1 (Updated) 654-32-10",
      },
    ])
  });

  it('should add new hospital', function () {
    const actual = hospitalsReducer(initialState, addHospital());
    expect(actual.data).toEqual([
      ...HARDCODED_HOSPITALS,
      expect.objectContaining({
        // id: Date.now(), partial matching, property "id" is optional for test
        hospitalName: "",
        streetLine1: "",
        streetLine2: "",
        city: "",
        state: "",
        zip: "",
        contactPerson: "",
        contactCellphone: "",
      }),
    ])
  });

  it('should delete all hospitals', function () {
    let actual = hospitalsReducer(initialState, deleteHospitalById(111));
    actual = hospitalsReducer(actual, deleteHospitalById(222));
    actual = hospitalsReducer(actual, deleteHospitalById(333));
    expect(actual.data).toEqual([]);
  });
});