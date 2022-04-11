import styled from 'styled-components';
import { Header } from '../../Display/Display';

const InputPrice = styled.input`
  height: 34px;
  border-radius: 5px;
  padding: 0px 7px;
  font-size: 16px;
  width: 42%;
`;

function InputPricingFn({ setData, inputPricing, setInputPricing, dataFromApi }) {
  return (
    <>
      <Header>Price per person</Header>
      <InputPrice
        type='number'
        defaultValue={inputPricing}
        min={0}
        onKeyDown={(event) => {
          if (event.keyCode === 8 || event.keyCode === 46) {
            setData(() => {
              const filterArr = dataFromApi.filter((arr) => event.target.value <= arr.pricePerPerson);
              return filterArr;
            });
          }
        }}
        onChange={(event) => {
          setData((prevState) => {
            if (event.target.value) {
              const filterArr = prevState.filter((arr) => event.target.value <= arr.pricePerPerson);
              return filterArr;
            }
            return dataFromApi;
          });
          setInputPricing(event.target.value);
        }}
        placeholder='Type...'
      />
    </>
  );
}

export default InputPricingFn;
