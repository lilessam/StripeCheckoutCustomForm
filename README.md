# StripeCheckoutCustomForm
Node Module to help you you creating custom Stripe CheckOut Form Without Writing Any JS Code.


### How to install
##### Using NPM
`npm install stripe-checkout-custom-form`

If you got any error using Laravel Mix delete `node_modules` folder and run `npm install` and everything should work just perfect.

##### using Yarn (Recommended)
`yarn add stripe-checkout-custom-form`

### How does  it work
Application JS File
```javascript
//The div id which the card element will be injected to
var cardElementID = 'card-element'
//The form id which will contain the stripe checkout form
var formElementID = 'payment-form'
//The name attribute of the card holder full name field
var fullNameInputName = 'card_holder_name'
//Your stripe public key
var stripeKey = 'pk_test_...'

require('stripe-checkout-custom-form')(cardElementID, formElementID, fullNameInputName, stripeKey)
```
HTML File
```html
<form method="POST" id="payment-form">
    <input type="text" name="card_holder_name">
    <div id="card-element"></div>
</form>
```
Then in your form post action in the backend you will get a `stripeToken` variable which you can use to create a customer or charge the card.

That's it !

Please don't hesitate to create a pull request.
