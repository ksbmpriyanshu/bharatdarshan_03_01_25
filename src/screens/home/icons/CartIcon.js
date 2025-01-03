import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CartIcon(props) {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.333 1.333h5.334l3.573 17.854a2.667 2.667 0 002.667 2.146h12.96a2.667 2.667 0 002.666-2.146L30.667 8H8m5.333 20a1.333 1.333 0 11-2.666 0 1.333 1.333 0 012.666 0zM28 28a1.333 1.333 0 11-2.667 0A1.333 1.333 0 0128 28z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CartIcon
