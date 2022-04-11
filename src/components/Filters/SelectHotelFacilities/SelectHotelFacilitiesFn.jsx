import { Header } from '../../Display/Display';
import ReactSelect from 'react-select';

function SelectHotelFacilitiesFn({
  setData,
  inputPrice,
  selectRating,
  setSelectHotelFacilities,
  selectHotelFacilities,
  dataFromApi,
}) {
  const options = [
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Free Parking', label: 'Free Parking' },
    { value: 'Safety Deposit Box', label: 'Safety Deposit Box' },
    { value: 'Fitness Centre/Gym', label: 'Fitness Centre/Gym' },
    { value: 'Laundry Service', label: 'Laundry Service' },
  ];

  return (
    <>
      <Header>Hotel facilities</Header>
      <ReactSelect
        options={options}
        onChange={(event) => {
          setData((prevState) => {
            const mapArr = event.map((item) => item.value);
            if (inputPrice || selectRating?.length) {
              return prevState.filter((arr) => arr.hotel.content.hotelFacilities.some((item) => mapArr.includes(item)));
            } else if (mapArr.length) {
              return dataFromApi.filter((arr) =>
                arr.hotel.content.hotelFacilities.some((item) => mapArr.includes(item))
              );
            }

            return dataFromApi;
          });
        }}
        isMulti
      />
    </>
  );
}

export default SelectHotelFacilitiesFn;
