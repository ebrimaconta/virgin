import styled from 'styled-components';
import { Header } from '../Display/Display';

const InputPrice = styled.input`
  height: 34px;
  border-radius: 5px;
  padding: 0px 7px;
`;

function InputPricingFn({ setData, inputPricing, setInputPricing, dataFromApi }) {
  return (
    <>
      <Header>Price per person</Header>
      <InputPrice
        type='number'
        className=''
        value={inputPricing}
        min={0}
        onChange={(event) => {
          setInputPricing(event.target.value);
          setData((prevState) => {
            if (event.target.value) {
              const filterArr = prevState.filter((arr) => event.target.value <= arr.pricePerPerson);
              return filterArr;
            }
            return dataFromApi;
          });
        }}
        placeholder='Price Per Person'
      />
    </>
  );
}

export default InputPricingFn;
