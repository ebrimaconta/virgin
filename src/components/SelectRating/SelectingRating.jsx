import { Header } from '../Display/Display';
import styled from 'styled-components';

const SelectRating = styled.select``;

function SelectRatingFn({ setData, inputPrice, selectHotelFacilities, dataFromApi, selectRating, setSelectRating }) {
  return (
    <>
      <Header>Star Rating</Header>
      <SelectRating
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
            }
          });
        }}
      >
        <option value=''>Rating</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </SelectRating>
    </>
  );
}

export default SelectRatingFn;
