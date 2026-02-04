"use client";

import FilterSection from "./FilterSection";

export default function DesktopFilters({
  availability,
  setAvailability,
  material,
  setMaterial,
  sort,
  setSort,
  isMobile = false, // Prop to handle styling differences
}: any) {
  
  const materials = ["Teak Wood", "Brass", "Ceramic", "Stone", "Cotton"];
  
  const toggleMaterial = (value: string) => {
    setMaterial((prev: string[]) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  return (
    <div className={`${!isMobile ? "sticky top-24 w-72 bg-white rounded-2xl border shadow-sm p-6" : "w-full"}`}>
      {!isMobile && <h2 className="text-lg font-semibold mb-6">Filters</h2>}

      {/* AVAILABILITY */}
      <FilterSection title="Availability">
        {[
          { label: "Ready to Ship", value: "in-stock" },
          { label: "Made to Order", value: "custom" },
        ].map((item) => (
          <label key={item.value} className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 hover:text-black">
            <input
              type="radio"
              name="availability"
              checked={availability === item.value}
              onChange={() => setAvailability(item.value)}
              className="accent-black w-4 h-4"
            />
            {item.label}
          </label>
        ))}
      </FilterSection>

    {/* MATERIALS */}
<FilterSection title="Material">
  <div className="grid grid-cols-1 gap-2">
    {materials.map((item) => (
      <label key={item} className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 hover:text-black">
        <input
          type="checkbox"
          // Safety: Check if material exists before calling .includes
          checked={Array.isArray(material) && material.includes(item)}
          onChange={() => toggleMaterial(item)}
          className="accent-black w-4 h-4 rounded"
        />
        {item}
      </label>
    ))}
  </div>
</FilterSection>

      {/* SORT */}
      <FilterSection title="Sort By">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm bg-gray-50 focus:bg-white transition-all outline-none"
        >
          <option value="latest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </FilterSection>

      {/* CLEAR BUTTON */}
      <button
        onClick={() => {
          setAvailability("");
          setMaterial([]);
          setSort("latest");
        }}
        className="w-full h-11 mt-4 rounded-xl bg-gray-900 text-white hover:bg-black transition text-sm font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
}