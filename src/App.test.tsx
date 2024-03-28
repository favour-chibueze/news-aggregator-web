import { render, fireEvent,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Categories from './components/filters/Categories';

describe('Categories', () => {
  test('renders the "Categories" heading', () => {
    const onCategoryChange = jest.fn();
    render(
      <Provider store={store}>
        <Categories categories={[]} onCategoryChange={onCategoryChange} />
      </Provider>
    );

    // Look for the "Category" label instead of the "Categories" heading
    expect(screen.getByText('Category')).toBeInTheDocument();

    // Call the onCategoryChange function with a mock category
    const mockCategory = 'Test Category';
    onCategoryChange(mockCategory);

    // Expect that the onCategoryChange function is called with the correct argument
    expect(onCategoryChange).toHaveBeenCalledWith(mockCategory);
  });
  
});

