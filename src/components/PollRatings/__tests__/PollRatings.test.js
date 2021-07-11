import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PollRatings from '../index';

afterEach(() => {
  cleanup();
});

test('should render PollRatings component', () => {
  render(<PollRatings />);
  const pollRatingsElement = screen.getByTestId('pollRatings');
  expect(pollRatingsElement).toBeInTheDocument();
});

test('matches snapshot', () => {
  const tree = renderer.create(<PollRatings />).toJSON();
  expect(tree).toMatchSnapshot();
});