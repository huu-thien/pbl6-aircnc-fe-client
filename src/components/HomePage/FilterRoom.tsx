import CityCategory from "./FilterCategory/CityCategory"
import MenuQuantityCustomer from "./FilterCategory/MenuQuantityCustomer"
import PropertyType from "./FilterCategory/PropertyType"
import TimeStartEnd from "./FilterCategory/TimeStartEnd"
import PriceRange from "./FilterCategory/PriceRange"
import Button  from "@mui/material/Button"
const FilterRoom = () => {
  return (
    <div className="flex justify-center m-0">
      <PropertyType />
      <CityCategory />
      <TimeStartEnd />
      <MenuQuantityCustomer />
      <PriceRange />
      <Button variant="contained" className=" w-24 min-w-24 h-14 min-h-14 p-1 m-1">Search</Button> 
    </div>
  )
}

export default FilterRoom
