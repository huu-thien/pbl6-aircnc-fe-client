import FilterRoom from "@/components/HomePage/FilterRoom"
import RoomList from "@/components/HomePage/RoomList"


const Home = () => {
  return (
    <div className="py-10">
      <FilterRoom />
      <RoomList />
    </div>
  )
}

export default Home
