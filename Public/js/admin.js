import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBy4jU14CCvcTXBo6eTB104PVPAuDT5Aow",
    authDomain: "journalpublishing-harshad.firebaseapp.com",
    projectId: "journalpublishing-harshad",
    storageBucket: "journalpublishing-harshad.appspot.com",
    messagingSenderId: "300945253831",
    appId: "1:300945253831:web:ed3ad229f0e4b41e2425e2",
    measurementId: "G-6EVL2F9CBJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let isVerified = false;
const reviews = []; // Store reviews

document.addEventListener("DOMContentLoaded", () => {
    const verifyUserBtn = document.getElementById("verify-user");
    const userVerificationForm = document.getElementById("user-verification");
    const reviewForm = document.getElementById("review-form");
    const reviewSection = document.getElementById("review-section");
    const submissionAdminInfo = document.getElementById("submission-admin-info");
    const addReviewBtn = document.getElementById("addReviewBtn");
    const reviewContainer = document.getElementById("reviewContainer");
    const submitReviewsBtn = document.getElementById("submitReviewsBtn");

    // User verification
    verifyUserBtn.addEventListener("click", async () => {
        const userName = document.getElementById("userName").value.trim();
        const userEmail = document.getElementById("userEmail").value.trim();

        if (!userName || !userEmail) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();
                if (user.username === userName) {
                    isVerified = true;
                    alert("User verified successfully!");
                    userVerificationForm.classList.add("d-none");
                    reviewForm.classList.remove("d-none");
                    reviewSection.classList.remove("d-none");
                    submissionAdminInfo.classList.remove("d-none");
                } else {
                    alert("Username does not match the provided email.");
                }
            } else {
                alert("No user found with the provided email.");
            }
        } catch (error) {
            console.error("Error verifying user:", error);
            alert("An error occurred during verification. Please try again.");
        }
    });

    // Add Review
    addReviewBtn.addEventListener("click", () => {
        if (!isVerified) {
            alert("Please verify the user before adding reviews.");
            return;
        }

        const title = document.getElementById("titleInput").value.trim();
        const suggestion = document.getElementById("suggestionInput").value.trim();

        if (title && suggestion) {
            reviews.push({ title, suggestion });

            // Add to Review Section
            const reviewCard = document.createElement("div");
            reviewCard.className = "card mb-3 p-3";
            reviewCard.innerHTML = `
                        <h5 class="text-primary">${title}</h5>
                        <p>${suggestion}</p>
                    `;
            reviewContainer.appendChild(reviewCard);

            // Clear muted message if present
            const mutedMessage = document.querySelector(".text-muted");
            if (mutedMessage) mutedMessage.remove();

            // Clear input fields
            document.getElementById("titleInput").value = "";
            document.getElementById("suggestionInput").value = "";
        } else {
            alert("Both fields are required!");
        }
    });

    // Submit Reviews
    submitReviewsBtn.addEventListener("click", async () => {
        if (reviews.length > 0 && isVerified) {
            try {
                const reviewsRef = collection(db, "reviews");
                for (const review of reviews) {
                    // await addDoc(reviewsRef, review);
                    await addDoc(reviewsRef, {review,
                        userDetail: {
                        username: document.getElementById("userName").value.trim(),
                        email: document.getElementById("userEmail").value.trim(),
                        },
                        submissionDetail: {
                        title: document.getElementById("submissionTitle").value.trim(),
                        dateOfSubmission: document.getElementById("submissionDate").value.trim(),
                        status: document.getElementById("submissionStatus").value.trim(),
                        },
                        adminDetail: {
                        name: document.getElementById("adminName").value.trim(),
                        email: document.getElementById("adminEmail").value.trim(),
                        },
                        timestamp: new Date().toISOString()
                    });
                }

                alert("Reviews submitted successfully!");
                reviewContainer.innerHTML = '<p class="text-muted">No reviews added yet. Use the form above to add.</p>';
                reviews.length = 0; // Clear local array
            } catch (error) {
                console.error("Error submitting reviews: ", error);
                alert("Error submitting reviews. Please try again.");
            }
        } else {
            alert("Please add at least one review before submitting.");
        }
    });
});
