import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PollCard from '../index';

afterEach(() => {
  cleanup();
});

test('should render PollCard component', () => {
  render(<PollCard />);
  const pollCardElement = screen.getByTestId('pollCard');
  expect(pollCardElement).toBeInTheDocument();
  expect(pollCardElement).toHaveTextContent("Ranking");
  expect(pollCardElement).toHaveTextContent("Total Score:");
});

test('matches snapshot', () => {
  const tree = renderer.create(<PollCard />).toJSON();
  expect(tree).toMatchSnapshot();
});