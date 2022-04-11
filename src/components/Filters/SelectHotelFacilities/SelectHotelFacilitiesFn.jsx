import { Header } from '../../Display/Display';
import React, { useState } from 'react';
import ReactSelect, { components } from 'react-select';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;
const ResetButton = styled.button`
  height: 40px;
  width: 74px;
  font-size: 16px;
  margin-left: 20px;
`;
const SelectField = styled(ReactSelect)`
  width: 70%;
`;

function SelectHotelFacilitiesFn({ setData, inputPrice, selectRating, dataFromApi, formRef }) {
  const [valueHotelFacilities, setValueHotelFacilities] = useState();
  const options = [
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Free Parking', label: 'Free Parking' },
    { value: 'Safety Deposit Box', label: 'Safety Deposit Box' },
    { value: 'Fitness Centre/Gym', label: 'Fitness Centre/Gym' },
    { value: 'Laundry Service', label: 'Laundry Service' },
  ];
  const MultiValueRemove = (props) => {
    return (
      <components.MultiValueRemove {...props}>
        <div> </div>
      </components.MultiValueRemove>
    );
  };
  const ClearIndicator = () => null;

  return (
    <>
      <Header>Hotel facilities</Header>
      <Container>
        <SelectField
          value={valueHotelFacilities}
          options={options}
          onChange={(event) => {
            setValueHotelFacilities(event);
            setData((prevState) => {
              const mapArr = event.map((item) => item.value);
              if (inputPrice || selectRating?.length) {
                return prevState.filter((arr) =>
                  arr.hotel.content.hotelFacilities.some((item) => mapArr.includes(item))
                );
              } else if (mapArr.length) {
                return dataFromApi.filter((arr) =>
                  arr.hotel.content.hotelFacilities.some((item) => mapArr.includes(item))
                );
              } else {
                return dataFromApi;
              }
            });
          }}
          components={{
            ClearIndicator,
            MultiValueRemove,
          }}
          isMulti
        />
        <ResetButton
          onClick={(e) => {
            e.preventDefault();
            setValueHotelFacilities([]);
            setData(dataFromApi);
            document.getElementById('select').getElementsByTagName('option')[0].selected = 'selected';
            formRef.current.reset();
          }}
        >
          Reset
        </ResetButton>
      </Container>
    </>
  );
}

export default SelectHotelFacilitiesFn;
