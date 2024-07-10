import Spinner from "@/components/Spinner/Spinner.tsx";
import { render } from "@testing-library/react";

describe('Spinner Component test', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Spinner/>);

    const spinner = getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { getByTestId } = render(<Spinner className="test"/>);

    const spinner = getByTestId('spinner');

    expect(spinner).toHaveClass('test');
  })
})