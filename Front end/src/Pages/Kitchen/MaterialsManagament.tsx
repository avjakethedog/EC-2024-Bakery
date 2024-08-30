import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const materials = [
  "Bột mì đa dụng",
  "Bơ lạt lạnh",
  "Nước lạnh",
  "Đường trắng",
  "Muối",
  "Bơ lạt",
  "Lòng đỏ trứng gà",
  "Bột bắp",
  "Tinh chất vani",
  "Whipping cream",
  "Sữa tươi không đường",
  "Trứng gà",
  "Dứa xay nhỏ",
  "Mạch nha",
  "Bột quế",
  "Cream cheese",
  "Đường bột",
  "Bột Custard",
  "Đường đen",
  "Muối nở"
];

const MaterialsManagement = () => {
  // Get the current date and format it
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Remaining Ingredients: {currentDate}</h1>
      <Form>
        <Form.Group controlId="formMaterialName">
          <Form.Label>Material Name</Form.Label>
          <Form.Control as="select">
            {materials.map((material, index) => (
              <option key={index} value={material}>{material}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" placeholder="Enter quantity" />
        </Form.Group>
        <Button variant="primary" type="submit">
          ADD
        </Button>
      </Form>
    </div>
  );
};

export default MaterialsManagement;
