export class Shipment {
  constructor(
    recieverName,
    weightOption,
    boxOfColor,
    destinationCountry,
    shipmentStatus
  ) {
    this.recieverName = recieverName;
    this.weightOption = weightOption;
    this.boxOfColor = boxOfColor;
    this.destinationCountry = destinationCountry;
    this.shipmentStatus = shipmentStatus;
  }
}
