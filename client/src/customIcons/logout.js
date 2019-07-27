import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
//found at https://gist.github.com/mxl/4281c3a188489d43a35704ed209b18e5#file-log_out-svg
const LogOut = (props) => {
  return (
    <SvgIcon {...props}>

      <path d="M19,3 C20.11,3 21,3.9 21,5 L21,8 L19,8 L19,5 L5,5 L5,19 L19,19 L19,16 L21,16 L21,19 C21,20.1 20.11,21 19,21 L5,21 C3.9,21 3,20.1 3,19 L3,5 C3,3.9 3.9,3 5,3 L19,3 Z M15.5,17 L20.5,12 L15.5,7 L14.09,8.41 L16.67,11 L7,11 L7,13 L16.67,13 L14.09,15.59 L15.5,17 Z" />

    </SvgIcon>
  )
}

export default LogOut;