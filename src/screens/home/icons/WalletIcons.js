import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WalletIcon(props) {
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
        d="M19.594 5.5h-6.188c-4.375 0-6.563 0-7.922 1.38-1.359 1.382-1.359 3.604-1.359 8.049v3.142c0 4.445 0 6.667 1.36 8.048C6.842 27.5 9.03 27.5 13.405 27.5h6.188c4.375 0 6.563 0 7.922-1.38 1.359-1.382 1.359-3.604 1.359-8.049V14.93c0-4.445 0-6.667-1.36-8.048C26.158 5.5 23.97 5.5 19.595 5.5z"
        stroke="#fff"
        strokeWidth={1.16667}
      />
      <Path
        d="M9.625 11h4.125"
        stroke="#fff"
        strokeWidth={1.16667}
        strokeLinecap="round"
      />
      <Path
        d="M20.625 19.667v-.834c0-1.1 0-1.65.342-1.991.341-.342.891-.342 1.991-.342h3.584c1.1 0 1.65 0 1.991.342.342.341.342.891.342 1.991v.834c0 1.1 0 1.65-.342 1.991-.341.342-.891.342-1.991.342h-3.584c-1.1 0-1.65 0-1.991-.342-.342-.341-.342-.891-.342-1.991z"
        stroke="#fff"
        strokeWidth={1.16667}
      />
    </Svg>
  )
}

export default WalletIcon
