import React from 'react';
import { Email, Box, Item, renderEmail } from 'react-html-email'
import FetchError from 'fetch-error';

class Mailer {

  // Rewrite this
  buildEmail() {
    const emailHTML = renderEmail(
      <Email title="Hello World!">
        <Box>
          <Item>Language: {this.props.translations.language}</Item>
          <Item>Brand: {this.props.productData.brand}</Item>
          <Item>Model: {this.props.productData.model}</Item>
        </Box>
      </Email>
    );

    return emailHTML;
  }


  // Send form data to back end form handler.
  sendMail(data) {
    // Send email to backend
    fetch('/mail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(this.errorify)
    .then((response) => {
      if(response) {
        response.json();
      }
      else {
        return {
          status: "error"
        }
      }
    })
    .then((j) => {
      console.log(j);
    });
  }



  errorify(res) {
    if (res.status >= 400 && res.status < 600)
      throw new FetchError(res.status, res.statusText, {response: res})
    else
      return res
  }
}

export default Mailer