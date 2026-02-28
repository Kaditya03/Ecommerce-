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
    <div className="w-full space-y-2">
      {/* TYPE SECTION */}
      {filterOptions.length > 0 && (
        <FilterSection title="Artisan Type">
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
      )}

      {/* AVAILABILITY SECTION */}
      <FilterSection title="Availability">
        <div className="space-y-3">
          {["in-stock", "custom"].map((val) => (
            <label key={val} className="flex items-center gap-3 cursor-pointer text-sm text-stone-600 capitalize">
              <input
                type="radio"
                name="availability"
                checked={availability === val}
                onChange={() => setAvailability(val)}
                className="accent-black w-4 h-4"
              />
              {val === "custom" ? "Made to Order" : "Ready to Ship"}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* SORT SECTION */}
      <FilterSection title="Sort By">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none cursor-pointer"
        >
          <option value="latest">Latest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </FilterSection>

      {/* RESET BUTTON */}
      {(selectedSubItems.length > 0 || availability || sort !== "latest") && (
        <button
          onClick={() => {
            setSelectedSubItems([]);
            setAvailability("");
            setSort("latest");
          }}
          className="w-full py-3 mt-6 text-[10px] uppercase font-bold tracking-widest border border-stone-200 hover:bg-black hover:text-white transition-all rounded-xl"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}