import Display from './Display';
import { render } from '@testing-library/react';
import { holidays } from '../../mock/mockData';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(holidays),
  })
);
describe('<Display/>', () => {
  const renderComponent = () => {
    const utils = render(<Display />);

    return {
      ...utils,
    };
  };
  it('should render', () => {
    renderComponent();
  });
});
