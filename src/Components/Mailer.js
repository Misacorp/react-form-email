import React from 'react';
import { Span, Email, Box, Item, renderEmail } from 'react-html-email'
import FetchError from 'fetch-error';

class Mailer {

  // Rewrite this
  buildEmail(state) {

    const styles = {
      property: {
        color: '#777',
        fontWeight: 'bold',
      }
    }

    const emailHTML = renderEmail(
      <Email title="Hello World!" cellSpacing={5}>
        <Item>
          <Span fontSize={30} fontWeight={'bold'}>New Offer</Span>
        </Item>

        <Item>
          <Span>Language: {state.translations.language}</Span>
        </Item>

        { state.products.map((product, index) => 
          <Item key={index}>
            <Box cellPadding={5} width="100%" style={{ border: '1px solid #AAA', marginTop: '5px' }}>
              <Item>
                <Span style={styles.property}>Brand:</Span> { product.brand }
              </Item>
              <Item>
                <Span style={styles.property}>Model:</Span> { product.model }
              </Item>
            </Box>
          </Item>
        )}
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