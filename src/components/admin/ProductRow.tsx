"use client";

import ProductRow from "./ProductRow";

export default function ProductTable({
  products,
  refresh,
}: {
  products: any[];
  refresh: () => void;
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              refresh={refresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
