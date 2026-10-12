const form=document.querySelector("#contact-form");
if(form)form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;document.querySelector("#status").textContent="Thank you. This demo form has been validated locally; no message was sent.";form.reset()});
