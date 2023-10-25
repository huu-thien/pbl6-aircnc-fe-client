import { iconMappings } from '@/helpers/FormatUtility/mappingUtilityIcon';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { formatPropertyName } from '@/helpers/FormatUtility/formatUtility';

interface PropsType {
  utility: string;
}

const IconComponent = ({ utility }: PropsType) => {
  console.log(utility);
  const iconComponent = iconMappings[utility] || <ArrowCircleLeftIcon />;
  return iconComponent;
};

const UtilityItem = ({ utility }: PropsType) => {
  return (
    <div className='flex items-center p-3 bg-blue-50 my-2 rounded-md'>
      <IconComponent utility={utility} />
      <span className='pl-3 text-cyan-800'>{formatPropertyName(utility)}</span>
    </div>
  );
};

export default UtilityItem;
