function handleSubmit(event) {
  event.preventDefault();
  getFormData();
}

function getFormData() {
  let firstName = document.getElementById("first-name").value;
  let lastName = document.getElementById("last-name").value;
  let pincode = document.getElementById("pincode").value;
  let email = document.getElementById("email").value;

  let formData = {
    Name: firstName + " " + lastName,
    email: email,
    pincode: pincode
  };

  let APIurl = "https://api.postalpincode.in/pincode/" + pincode;
  // console.log(APIurl);

  getDeliveryStatus(APIurl, formData);
}

async function getDeliveryStatus(APIurl, formData) {
  try {
    let response = await fetch(APIurl);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    let data = await response.json();
    if (data[0] && data[0].Status === "Success") {
      displayPopup(formData, data[0].PostOffice);
    } else {
      console.error("API response was not successful");
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function displayPopup(formData, postOffices) {
  let popup = document.getElementById("popup");
  let overlay = document.getElementById("overlay");
  let popupData = document.getElementById("popupData");

  let postOfficeInfo = postOffices.map(postOffice => `
    <p><strong>Post Office Name:</strong> ${postOffice.Name}</p>
    <p><strong>Branch Type:</strong> ${postOffice.BranchType}</p>
    <p><strong>Delivery Status:</strong> ${postOffice.DeliveryStatus}</p>
    <p><strong>Block Name:</strong> ${postOffice.Block}</p>
    <hr>
  `).join("");

  popupData.innerHTML = `
    <p><strong>Name:</strong> ${formData.Name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Pincode:</strong> ${formData.pincode}</p>
    <hr>
    ${postOfficeInfo}
  `;

  popup.style.display = "block";
  overlay.style.display = "block";
}

function closePopup() {
  let popup = document.getElementById("popup");
  let overlay = document.getElementById("overlay");

  popup.style.display = "none";
  overlay.style.display = "none";
}



function showData(data) {
  console.log(data);
}
