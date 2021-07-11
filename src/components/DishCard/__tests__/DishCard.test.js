import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import DishCard from '../index';

afterEach(() => {
  cleanup();
});

test('should render DishCard component', () => {
  render(<DishCard />);
  const dishCardElement = screen.getByTestId('dishCard-1');
  expect(dishCardElement).toBeInTheDocument();
  expect(dishCardElement).toHaveTextContent("Rank 1");
});

test('should render DishCard component', () => {
  render(<DishCard />);
  const dishCardElement = screen.getByTestId('dishCard-2');
  expect(dishCardElement).toBeInTheDocument();
  expect(dishCardElement).toHaveTextContent("Rank 2");
  expect(dishCardElement).toContainHTML('<figure>');
});

test('matches snapshot', () => {
  const tree = renderer.create(<DishCard />).toJSON();
  expect(tree).toMatchSnapshot();
});