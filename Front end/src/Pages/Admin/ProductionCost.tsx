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
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl flex">
        <div className="w-1/4 mr-8">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Cake"
              value={cake}
              onChange={(e) => setCake(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Cost of raw material"
              value={rawMaterialCost}
              onChange={(e) => setRawMaterialCost(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Electricity costs"
              value={electricityCost}
              onChange={(e) => setElectricityCost(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Water costs"
              value={waterCost}
              onChange={(e) => setWaterCost(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-full"
          >
            ADD
          </button>
        </div>
        <div className="w-3/4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Cake</th>
                <th className="border border-gray-300 p-2">Cost of raw material</th>
                <th className="border border-gray-300 p-2">Electricity costs</th>
                <th className="border border-gray-300 p-2">Water costs</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((cost, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{cost.cake}</td>
                  <td className="border border-gray-300 p-2">{cost.rawMaterialCost}</td>
                  <td className="border border-gray-300 p-2">{cost.electricityCost}</td>
                  <td className="border border-gray-300 p-2">{cost.waterCost}</td>
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
