<template>
  <NavBar />
  <main>
    <h3>My Profile</h3>
    <section class="section_profile g-4 col-10" style="margin-top: 6%">
      <div class="card">
        <div class="card-body pt-3">
          <!-- Bordered Tabs -->
          <div class="tab-content pt-2">
            <div
              class="tab-pane fade profile-edit pt-3 active show"
              id="profile-edit"
            >
              <div
                class="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
                role="alert"
                v-if="updateSuccess"
              >
                <p>Your profile has been successfully updated</p>
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  @click="updateSuccess = false"
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
              <!-- Profile Edit Form -->
              <form class="edit_form" @submit.prevent="UpdateProfile">
                <div class="row mb-3 profileImage">
                  <label
                    for="profileImage"
                    class="col-md-4 col-lg-3 col-form-label label"
                    >Profile Image</label
                  >
                  <div class="col-md-8 col-lg-9">
                    <img :src="`https://goshop-3bs3.onrender.com/${userData.picture}`" alt="Profile" />
                    <div class="pt-2">
                      <input
                        type="file"
                        name="picture"
                        v-if="updateFile"
                        @change="handleFileChange"
                      />
                      <button
                        class="btn btn-primary btn-sm"
                        @click="updateFile = true"
                      >
                        <i class="bi bi-upload"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <label
                    for="fullName"
                    class="col-md-4 col-lg-3 col-form-label label"
                    >Username</label
                  >
                  <div class="col-md-8 col-lg-9">
                    <input
                      name="fullName"
                      type="text"
                      class="form-control"
                      id="fullName"
                      v-model="userData.userName"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <label
                    for="Address"
                    class="col-md-4 col-lg-3 col-form-label label"
                    >Address</label
                  >
                  <div class="col-md-8 col-lg-9">
                    <input
                      name="address"
                      type="text"
                      class="form-control"
                      id="Address"
                      v-model="userData.address"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <label
                    for="Phone"
                    class="col-md-4 col-lg-3 col-form-label label"
                    >Phone</label
                  >
                  <div class="col-md-8 col-lg-9">
                    <input
                      name="phone"
                      type="text"
                      class="form-control"
                      id="Phone"
                      v-model="userData.phone"
                    />
                  </div>
                </div>
                <button class="btn btn-save">Save Changes</button>
              </form>
              <!-- End Profile Edit Form -->
            </div>
          </div>
          <!-- End Bordered Tabs -->
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => JSON.parse(store.getters["moduleAuth/getUser"]));
const errorMessage = computed(
  () => store.getters["moduleUser/getErrorMessage"]
);
const error = ref("");
const updateSuccess = ref(false);
const updateFile = ref(false);

const userData = ref({
  userID: user.value._id,
  userName: user.value.userName,
  picture: user.value.picture,
  address: user.value.address,
  phone: user.value.phone,
});

const handleFileChange = (event) => {
  userData.value.picture = event.target.files[0];
};

const UpdateProfile = async () => {
  try {
    await store.dispatch("moduleUser/UpdateProfile", userData.value);
    if (!errorMessage.value) {
      updateSuccess.value = true;
    }
    error.value = errorMessage.value;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
h3 {
  margin-top: 3%;
  font-weight: 600;
  color: #191d28;
  text-align: center;
}
.section_profile {
  margin-left: 10%;
}

.card {
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
  padding: 3em;
  line-height: 1.5em;
}
.profileImage img {
  max-width: 120px;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: var(--pink);
  font-family: fantasy;
  font-weight: bold;
}
.nav-tabs .nav-link {
  color: var(--blue);
}
.label {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: #191d28;
}
.edit_form {
  margin-top: 4%;
}
input {
  border-color: var(--blue);
}
.btn-save {
  margin-top: 4%;
  border-radius: 92px;
  width: 16%;
  padding: 10px;
  background: var(--pink);
  color: white;
  transition: box-shadow 0.3s;
}

.btn-save:hover {
  box-shadow: 0 0 2px 2px #d61c4e6a;
}

.btn-danger {
  margin-left: 1%;
}
</style>
