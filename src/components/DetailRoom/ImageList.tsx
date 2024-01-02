import { PropertyImage } from '@/@types/property';
import ImageListMUI from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface PropsType {
  propertyImages: PropertyImage[];
}

const ImageList = ({ propertyImages }: PropsType) => {
  const numberDevide4 = propertyImages.length - (propertyImages.length % 4);
  const listImageCustom = [];
  for (let i = 0; i < numberDevide4; i++) {
    listImageCustom.push(propertyImages[i]);
  }
  return (
    <div className='rounded-md pb-6'>
      <ImageListMUI sx={{ height: 500 }} variant='quilted' cols={4} rowHeight={300}>
        {listImageCustom.map((item, index) => (
          <ImageListItem key={`${item.url}_${index}`}>
            {/* {...srcset(item.url, 121)} */}
            <img src={item.url} alt={item.propertyId.toString()} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageListMUI>
    </div>
  );
};
export default ImageList;
