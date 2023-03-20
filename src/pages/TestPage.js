import React from 'react';
import ShipmentCard from '../ShipmentComponents/ShipmentCard';

const TestPage = () => {
  const shipment = {
    receiverName: 'John Doe',
    weightOption: 'HUMBLE',
    boxColor: 'Red',
    destinationCountry: 'United States',
    price: 250,
    shipmentHistory: [
      {
        Id: 1,
        shipmentStatus: 'CREATED',
        createdAt: '2023-03-15T10:00:00.000Z',
      },
      {
        Id: 2,
        shipmentStatus: 'RECEIVED',
        createdAt: '2023-03-16T12:00:00.000Z',
      },
      {
        Id: 3,
        shipmentStatus: 'INTRANSIT',
        createdAt: '2023-03-18T15:00:00.000Z',
      },
      {
        Id: 4,
        shipmentStatus: 'COMPLETED',
        createdAt: '2023-03-18T15:00:00.000Z',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ShipmentCard shipment={shipment} />
    </div>
  );
};

export default TestPage;