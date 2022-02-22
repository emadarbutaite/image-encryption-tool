var canvas;
var context;
var canvas2;
var context2;
var canvas3;
var context3;
var file1;
var file2;

document.addEventListener("DOMContentLoaded", function () { 

  const dropArea = document.querySelector(".upload-box"),
  imageContBefore = document.querySelector("#image-container-before"),
  imageContAfter = document.querySelector("#image-container"),
  button = document.querySelector("#btn-upload"),
  saveButton = document.querySelector("#save-button"),
  clearButton = document.querySelector("#clear-button"),
  effectButton = document.querySelector("#effect-button"),
  text = document.querySelector(".text"),
  share1 = document.querySelector("#img1"),
  share2 = document.querySelector("#img2"),
  targetImg = document.querySelector("#target-image"),
  imageLoader = document.querySelector("#image-loader");

  button.onclick = function(){
    imageLoader.click(); 
  }

  imageLoader.addEventListener("change", function(){
    if(imageLoader.files.length == 2){
      dropArea.className = "upload-box-hover";
      imageContBefore.style.display = "none";
      imageContAfter.style.display = "flex";
      effectButton.style.visibility = "visible";
      file1 = this.files[0];
      file2 = this.files[1];
      handleshare1();
      handleshare2();
    }else{
    alert("Select 2 image files in PNG format.");
    dropArea.className = "upload-box";
    } 
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
    effectButton.style.visibility = "visible";
    file1 = event.dataTransfer.files[0];
    file2 = event.dataTransfer.files[1];
    handleshare1();
    handleshare2();
  });

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

 function handleshare1(){
    var fileType = file1.type; 
    var validExtensions = ["image/png"]; 
    if(validExtensions.includes(fileType)){ 
      var reader = new FileReader();
      reader.onload = function(){
        var theImg = reader.result;
        drawshare1(theImg);
        share1.src = theImg;
      }
      reader.readAsDataURL(file1);
    }else{
      alert("Invalid file format! Upload the image in PNG format.");
      dropArea.className = "upload-box";
    }
  }

  function drawshare1(event){
    var img = new Image();
      img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
      
        context = canvas.getContext("2d");
        
        canvas3 = document.createElement("canvas");
        context3 = canvas3.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        canvas3.width = img.width;
        canvas3.height = img.height;
        ctx.drawImage(img,0,0);
      }
      img.src = event;
  }

  var canvas2 = document.createElement("canvas");
  var ctx2 = canvas2.getContext("2d");

  function handleshare2(){
    var fileType = file2.type; 
    var validExtensions = ["image/png"]; 
    if(validExtensions.includes(fileType)){ 
      var reader2 = new FileReader();
      reader2.onload = function(){
        var theImg = reader2.result;
        drawshare2(theImg);
        share2.src = theImg;
      }
      reader2.readAsDataURL(file2);
    }else{
      alert("Invalid file format! Upload the image in PNG format.");
      dropArea.className = "upload-box";
    }
  }
  function drawshare2(event){
    var img2 = new Image();
      img2.onload = function(){
            canvas2.width = img2.width;
            canvas2.height = img2.height;
  
            context2 = canvas2.getContext("2d");
            
            canvas2.width = img2.width;
            canvas2.height = img2.height;
            ctx2.drawImage(img2,0,0);
      }
      img2.src = event;
  }

  effectButton.addEventListener("click", function () {

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    var imageData3 = context3.getImageData(0, 0, canvas3.width, canvas3.height);

    

    function XOR(in1, in2, output) {
  
      for (var i = 0; i < in1.length; i += 4) {
        output[i] = in1[i] ^ in2[i];
        output[i+1] = in1[i+1] ^ in2[i+1];
        output[i+2] = in1[i+2] ^ in2[i+2];
        output[i+3] = 255;
      }

      if(targetImg.innerHTML.trim().length == 0){
        console.log(output);
      }
      
      imageData3.data = output;
      context3.putImageData(imageData3, 0, 0);
    }

    XOR(imageData.data, imageData2.data, imageData3.data)

    if(targetImg.innerHTML.trim().length == 0){
      var newImg = new Image();
      newImg.src = canvas3.toDataURL("image/png");
      newImg.className = "img-fluid";
      targetImg.appendChild(newImg);
      
      text.style.visibility = "visible";
      saveButton.style.visibility = "visible";
      clearButton.style.visibility = "visible";

      console.log(imageData);
      console.log(imageData2);
    }

  });

  clearButton.addEventListener("click", function() {
    share1.innerHTML = '';
    share2.innerHTML = '';
    dropArea.className = "upload-box";
    imageContBefore.style.display = "flex";
    imageContAfter.style.display = "none";
    effectButton.style.visibility = "hidden";

    saveButton.style.visibility = "hidden";
    clearButton.style.visibility = "hidden";
    text.style.visibility = "hidden";
    targetImg.innerHTML = '';    
  });

  saveButton.addEventListener("click", function () {
    canvas3.toBlob(function(blob) {
      saveAs(blob, "image.png");
    });
  });

});