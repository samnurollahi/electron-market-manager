const labelPhoto = document.getElementById("labelPhoto"),
  img = document.getElementById("photo"),
  btnAddProduct = document.getElementById("btnAddProduct");

let imgSrc = null;

labelPhoto.addEventListener("click", async () => {
  const result = await window.myApi.opend();

  if (!result.canceled) {
    labelPhoto.classList.add("hidden");
    img.classList.remove("hidden");
    img.src = result.filePaths[0];

    imgSrc = result.filePaths[0];
  }
});

btnAddProduct.addEventListener("click", async () => {
  const product = {
    img: imgSrc,
    name: nameProduct.value,
    price: price.value,
    count: count.value,
    exp: exp.value,
  };

  const result = await window.myApi.addProduct(product);
  if (result.msg == "ok") {
    location.href = "./index.html";
  }
});
