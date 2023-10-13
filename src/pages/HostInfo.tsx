import CustomerReview from "@/components/HostInfo/CustomerReview"
import IntroduceOfHost from "@/components/HostInfo/IntroduceOfHost"
import ListOfRoomsForRent from "@/components/HostInfo/ListRoomsForRent"
import ProfileHost from "@/components/HostInfo/ProfileHost"
import { Divider } from "@mui/material"

const HostInfo = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 flex gap-12">
      <ProfileHost/>
      <div className="grid">
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
