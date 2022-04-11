import styled from 'styled-components';

const Display = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
  padding: 10px 20px;
`;
const TwoColumns = styled.div`
  display: flex;
`;
const HolidayDescription = styled.div`
  margin: 0px 30px;
`;
function DisplayHoliday({ holidays }) {
  return (
    <>
      {holidays.length >= 1 ? (
        holidays.map((holiday, index) => {
          return (
            <Display key={index}>
              <TwoColumns>
                <img src={holiday.hotel.content.images[0].RESULTS_CAROUSEL.url} alt='' />{' '}
                <HolidayDescription>
                  <div className=''>{holiday.hotel.content.name}</div>
                  <div className=''>{holiday.hotel.content.hotelDescription}</div>
                  <div className=''>{holiday.hotel.content.parentLocation}</div>
                  <div className=''>Total Price: £{holiday.totalPrice}</div>
                  <div className=''>Price Per Person: £{holiday.pricePerPerson}</div>
                  <div className=''>
                    {holiday.hotel.content.starRating && <>RatingStar Rating: {holiday.hotel.content.starRating}</>}
                  </div>
                  <div className=''>
                    <div className=''>Hotel Facilities</div>
                    <ul>
                      {holiday.hotel.content.hotelFacilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </HolidayDescription>
              </TwoColumns>
            </Display>
          );
        })
      ) : (
        <Display>
          <div>No results found</div>
        </Display>
      )}
    </>
  );
}

export default DisplayHoliday;
