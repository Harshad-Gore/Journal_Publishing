const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

// Add click event listener to each eye icon for toggling password visibility
pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach(password => {
      if (password.type === "password") { // If password is hidden
        password.type = "text"; // Show password
        eyeIcon.classList.replace("bx-hide", "bx-show"); // Change icon to show state
        return;
      }
      password.type = "password"; // Hide password
      eyeIcon.classList.replace("bx-show", "bx-hide"); // Change icon to hide state
    });

  });
});

// Add click event listener to each link to toggle between forms
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // Prevent default link behavior
    forms.classList.toggle("show-signup");
  });
});

document.getElementById('submit-form').addEventListener('click', function (event) {
  event.preventDefault();

  const submitButton = document.getElementById('submit-form');

  const fileInput = document.getElementById('file-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a file!");
    return;
  }

  // Read the file and encode it in Base64
  const reader = new FileReader();
  reader.onload = function () {
    const fileBase64 = reader.result.split(",")[1]; // Get Base64 content

    const formData = {
      username: localStorage.getItem('userName'),
      title: document.getElementById('title').value,
      abstract: document.getElementById('abstract').value,
      keywords: document.getElementById('keywords').value,
      researchArea: document.getElementById('research-area').value,
      message: document.getElementById('message-to-editor').value,
      authName: document.getElementById('authorName').value,
      designation: document.getElementById('authorDesignation').value,
      organization: document.getElementById('authorOrg').value,
      authEmail: document.getElementById('authorEmail').value,
      authMobile: document.getElementById('authorMobile').value,
      country: document.getElementById('country').value,
      state: document.getElementById('state').value,
      city: document.getElementById('city').value,
      postalCode: document.getElementById('postal-code').value,
      address: document.getElementById('address').value,
      uid: localStorage.getItem('userUID'),
      fileName: file.name,
      fileType: file.type,
      fileBase64: fileBase64,
    };
    submitButton.disabled = true;
    fetch("https://script.google.com/macros/s/AKfycbxRyZtkSVK9kHxY7cJtxyMAVNhp-vldgWFaX3cTTW8LQJ82lg_klC3W_u5MHxU6KsLqFg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      mode: 'no-cors'
    })
      .then((response) => {
        console.log("Request sent successfully");
        document.getElementById('submit-the-form').reset();
        submitButton.disabled = false;
        alert('Journal is submitted successfully!');
      })
      .catch((error) => console.error("Error:", error));
  };

  reader.readAsDataURL(file); // Convert the file to Base64
});

document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault();
      const journalId = this.getAttribute('data-journal-id');
      if (journalId === 'journal-of-computational-innovations') {
          document.getElementById('latest-publications').classList.add('hidden');
          document.getElementById('journeldetails').classList.remove('hidden');
      }
  });
});