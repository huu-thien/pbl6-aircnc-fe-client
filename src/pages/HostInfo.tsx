import CustomerReview from "@/components/HostInfo/CustomerReview"
import IntroduceOfHost from "@/components/HostInfo/IntroduceOfHost"
import ListOfRoomsForRent from "@/components/HostInfo/ListRoomsForRent"
import ProfileHost from "@/components/HostInfo/ProfileHost"
import { Divider } from "@mui/material"

const HostInfo = () => {
  
  return (
    <div className="ml-10 mr-10 flex justify-between gap-32">
      <ProfileHost/>
      <div className="grid ">
        <IntroduceOfHost/>
        <Divider/>
        <CustomerReview/>
        <Divider/>
        <ListOfRoomsForRent/>
      </div>
    </div>
  )
}

export default HostInfo
