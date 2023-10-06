import BookingRoom from "@/components/DetailRoom/BookingRoom";
import Evaluate from "@/components/DetailRoom/Evaluate";
import ImageList from "@/components/DetailRoom/ImageList";
import IntroduceHost from "@/components/DetailRoom/IntroduceHost";
import IntroduceRoom from "@/components/DetailRoom/IntroduceRoom";
import LocationOnMap from "@/components/DetailRoom/LocationOnMap";
import TitleRoom from "@/components/DetailRoom/TitleRoom";
import { Divider } from "@mui/material";


const DetailRoom = () => {
  return (
    <div className="max-w-7xl mx-auto w-full py-8">
        <TitleRoom />
        <ImageList /> 
        <div className="flex items-start justify-between mb-5">
          <div className="grid gap-28 mr-60">
            <IntroduceHost />
            <Divider/>
            <IntroduceRoom />
          </div>
          <BookingRoom />
        </div>
        <Divider/>
        <LocationOnMap />
        <Divider/>
        <Evaluate />
    </div>
  );
};

export default DetailRoom;
