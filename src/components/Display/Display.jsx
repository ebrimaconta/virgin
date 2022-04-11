import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import DisplayHoliday from './DisplayHoliday/DisplayHoliday';
import FadeLoader from 'react-spinners/FadeLoader';
import { SelectRatingFn, InputPricingFn, SelectHotelFacilitiesFn } from '../Filters/';

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
  &:nth-of-type(3) {
    width: 20%;
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
  const [inputPricing, setInputPricing] = useState(0);
  const [selectHotelFacilities] = useState();
  const [getAllStarRating, setAllStarRating] = useState();

  const fetchData = async () => {
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

      const mapGetStarRating = responseData.holidays.map((arr) => arr.hotel.content.starRating);
      const uniqueStarRating = [...new Set(mapGetStarRating.filter((item) => item))];
      const sortStarRating = uniqueStarRating.sort((a, b) => a - b);

      setAllStarRating(sortStarRating);
      setDataFromApi(responseData.holidays);
      setData(responseData.holidays);
      setLoading(false);

    } catch (e) {
      console.log('Error from fetch', e);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formRef = useRef();

  const propsRatingNHotel = {
    setData: setData,
    inputPrice: inputPricing,
    selectHotelFacilities: selectHotelFacilities,
    dataFromApi: dataFromApi,
    selectRating: selectRating,
    setSelectRating: setSelectRating,
    getAllStarRating: getAllStarRating,
    formRef: formRef,
  };
  const propsPricing = {
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
      <form ref={formRef}>
        <FilterContainter>
          <SubContainter>
            <SelectRatingFn {...propsRatingNHotel} />
          </SubContainter>{' '}
          <SubContainter>
            <InputPricingFn {...propsPricing} />
          </SubContainter>
          <SubContainter>
            <SelectHotelFacilitiesFn {...propsRatingNHotel} />
          </SubContainter>
        </FilterContainter>
      </form>
      <DisplayHoliday holidays={data} />
    </>
  );
}

export default Display;
