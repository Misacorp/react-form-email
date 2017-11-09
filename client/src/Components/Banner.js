import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Banner extends Component {
  render() {
    return(
      <div className="banner">
        <Image src='assets/img/cameraventures-logo-small.png' alt='Cameraventures logo' className="center" responsive />
      </div>
    )
  }
}

export default Banner;