# paypal-nvp-api
Node.js wrapper for the Paypal Name-Value Pair — NVP


# Usage

```
import Paypal = from 'paypal-nvp-api';

let config = {
  mode: 'sandbox', // or 'live'
  track: 'https://www.sandbox.paypal.com', // or 'https://www.paypal.com' if live
  username: 'someone.itravellocal.com',
  password: 'DYKNJZZE42ASN699',
  signature: 'A0aEilikhBmwfK.NlduDjCbsdgXdA8VDPMDksDhGsHmLQECu80Qtru09'
}

let paypal = Paypal(config);

let query = {
  'PAYMENTREQUEST_0_AMT': '$20.00',
  'PAYMENTREQUEST_0_CURRENCYCODE': 'USD',
  'PAYMENTREQUEST_0_PAYMENTACTION': 'Sale'
}

paypal.request('SetExpressCheckout', query).then((result) => {
  return resolve(result);
}).catch((err) => {
  return reject(err);
});
```

Replace SetExpressCheckout with any available API operations that Paypal supports.

For more info: https://developer.paypal.com/docs/classic/api/

# API reference

### request(String method, Object query)

In which:

- *method*: one of API operation Paypal NVP suppors, such as SetExpressCheckout, DoCapture, SetCustomerBillingAgreement, etc.

- *query*: a set of parameters you want to send to Paypal API endpoint, rely on which *method* is being used.

### formatCurrency(Number amount)

Because Paypal API requires its standard format for currency, you can use this util to quickly convert any number to Paypal convention.

```
paypal.formatCurrency(12); // = '$12.00'
paypal.formatCurrency(12.5); // = '$12.50'
// note that only Number is accepted, so
paypal.formatCurrency('$12.00'); // = '$0.00'
```

Currently, this method just supports USD. 


# Test

Module has not been fully tested yet.

