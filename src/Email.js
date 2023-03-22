import emailjs from "@emailjs/browser";
import keycloak from "./keycloak";
export function sendEmailAPI(data) {
  let message = `Congratulations, your shipments was successfully created!\n\n
                SHIPMENT DETAILS:\n
                Destination: ${data.destinationCountry}
                receivers name: ${data.receiverName},
                Weight Option: ${data.weightOption},
                Email: ${data.user.email}
                \n\n
                You are currently not registered, we recommend you do that. You can register at: 
                ${keycloak.createRegisterUrl()}`;
  const value = { to_email: data.user.email, message: message };

  emailjs
    .send("service_sjcyp06", "template_7n5eoif", value, "AcByZELhzs0z1Lh3v")
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
}
