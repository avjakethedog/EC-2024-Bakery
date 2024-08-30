import React, { useState } from 'react';

interface Cost {
  cake: string;
  rawMaterialCost: string;
  electricityCost: string;
  waterCost: string;
}

const ProductionCost: React.FC = () => {
  const [cake, setCake] = useState('');
  const [rawMaterialCost, setRawMaterialCost] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [waterCost, setWaterCost] = useState('');
  const [costs, setCosts] = useState<Cost[]>([
    { cake: 'Chocolate Cake', rawMaterialCost: '15', electricityCost: '5', waterCost: '2' },
    { cake: 'Vanilla Cake', rawMaterialCost: '12', electricityCost: '4', waterCost: '1.5' },
    { cake: 'Red Velvet Cake', rawMaterialCost: '18', electricityCost: '6', waterCost: '2.5' },
  ]);

  const handleAdd = () => {
    setCosts([...costs, { cake, rawMaterialCost, electricityCost, waterCost }]);
    setCake('');
    setRawMaterialCost('');
    setElectricityCost('');
    setWaterCost('');
  };

  return (
    <div className="min-vh-100 d-flex align-items-start justify-content-center p-4 bg-light">
      <div className="bg-white p-4 rounded shadow w-100 max-w-6xl d-flex">
        <div className="w-25 me-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cake"
              value={cake}
              onChange={(e) => setCake(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Cost of raw material"
              value={rawMaterialCost}
              onChange={(e) => setRawMaterialCost(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Electricity costs"
              value={electricityCost}
              onChange={(e) => setElectricityCost(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Water costs"
              value={waterCost}
              onChange={(e) => setWaterCost(e.target.value)}
              className="form-control mb-3"
            />
          </div>
          <button
            onClick={handleAdd}
            className="btn btn-success w-100"
          >
            ADD
          </button>
        </div>
        <div className="w-75">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Cake</th>
                <th>Cost of raw material</th>
                <th>Electricity costs</th>
                <th>Water costs</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((cost, index) => (
                <tr key={index}>
                  <td>{cost.cake}</td>
                  <td>{cost.rawMaterialCost}</td>
                  <td>{cost.electricityCost}</td>
                  <td>{cost.waterCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionCost;
