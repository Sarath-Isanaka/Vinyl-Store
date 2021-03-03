

const braintree = require("braintree");
const { response } = require("express");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "sf39hr22vs29gbzh",
  publicKey: "z25nstywy3k86dj8",
  privateKey: "ud2df54c48eab33365e3215b5c0f08374"
});


exports.getToken = (req, res)=>{
    gateway.clientToken.generate({}, function(err, response) {
        if(err){
            res.status(500).send(error);
        }else{
            res.send(response);
        }
      });
}

exports.processPayment = (req, res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result)
          }
      });
}