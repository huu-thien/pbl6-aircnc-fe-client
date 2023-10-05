import CityCategory from "./FilterCategory/CityCategory"
import MenuQuantityCustomer from "./FilterCategory/MenuQuantityCustomer"
import PropertyType from "./FilterCategory/PropertyType"
import PriceRange from "./FilterCategory/PriceRange"
import TimeTravel from "./FilterCategory/TimeTravel"


const FilterRoom = () => {
  return (
    <div className="grid justify-between grid-cols-3 md:flex md:items-center flex-wrap m-0 pb-6">
      <PropertyType />
      <CityCategory />
      <TimeTravel />
      <MenuQuantityCustomer />
      <PriceRange /> 
    </div>
  )
}

export default FilterRoom
