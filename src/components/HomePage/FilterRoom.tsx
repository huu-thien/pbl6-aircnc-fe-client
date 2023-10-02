import CityCategory from "./FilterCategory/CityCategory"
import MenuQuantityCustomer from "./FilterCategory/MenuQuantityCustomer"
import PropertyType from "./FilterCategory/PropertyType"
import TimeStartEnd from "./FilterCategory/TimeStartEnd"
import PriceRange from "./FilterCategory/PriceRange"

const FilterRoom = () => {
  return (
    <div>
      <PropertyType />
      <CityCategory />
      <TimeStartEnd />
      <MenuQuantityCustomer />
      <PriceRange />
    </div>
  )
}

export default FilterRoom
