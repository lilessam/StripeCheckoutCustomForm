module.exports = function(cardElementID, formElementID, fullNameInputName, stripeKey) {
    $(document).ready(function() {
        if (document.getElementById(cardElementID) != null) {
            Stripe.setPublishableKey(stripeKey);
            var stripe = Stripe(stripeKey);
            var elements = stripe.elements();
            var card = elements.create('card', {
                style: {
                    base: {
                        iconColor: '#666EE8',
                        color: '#31325F',
                        lineHeight: '40px',
                        fontWeight: 300,
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSize: '15px',
                        '::placeholder': {
                            color: '#CFD7E0',
                        },
                    },
                },
                'hidePostalCode': true
            });
            card.mount('#' + cardElementID);

            function setOutcome(result) {
                var successElement = document.querySelector('.success');
                var errorElement = document.querySelector('.error');
                successElement.classList.remove('visible');
                errorElement.classList.remove('visible');
                if (result.token) {
                    successElement.querySelector('.token').textContent = result.token.id;
                    successElement.classList.add('visible');
                } else if (result.error) {
                    errorElement.textContent = result.error.message;
                    errorElement.classList.add('visible');
                }
            }
            card.on('change', function(event) {
                setOutcome(event);
            });
            // Handle form submission
            var form = document.getElementById(formElementID);
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                var extraDetails = {
                    name: form.querySelector('input[name=' + fullNameInputName + ']').value,
                };
                stripe.createToken(card, extraDetails).then(function(result) {
                    if (result.error) {
                        // Inform the user if there was an error
                        var errorElement = document.querySelector('.error');
                        errorElement.textContent = result.error.message;
                    } else {
                        // Send the token to your server
                        stripeTokenHandler(result.token);
                    }
                });
            });

            function stripeTokenHandler(token) {
                // Insert the token ID into the form so it gets submitted to the server
                var form = document.getElementById(formElementID);
                var hiddenInput = document.createElement('input');
                hiddenInput.setAttribute('type', 'hidden');
                hiddenInput.setAttribute('name', 'stripeToken');
                hiddenInput.setAttribute('value', token.id);
                form.appendChild(hiddenInput);
                // Submit the form
                form.submit();
            }
        }
    });
};