<template>
  <NavBar />
  <div class="main">
    <h1>Get In <span style="color: var(--pink)">Touch !</span></h1>
    <div class="container">
      <p>
        Feel free to reach out to us with any questions, feedback, or inquiries.
        We value your input and are here to assist you.
      </p>
    </div>
    <div class="card">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <div
            class="contact-left-box position-relative overflow-hidden z-1 p-6 d-flex flex-column h-100"
          >
            <h3 class="mb-3 blue">Contact Details</h3>
            <p class="fs-sm blue">
              <strong>Office Address: </strong>Agadir, Morocco
            </p>
            <span class="spacer my-5"></span>
            <ul class="contact-list">
              <li class="d-flex align-items-center gap-3 flex-wrap">
                <span
                  class="icon d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                >
                  <i class="bi bi-whatsapp"></i>
                </span>
                <div class="info">
                  <span class="fw-medium fs-xs blue">Emergency Call</span>
                  <p class="mb-0 mt-1">+XXXXXXXXXX</p>
                </div>
              </li>
              <li class="d-flex align-items-center gap-3 flex-wrap mt-3">
                <span
                  class="icon d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                >
                  <i class="bi bi-envelope"></i>
                </span>
                <div class="info">
                  <span class="fw-medium fs-xs blue"
                    >General Communicationl</span
                  >
                  <p class="mb-0 mt-1 fw-medium">goshop@support.com</p>
                </div>
              </li>
            </ul>
            <div class="mt-5">
              <span class="fw-bold mb-3 d-block blue">Business Hours::</span>
              <p class="mb-0 mt-1 fw-medium">
                Monday - Friday: 9:00 AM - 5:00 PM
              </p>
            </div>
            <div class="mt-5">
              <span class="fw-bold mb-3 d-block blue">Find us on:</span>
              <div class="social-links d-flex align-items-center gap-2">
                <a href="https://www.facebook.com/"
                  ><i class="bi bi-facebook"></i
                ></a>
                <a href="https://twitter.com/"><i class="bi bi-twitter"></i></a>
                <a href="https://www.linkedin.com/"
                  ><i class="bi bi-linkedin"></i
                ></a>
                <a href="https://www.youtube.com/"
                  ><i class="bi bi-youtube"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form class="row g-3 needs-validation" @submit.prevent="sendMessage">
            <h3 class="mb-3 pink">Need Help? Send Message</h3>
            <div
              class="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
              role="alert"
              v-if="doneMessage"
            >
              {{ doneMessage }}
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="alert"
                @click="doneMessage = ''"
              ></button>
            </div>

            <div
              class="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show"
              role="alert"
              v-if="error"
            >
              {{ errorMessage }}
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="alert"
                @click="error = ''"
              ></button>
            </div>
            <div class="col-12">
              <label for="yourEmail" class="form-label">Your Email</label>

              <input
                type="email"
                class="form-control"
                v-model="messageData.email"
                required
              />
            </div>

            <div class="col-12">
              <label for="yourUsername" class="form-label">Subject</label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  class="form-control"
                  v-model="messageData.subject"
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <label for="yourUsername" class="form-label">message</label>
              <div class="input-group has-validation">
                <textarea
                  class="form-control"
                  style="height: 100px"
                  v-model="messageData.message"
                  required
                ></textarea>
              </div>
            </div>

            <div class="col-12">
              <button class="btn" type="submit">send message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div></div>
  </div>
  <FooterComponent />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
const errorMessage = computed(
  () => store.getters["moduleUser/getErrorMessage"]
);
const error = ref("");
const store = useStore();
const messageData = ref({
  email: "",
  subject: "",
  message: "",
});
const doneMessage = ref("");
const sendMessage = async () => {
  try {
    await store.dispatch("moduleUser/sendMessage", messageData.value);
    if (!errorMessage.value) {
      doneMessage.value = "your message has been sent successfully";
      messageData.value = "";
    }
    error.value = errorMessage.value;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.container {
  font-size: 18px;
  text-align: center;
  padding: 10px 10px;
}

p {
  color: #595959;
  font-size: 15px;
  font-weight: 600;
}

.card {
  width: 80%;
  margin-top: 4%;
  margin-left: 10%;
}
form {
  margin-right: 16px;
  margin-top: 10px;
}

label {
  color: #595959;
}

input,
textarea {
  border-color: var(--blue);
}

.btn {
  margin-left: 26%;
  border-radius: 92px;
  width: 42%;
  padding: 10px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
}

.btn:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}

h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 598;
  font-family: "Quicksand", sans-serif;
  line-height: 1.2;
  margin-bottom: 40px;
  margin-top: 7%;
}
.contact-left-box {
  background: #cbdce5;
  background-position: right bottom;
  padding: 29px 41px;
}
.spacer {
  width: calc(100% + 50px);
  height: 1px;
  margin-left: -25px;
  background-color: var(--blue);
  display: block;
}
.social-links a {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid var(--blue);
  color: var(--blue);
  background: white;
}
.contact-list li .icon {
  width: 40px;
  height: 40px;
  background-color: white;
  color: var(--blue);
  font-size: 20px;
}
.blue {
  color: var(--blue);
}
.pink {
  color: var(--pink);
}

@media (max-width: 767px) {
  .main {
    margin-bottom: 6%;
  }
}

@media (max-width: 991px) {
  .btn {
    margin-bottom: 4%;
  }
  .col-md-8.col-lg-7.col-xl-6 {
    width: 100%;
  }
}
</style>
