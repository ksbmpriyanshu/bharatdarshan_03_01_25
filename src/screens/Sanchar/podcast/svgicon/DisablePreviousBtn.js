import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function DisablePreviousBtn(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.2} fill="#060047">
        <Path d="M20.238 7.22v9.57c0 1.96-2.13 3.19-3.83 2.21l-4.15-2.39-4.15-2.4c-1.7-.98-1.7-3.43 0-4.41l4.15-2.4 4.15-2.39c1.7-.98 3.83.24 3.83 2.21zM3.762 18.93c.41 0 .75-.34.75-.75V5.82c0-.41-.34-.75-.75-.75s-.75.34-.75.75v12.36c0 .41.33.75.75.75z" />
      </G>
    </Svg>
  )
}

export default DisablePreviousBtn
