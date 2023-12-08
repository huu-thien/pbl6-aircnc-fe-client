import { PropertyTypeStatsType, StatisticType } from '@/@types/statistic';
import { formatMoney } from '@/helpers/FormatMoney/formatMoney';
import { ResponsivePie } from '@nivo/pie';

interface PieDataType {
  id: 'Room' | 'Resort' | 'Villa' | 'HomeStay' | 'House' | 'Hotel' | 'Cabin' | 'Apartment';
  label: 'Room' | 'Resort' | 'Villa' | 'HomeStay' | 'House' | 'Hotel' | 'Cabin' | 'Apartment';
  value: number;
  valueFormat: string;
  color: string;
}
interface PropsType {
  dataStatictis: StatisticType | undefined;
  totalRenevue: number;
  totalProfit: number;
}

const PieChartTotalRenevue = ({ dataStatictis, totalRenevue, totalProfit }: PropsType) => {
  // console.log('getStatistics: ', dataStatictis);
  let mockPieData: PieDataType[] = [
    {
      id: 'Room',
      label: 'Room',
      value: 239,
      valueFormat: '1',
      color: 'hsl(104, 70%, 50%)',
    },
    {
      id: 'Resort',
      label: 'Resort',
      value: 170,
      valueFormat: '1',
      color: 'hsl(162, 70%, 50%)',
    },
    {
      id: 'House',
      label: 'House',
      value: 322,
      valueFormat: '1',

      color: 'hsl(291, 70%, 50%)',
    },
    {
      id: 'Apartment',
      label: 'Apartment',
      value: 503,
      valueFormat: '1',

      color: 'hsl(229, 70%, 50%)',
    },
    {
      id: 'Villa',
      label: 'Villa',
      value: 584,
      valueFormat: '1',

      color: 'hsl(344, 70%, 50%)',
    },
  ];
  if (dataStatictis) {
    mockPieData = dataStatictis.propertyTypeStats.map((typeRoome: PropertyTypeStatsType) => {
      return {
        id: typeRoome.type,
        label: typeRoome.type,
        value: typeRoome.totalRevenue,
        valueFormat: formatMoney(typeRoome.totalRevenue),
        color: `hsl(${Math.floor(Math.random() * 1000)}, 70%, 50%)`,
      };
    });
  }
  console.log('mockPieData', mockPieData);

  return (
    <>
      <div className='text-center'>
        <p className='text-sm text-gray-500'>
          Tổng doanh thu : <span className='text-[#352069] font-bold'>{formatMoney(totalRenevue)} đ</span>
        </p>
        <p className='text-sm text-gray-500'>
          Lợi nhuận : <span className='text-[#352069] font-bold'>{formatMoney(totalProfit)} đ</span>
        </p>
      </div>
      <ResponsivePie
        data={mockPieData}
        valueFormat=' >-r'
        colors={{ scheme: 'pastel1' }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: '#1d7490',
              },
            },
            legend: {
              text: {
                fill: '#1d7490',
              },
            },
            ticks: {
              line: {
                stroke: '#1d7490',
                strokeWidth: 1,
              },
            },
          },
          legends: {
            text: {
              fill: '#1d7490',
            },
          },
          tooltip: {
            container: {
              color: '#141b2d',
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-180}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={'#1d7490'}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 2,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'top-to-bottom',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default PieChartTotalRenevue;
