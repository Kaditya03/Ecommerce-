"use client";

import FilterSection from "./FilterSection";

export default function DesktopFilters({
  activeCollection,
  selectedSubItems,
  setSelectedSubItems,
  availability,
  setAvailability,
  sort,
  setSort,
  isMobile = false,
}: any) {
  
  const filterOptions = activeCollection?.subItems 
    ? activeCollection.subItems.map((s: any) => s.name) 
    : activeCollection?.items || [];

  const toggleSubItem = (value: string) => {
    setSelectedSubItems((prev: string[]) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  return (
    <div className={`${!isMobile ? "w-full" : "w-full"}`}>
      <FilterSection title="Type">
        <div className="grid grid-cols-1 gap-3">
          {filterOptions.map((item: string) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer text-sm text-stone-600 hover:text-black group">
              <input
                type="checkbox"
                checked={selectedSubItems.includes(item)}
                onChange={() => toggleSubItem(item)}
                className="accent-black w-4 h-4 rounded border-stone-300"
              />
              <span className="group-hover:translate-x-1 transition-transform">{item}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-3">
          {["in-stock", "custom"].map((val) => (
            <label key={val} className="flex items-center gap-3 cursor-pointer text-sm text-stone-600 capitalize">
              <input
                type="radio"
                name="avail"
                checked={availability === val}
                onChange={() => setAvailability(val)}
                className="accent-black w-4 h-4"
              />
              {val.replace("-", " ")}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Sort">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full h-10 bg-transparent border-b border-stone-200 text-sm outline-none"
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </FilterSection>

      <button
        onClick={() => {
          setAvailability("");
          setSelectedSubItems([]);
          setSort("latest");
        }}
        className="w-full py-3 mt-4 text-[10px] uppercase tracking-widest border border-stone-200 hover:bg-black hover:text-white transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}