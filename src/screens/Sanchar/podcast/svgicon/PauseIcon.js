import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PauseIcon(props) {
  return (
    <Svg
      width={81}
      height={80}
      viewBox="0 0 81 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.103 40.02c0-18.4 14.961-33.353 33.333-33.353S73.77 21.62 73.77 40.019c0 18.36-14.96 33.314-33.333 33.314-18.372 0-33.333-14.954-33.333-33.314zm45.56 3.373c.353-.354.804-.9.9-1.03a3.873 3.873 0 00.773-2.344c0-.936-.29-1.804-.837-2.511-.045-.045-.133-.14-.247-.265-.214-.233-.52-.568-.815-.86-2.638-2.83-9.524-7.462-13.127-8.877-.547-.222-1.93-.707-2.67-.74-.709 0-1.384.161-2.028.483a4.172 4.172 0 00-1.801 1.994c-.226.579-.58 2.315-.58 2.347-.354 1.898-.547 4.985-.547 8.394 0 3.251.194 6.207.483 8.136.008.008.036.146.079.36.13.652.403 2.01.693 2.567.708 1.35 2.092 2.187 3.572 2.187h.128c.966-.033 2.993-.869 2.993-.9 3.41-1.416 10.135-5.822 12.837-8.748l.194-.193z"
        fill="#E56902"
      />
    </Svg>
  )
}

export default PauseIcon
