// create-customer.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submit-form');

  form.addEventListener('click', async (event) => {
    // Prevent the default form submission
    console.log('script connected')
    let newName = document.getElementById("customer_name").value.trim();;
    let newEmail = document.getElementById("customer_email").value;
    let newNumber = document.getElementById("customer_mobile_number").value;
    console.log(newName)
    console.log(newEmail)
    console.log(newNumber)

    if(newName === "" || !newEmail.includes("@") || newNumber.length < 10) {
      alert('fulfilled the fields correctly')
    } else {
        const formData = {
        name: newName,
        email: newEmail,
        number: newNumber
      }

      console.log(formData)

      try {
        fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            // Handle the response here
            if (response.ok) {
              // Handle a successful response, if needed
              console.log('Form submitted successfully');
            } else {
              // Handle errors, if any
              console.error('Form submission failed');
            }
          })
          .catch((error) => {
            // Handle errors here
          });
      } catch (error) {
        console.error('Error:', error);
      }
    }


  });
});
