const addProduct = document.getElementById("addProduct"),
  tbody = document.getElementById("tbody"),
  getTheme = document.getElementById("getTheme");

addProduct.addEventListener("click", (e) => {
  document.body.classList.remove("animate__fadeIn");
  document.body.classList.add("animate__fadeOutLeft");

  document.body.addEventListener("animationend", () => {
    location.href = "./addProduct.html";
  });
});

window.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
});

getTheme.addEventListener("click", async () => {
  try {
    console.log(await window.myApi.getTheme());
  } catch (error) {
    console.log(error);
  }
});

async function deleteProduct(id) {
  const result = await window.myApi.deleteProduct(id);
  await getProducts();
  console.log(result);
}

async function dec(id) {
  const result = await window.myApi.dec(id);
  if (result.msg == "ok") {
    await getProducts();
  }
}

async function getProducts() {
  tbody.innerHTML = "";

  const products = await window.myApi.getProducts();
  console.log(products);

  products.forEach((product) => {
    tbody.innerHTML += `
       <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img src="${product.dataValues.img}" />
                </th>
                <td class="px-6 py-4">${product.dataValues.name}</td>
                <td class="px-6 py-4">${product.dataValues.price}</td>
                <td class="px-6 py-4">${product.dataValues.count}</td>
                <td class="px-6 py-4 text-right">
                  <a
                    onclick="deleteProduct('${product.dataValues.id}')"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline  cursor-pointer"
                    style="user-select: none"
                    >delete</a
                  >
                  <a
                    onclick="dec('${product.dataValues.id}')"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    style="user-select: none"
                    >-</a
                  >
                </td>
              </tr>
    `;
  });
}

async function setusername(username = "sam") {
  // const name = await localStorage.getItem("username");
  // if (!name) {
  //   await localStorage.setItem("username", username);
  // } else {
  //   console.log(name);
  // }
  // await localStorage.clear();
}

setusername();
