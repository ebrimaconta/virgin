import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import DisplayHoliday from './DisplayHoliday/DisplayHoliday';
import FadeLoader from 'react-spinners/FadeLoader';
import ReactSelect from 'react-select';
import { SelectRatingFn, InputPricing, SelectHotelFacilitiesFn } from '../Filters/';

const ResetButton = styled.button`
  height: 40px;
  width: 74px;
  font-size: 16px;
  margin-top: 43px;
  margin-left: 20px;
`;

const FilterContainter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0px;
`;

export const Header = styled.h1`
  color: white;
  font-size: 18px;
`;
const SubContainter = styled.div`
  width: 17%;
  &:nth-of-type(1) {
    width: 10%;
    }
  }
`;

const Spinner = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0px;
`;
function Display() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [dataFromApi, setDataFromApi] = useState();
  const [selectRating, setSelectRating] = useState();
  const [inputPricing, setInputPricing] = useState();
  const [selectHotelFacilities, setSelectHotelFacilities] = useState();

  const options = [
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Free Parking', label: 'Free Parking' },
    { value: 'Safety Deposit Box', label: 'Safety Deposit Box' },
    { value: 'Fitness Centre/Gym', label: 'Fitness Centre/Gym' },
    { value: 'Laundry Service', label: 'Laundry Service' },
  ];

  const fetchData = useCallback(async () => {
    try {
      const data = {
        bookingType: 'hotel',
        location: 'orlando',
        departureDate: '24-05-2022',
        duration: '7',
        partyCompositions: [
          {
            adults: 2,
            childAges: [],
            infants: 0,
          },
        ],
      };
      const fetchDataFromApi = await fetch(`https://www.virginholidays.co.uk/cjs-search-api/search`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await fetchDataFromApi.json();
      setDataFromApi(responseData.holidays);
      setData(responseData.holidays);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  const propsRating = {
    setData: setData,
    inputPrice: inputPricing,
    selectHotelFacilities: selectHotelFacilities,
    dataFromApi: dataFromApi,
    selectRating: selectRating,
    setSelectRating: setSelectRating,
  };
  const propsPricing = {
    setData: setData,
    inputPrice: inputPricing,
    setInputPricing: setInputPricing,
    dataFromApi: dataFromApi,
  };
  const propsHotel = {
    setData: setData,
    inputPrice: inputPricing,
    setInputPricing: setInputPricing,
    dataFromApi: dataFromApi,
  };

  if (loading) {
    return (
      <Spinner>
        <FadeLoader loading={loading} size={150} />
      </Spinner>
    );
  }
  return (
    <>
      <FilterContainter>
        <SubContainter>
          <SelectRatingFn {...propsRating} />
        </SubContainter>{' '}
        <SubContainter>
          <InputPricing {...propsPricing} />
        </SubContainter>
        <SubContainter>
          <SelectHotelFacilitiesFn {...propsHotel} />
        </SubContainter>
        <SubContainter>
          <ResetButton
            onClick={() => {
              setSelectRating('');
              setInputPricing('');
              setSelectHotelFacilities([]);
            }}
          >
            Reset
          </ResetButton>
        </SubContainter>
      </FilterContainter>
      <DisplayHoliday holidays={data} />
    </>
  );
}

export default Display;
