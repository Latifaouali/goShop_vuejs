<template>
  <div class="wave d-none d-md-block">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill-opacity="1"
        d="M0,64L30,80C60,96,120,128,180,122.7C240,117,300,75,360,58.7C420,43,480,53,540,69.3C600,85,660,107,720,106.7C780,107,840,85,900,80C960,75,1020,85,1080,85.3C1140,85,1200,75,1260,69.3C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
      ></path>
    </svg>
  </div>
  <footer class="position-relative pt-8 z-1 overflow-hidden pt-5">
    <div class="container">
      <div class="row g-5">
        <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
          <div class="footer-widget">
            <h5 class="text-white mb-4 fw-bold">Quick Links</h5>
            <ul class="footer-nav">
              <li>
                <p>Home</p>
              </li>
              <li>
                <p>products</p>
              </li>
              <li>
                <p>About Us</p>
              </li>
              <li>
                <p>Contact Us</p>
              </li>
              <li>
                <p>Terms &amp; Conditions</p>
              </li>
              <li>
                <p>Return Policy</p>
              </li>
              <li>
                <p>Privacy Policy</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
          <div class="footer-widget">
            <h5 class="text-white mb-4 fw-bold">Customer Pages</h5>
            <ul class="footer-nav">
              <li>
                <p>Your Account</p>
              </li>
              <li>
                <p>Your Orders</p>
              </li>
              <li>
                <p>Your Wishlist</p>
              </li>
              <li>
                <p>Address Book</p>
              </li>
              <li>
                <p>Update Profile</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
          <div class="footer-widget">
            <h5 class="text-white mb-4 fw-bold">Contact Info</h5>
            <ul class="footer-nav">
              <li class="text-white pb-2 fs-xs">Agadir, Morocco</li>
              <li class="text-white pb-2 fs-xs">+XXXXXXXXXX</li>
              <li class="text-white pb-2 fs-xs">goshop@support.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright pt-120 pb-3" style="background: #cbdce5">
      <span class="gradient-spacer d-block mb-3"></span>
      <div class="container">
        <div class="row align-items-center g-3">
          <div class="col-lg-4">
            <div class="copyright-text blue">
              © All Designed, Developed by latifa ouali
            </div>
          </div>
          <div class="col-lg-4 d-none d-lg-block">
            <div class="logo-wrapper text-center">
              <span style="color: var(--blue)">go</span
              ><strong style="color: var(--pink)">Shop</strong>
            </div>
          </div>
          <div class="col-lg-4 d-none d-lg-block">
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
    </div>
  </footer>
</template>
<style scoped>
footer {
  position: relative;
  background-color: var(--blue);
}
.wave {
  margin-top: 5%;
  width: 100%;
  height: 117px;
  fill: var(--blue);
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  color: #fff;
  font-size: 14px;
  display: block;
  padding: 5px 0;
  opacity: 0.8;
}
li:hover {
  color: var(--yellow);
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
.blue {
  color: var(--blue);
}
</style>
