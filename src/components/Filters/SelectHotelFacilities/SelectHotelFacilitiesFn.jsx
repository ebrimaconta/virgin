import { Header } from '../../Display/Display';

import ReactSelect from 'react-select';

function SelectHotelFacilitiesFn({ setData, setSelectHotelFacilities, selectHotelFacilities, dataFromApi }) {
  const options = [
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Free Parking', label: 'Free Parking' },
    { value: 'Safety Deposit Box', label: 'Safety Deposit Box' },
    { value: 'Fitness Centre/Gym', label: 'Fitness Centre/Gym' },
    { value: 'Laundry Service', label: 'Laundry Service' },
  ];
  console.log('checking', selectHotelFacilities);
  return (
    <>
      <Header>Hotel facilities</Header>
      <ReactSelect
        value={selectHotelFacilities}
        options={options}
        onChange={(event) => {
          setSelectHotelFacilities(event);
          setData(() => {
            const filterArr = dataFromApi.filter((arr) => {
              const mapArr = event.map((item) => item.value);
              if (mapArr.length) {
                return arr.hotel.content.hotelFacilities.some((item) => mapArr.includes(item));
              }

              return dataFromApi;
            });
            return filterArr;
          });
        }}
        isMulti
      />
    </>
  );
}

export default SelectHotelFacilitiesFn;
