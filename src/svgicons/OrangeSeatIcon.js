import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OrangeSeatIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 6a6 6 0 016-6h19a6 6 0 016 6v21.813a1 1 0 01-.725.962l-12.3 3.517a9.001 9.001 0 01-4.95 0l-12.3-3.518a1 1 0 01-.725-.96V6z"
        fill="#FF8000"
      />
      <Path
        d="M1 13v18.5L18.5 36 36 31.5V13"
        stroke="#FF8000"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default OrangeSeatIcon
