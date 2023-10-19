const imageUrl =
  'https://atlas.microsoft.com/map/static/png?api-version=1.0&height=1080&width=1920&subscription-key=mux10AN6bzmQl7fdHvmdQX3k040xNfA-iQ2BUE6D9oA&center=108.149981%2C16.073434&pins=default%7CcoFF0000%7C%7C108.149981%2016.073434&zoom=15&view=auto&fbclid=IwAR24prYOahir8naHClPkJW9i6wiQpMOxI-p5bCLqL9fkgFfiJj397hz-DVI';
const LocationOnMap = () => {
  return (
    <div className='py-4'>
      <h2>Nơi bạn sẽ đến</h2>
      <img src={imageUrl} alt='location' />
    </div>
  );
};

export default LocationOnMap;
