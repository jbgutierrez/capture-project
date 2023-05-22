import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js";

// Connects to data-controller="camera"
export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element);
    const cameraBtn = document.querySelector("#start-camera");
    const video = document.querySelector("#video");
    const shutterBtn = document.querySelector("#click-photo");
    const canvas = document.querySelector("#canvas");
    const products = document.querySelector("#products");

    cameraBtn.addEventListener('click', async function() {
      document.querySelector("#camera-stream").style.display = "block";
      cameraBtn.style.display = "none";
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          mandatory: {
            width: canvas.width,
            height: canvas.height
          }
        }, audio: false
      });
      var handleLoaded = function() {
        video.removeEventListener('loadedmetadata', handleLoaded);
        video.play();
      };
      video.addEventListener('loadedmetadata', handleLoaded);
      video.srcObject = stream;
    });

    shutterBtn.addEventListener('click', function() {
      console.log(canvas.width, canvas.height);
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const image_data_url = canvas.toDataURL('image/jpeg');

      const url = shutterBtn.getAttribute('data-new-product-url');
      const body = { image: image_data_url };
      // post(url, { body: JSON.stringify(body), responseKind: "turbo-stream" });
      post(url, { body: JSON.stringify(body) });
    });
  }
}
