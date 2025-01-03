import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationIcon(props) {
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
        d="M8.597 11.96A7.448 7.448 0 0116 5.332v0a7.448 7.448 0 017.403 6.626l.336 3.022.008.077c.172 1.498.66 2.943 1.431 4.239l.04.066.77 1.285c.7 1.165 1.05 1.748.974 2.227-.05.318-.214.607-.461.814-.372.311-1.051.311-2.41.311H7.91c-1.36 0-2.04 0-2.41-.31a1.333 1.333 0 01-.462-.815c-.076-.479.274-1.062.973-2.227l.771-1.285.04-.066a10.666 10.666 0 001.43-4.24l.01-.076.335-3.022z"
        stroke="#fff"
        strokeWidth={1.33333}
      />
      <Path
        d="M12.136 24.541c.228.992.73 1.87 1.429 2.495.699.625 1.555.964 2.435.964.88 0 1.736-.339 2.435-.964.699-.626 1.2-1.503 1.429-2.495"
        stroke="#fff"
        strokeWidth={1.33333}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default NotificationIcon
