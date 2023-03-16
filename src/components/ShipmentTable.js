import React from "react";
//import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ShipmentTable = ({ orders, onDelete }) => {
  return (
    <div class="flex items-center justify-center h-screen mx-auto">
      <TableContainer
        component={Paper}
        style={{ maxHeight: 500, maxWidth: 1000 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Recievers Name</TableCell>
              <TableCell>Recievers address</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.category}</TableCell>
                <TableCell>{order.status}</TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(order.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShipmentTable;
