import React from 'react';
import Span from './dependency_workarounds/react-html-email/lib/components/Span';
import Email from './dependency_workarounds/react-html-email/lib/components/Email';
import Item from './dependency_workarounds/react-html-email/lib/components/Item';
import Box from './dependency_workarounds/react-html-email/lib/components/Box';
import { renderEmail } from './dependency_workarounds/react-html-email/lib';
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

    // Build email HTML
    const html = renderEmail(
      <Email title="Hello World!" cellSpacing={5}>
        <Item>
          <Span fontSize={30} fontWeight={'bold'}>New Offer</Span>
        </Item>

        <Item>
          <Span>Language: {state.translations.language}</Span>
        </Item>

        { state.products.map(function(product, index) {
          return ( 
            <Item key={index}>
              <Box cellPadding={5} width="100%" style={{ border: '1px solid #AAA', marginTop: '5px' }}>
                <Item>
                  <Span style={styles.property}>Brand:</Span> { product.brand }
                </Item>
                <Item>
                  <Span style={styles.property}>Model:</Span> { product.model }
                </Item>

                { product.files.map(function(file, fileIndex) {
                  return (
                    <Item width="100%" key={fileIndex}>
                      <img width="100%" src={"cid:" + index + "_" + fileIndex} alt={product.brand + " " + product.model + " (" + (fileIndex + 1) + " of " + product.files.length + ")"} />
                    </Item>
                  )
                })}
              </Box>
            </Item>
          )
        })}
      </Email>
    );

    // Attach file identifiers to attachments. This allows us to display them inline
    let attachments = [];
    // Loop through products
    for(let i = 0; i < state.products.length; i++) {
      let product = state.products[i];
      // Loop through each product's files
      for(let j = 0; j < product.files.length; j++) {
        let file = product.files[j];
        file['cid'] = i + '_' + j;      // Format is '{product_index}_{file_index}' eg. '0_2' for the first product's 3rd file
        attachments.push(file);
      }
    }

    return { html, attachments };
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