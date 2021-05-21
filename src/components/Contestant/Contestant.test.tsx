import { render } from '@testing-library/react';

import Contestant from './Contestant';

it('should have initial contestant name', () => {
  const { getByText } = render(
    <Contestant
      color="red"
      id={1}
      lastName="Błachowicz"
      rank="C"
    />,
  );

  expect(getByText('Błachowicz')).toBeInTheDocument();
});
