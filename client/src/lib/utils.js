import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from "emailjs-com";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
emailjs.init(import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY);

const emails = {
  bob: import.meta.env.VITE_EMAIL_JS_BOB_MAIL,
  grex: import.meta.env.VITE_EMAIL_JS_GREX_MAIL,
  hassan: import.meta.env.VITE_EMAIL_JS_HASSAN_MAIL,
  jad: import.meta.env.VITE_EMAIL_JS_JAD_MAIL,
};

export const handleContactSubmit = (data) => {
  console.log(data);

  let receiverEmail = "";
  let ccEmail = "";

  if (data.selectedService === "Web Design") {
    // For Website: receivers: bob and hassan; cc: grex and jad.
    receiverEmail = `${emails.hassan}`;
    ccEmail = `${emails.grex}, ${emails.jad}`;
  } else if (data.selectedService === "Mobile App Design") {
    // For mobile: receivers: grex and jad; cc: bob and hassan.
    receiverEmail = `${emails.hassan}, ${emails.jad}`;
    ccEmail = `${emails.bob}, ${emails.grex}`;
  } else if (data.selectedService === "Mobile App Development") {
    // For UI UX: receiver: hassan; cc: bob, grex, and jad.
    receiverEmail = `${emails.jad}`;
    ccEmail = `${emails.bob}, ${emails.grex}, ${emails.hassan}`;
  } else if (data.selectedService === "Software Development") {
    // For Software: receivers: bob and grex; cc: jad and hassan.
    receiverEmail = `${emails.bob}, ${emails.grex}`;
    ccEmail = `${emails.jad}, ${emails.hassan}`;
  } else if (data.selectedService === "Web Development") {
    // For Web Development: receivers: bob and hassan; cc: jad and grex.
    receiverEmail = `${emails.bob}, ${emails.hassan}`;
    ccEmail = `${emails.jad}, ${emails.grex}`;
  } else if (data.selectedService === "Software Upgrades") {
    // For Web Development: receivers: bob and grex; cc: jad and hassan.
    receiverEmail = `${emails.bob}, ${emails.grex}`;
    ccEmail = `${emails.jad}, ${emails.hassan}`;
  } else if (data.selectedService === "Hosting") {
    // For Web Development: receivers: bob and grex; cc: jad and hassan.
    receiverEmail = `${emails.bob}, ${emails.grex}`;
    ccEmail = `${emails.jad}, ${emails.hassan}`;
  } else if (data.selectedService === "SEO") {
    // For Web Development: receivers: bob and hassan; cc: jad and grex.
    receiverEmail = `${emails.bob}, ${emails.hassan}`;
    ccEmail = `${emails.jad}, ${emails.grex}`;
  } else if (data.selectedService === "Custom Domain") {
    // For Web Development: receivers: bob and grex; cc: jad and hassan.
    receiverEmail = `${emails.bob}, ${emails.grex}`;
    ccEmail = `${emails.jad}, ${emails.hassan}`;
  } else if (data.selectedService === "Custom Email") {
    // For Web Development: receivers: bob and grex; cc: jad and hassan.
    receiverEmail = `${emails.bob}, ${emails.grex}`;
    ccEmail = `${emails.jad}, ${emails.hassan}`;
  } else {
    receiverEmail = `${emails.bob}, ${emails.grex}`;
    ccEmail = `${emails.jad}, ${emails.hassan}`;
  }


  const templateParams = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    service: data.service,
    company: data.company,
    receiver_email: receiverEmail,
    cc: ccEmail,
  };

  emailjs
    .send(
      import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
      templateParams
    )
    .then((response) => {
      console.log("Email sent successfully", response);
      // Handle success (e.g., show a notification to the user)
    })
    .catch((error) => {
      console.error("Error sending email", error);
      // Handle error (e.g., display an error message to the user)
    });
};
