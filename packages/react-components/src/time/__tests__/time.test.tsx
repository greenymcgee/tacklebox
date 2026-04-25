import { render, screen } from '@testing-library/react'
import { format as formatMethod } from 'date-fns'

import { Time } from '../time'
import { toCurrentTimezone } from '../utils'

describe('<Time />', () => {
  it('should not render if the date is undefined', () => {
    const { container } = render(
      <Time date={undefined} format="MMMM do, yyyy" />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('should not render if the date is null', () => {
    const { container } = render(<Time date={null} format="MMMM do, yyyy" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should not render if the date is an empty string', () => {
    const { container } = render(<Time date="" format="MMMM do, yyyy" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render a converted date when convertedToLocalTimezone is true', () => {
    const date = '1999-11-18T00:00:00.000Z'
    const format = 'MMMM do, yyyy'
    render(<Time date={date} format={format} />)
    expect(
      screen.getByText(formatMethod(toCurrentTimezone(date), format)),
    ).toHaveAttribute(
      'dateTime',
      formatMethod(toCurrentTimezone(date), "yyyy-MM-dd'T'HH:mmXXX"),
    )
  })

  it('should render an unconverted date when convertedToLocalTimezone is false', () => {
    const date = '1999-11-18T00:00:00.000Z'
    const format = 'MMMM do, yyyy'
    render(
      <Time convertedToLocalTimezone={false} date={date} format={format} />,
    )
    expect(
      screen.getByText(formatMethod(new Date(date), format)),
    ).toHaveAttribute(
      'dateTime',
      formatMethod(new Date(date), "yyyy-MM-dd'T'HH:mmXXX"),
    )
  })
})
