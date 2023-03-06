export class User {
  constructor(
    firstName,
    lastName,
    email,
    dateOfBirth,
    countryOfResidence,
    zipCode,
    contactNumber,
    typeOfUser,
    listOfShipments
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.countryOfResidence = countryOfResidence;
    this.zipCode = zipCode;
    this.contactNumber = contactNumber;
    this.typeOfUser = typeOfUser;
    this.listOfShipments = listOfShipments;
  }
}
