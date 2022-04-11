import { Header } from '../../Display/Display';
import styled from 'styled-components';

const SelectRating = styled.select`
  height: 39px;
  width: 70%;
  text-align: center;
  font-size: 16px;
`;

function SelectRatingFn({
  setData,
  getAllStarRating,
  inputPrice,
  selectHotelFacilities,
  dataFromApi,
  selectRating,
  setSelectRating,
}) {
  return (
    <>
      <Header>Star Rating</Header>
      <SelectRating
        id='select'
        value={selectRating}
        onChange={(event) => {
          setSelectRating(event.target.value);
          setData((prevState) => {
            if (event.target.value) {
              if (inputPrice || selectHotelFacilities?.length) {
                return prevState.filter((arr) => arr.hotel.content.starRating === event.target.value);
              } else {
                return dataFromApi.filter((arr) => arr.hotel.content.starRating === event.target.value);
              }
            } else {
              return dataFromApi;
            }
          });
        }}
      >
        <option value=''>Rating</option>
        {getAllStarRating.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </SelectRating>
    </>
  );
}

export default SelectRatingFn;
