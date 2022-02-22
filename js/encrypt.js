var canvas;
var context;
var canvas2;
var context2;
var canvas3;
var context3;
var file;

document.addEventListener("DOMContentLoaded", function () { 

  const dropArea = document.querySelector(".upload-box"),
  imageContBefore = document.querySelector("#image-container-before"),
  imageContAfter = document.querySelector("#image-container"),
  button = document.querySelector("#btn-upload"),
  effectButton = document.querySelector("#effect-button"),
  saveButton = document.querySelector("#save-button"),
  clearButton = document.querySelector("#clear-button"),
  image = document.querySelector(".main-image"),
  share1 = document.querySelector("#share1"),
  share2 = document.querySelector("#share2"),
  imageLoader = document.querySelector("#image-loader");

  button.onclick = function(){
    imageLoader.click(); 
  }

  imageLoader.addEventListener("change", function(){
    imageContBefore.style.display = "none";
    imageContAfter.style.display = "flex";
    file = this.files[0];
    dropArea.className = "upload-box-hover";
    effectButton.style.visibility = "visible";
    handleImage();
  });

  dropArea.addEventListener("dragover", function(event){
    event.preventDefault(); 
    dropArea.className = "upload-box-hover";
  });

  dropArea.addEventListener("dragleave", function(){
    dropArea.className = "upload-box";
  });

  dropArea.addEventListener("drop", function(event){
    event.preventDefault(); 
    imageContBefore.style.display = "none";
    imageContAfter.style.display = "flex";
    file = event.dataTransfer.files[0];
    effectButton.style.visibility = "visible";
    handleImage();
  });

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  function handleImage(){
    var fileType = file.type; 
    var validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"]; 
    if(validExtensions.includes(fileType)){ 
      var reader = new FileReader();
      reader.onload = function(){
        var theImg = reader.result;
        drawImage(theImg);
        image.src = theImg;
      }
      reader.readAsDataURL(file);
    }else{
      alert("Invalid file format! Upload the image in PNG, JPG, JPEG or GIF format.");
      dropArea.className = "upload-box";
    }   
  }

  function drawImage(event){
    var img = new Image();
      img.onload = function(){
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img,0,0);
          canvas = document.createElement("canvas");
          context = canvas.getContext("2d");
          
          canvas2 = document.createElement("canvas");
          context2 = canvas2.getContext("2d");
          
          canvas3 = document.createElement("canvas");
          context3 = canvas3.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;
          
          canvas2.width = img.width;
          canvas2.height = img.height;

          canvas3.width = img.width;
          canvas3.height = img.height;
      }
      img.src = event;
  }

  effectButton.addEventListener("click", function () {
    function randomNumber(min, max) {
      return Math.floor(Math.random() * max) + min; 
    }
    function changephoto(data, data2) {
      for (var i = 0; i < data.length; i += 4) {
        data2[i] = randomNumber(0, 255);
        data2[i+1] = randomNumber(0, 255);
        data2[i+2] = randomNumber(0, 255);
        data2[i+3] = 255;
        
        data[i] ^= data2[i];
        data[i+1] ^= data2[i+1];
        data[i+2] ^= data2[i+2];
        data[i+3] = 255;
      }
    }
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    var imageData3 = context3.getImageData(0, 0, canvas.width, canvas.height);

    
    
    changephoto(imageData.data, imageData2.data, imageData3.data);
    
    context.putImageData(imageData, 0, 0);
    context2.putImageData(imageData2, 0, 0);
    context3.putImageData(imageData3, 0, 0);
    
    if(share1.innerHTML.trim().length == 0 || share2.innerHTML.trim().length == 0){
      var shareimg1 = new Image();
      shareimg1.src = canvas.toDataURL("image/png");
      shareimg1.className = "img-fluid";
      share1.appendChild(shareimg1);
  
      var shareimg2 = new Image();
      shareimg2.src = canvas2.toDataURL("image/png");
      shareimg2.className = "img-fluid";
      share2.appendChild(shareimg2);

      console.log( imageData.data);
    }

    saveButton.style.visibility = "visible";
    clearButton.style.visibility = "visible";
  });

  clearButton.addEventListener("click", function() {
    image.innerHTML = '';
    dropArea.className = "upload-box";
    imageContBefore.style.display = "flex";
    imageContAfter.style.display = "none";
    effectButton.style.visibility = "hidden";

    saveButton.style.visibility = "hidden";
    clearButton.style.visibility = "hidden";
    share1.innerHTML = '';
    share2.innerHTML = '';
  });

  saveButton.addEventListener("click", function () {
    canvas.toBlob(function(blob) {
      saveAs(blob, "share1.png");
    });
    canvas2.toBlob(function(blob) {
      saveAs(blob, "share2.png");
    });
  });

});