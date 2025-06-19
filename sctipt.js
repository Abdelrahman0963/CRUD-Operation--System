let Id = 1;
let products = [];
const ProductName = document.querySelector(".productName");
const ProductCategory = document.querySelector(".ProductCategory");
const ProductPrice = document.querySelector(".ProductPrice");
const ProductDescont = document.querySelector(".ProductDescont");
const ProductQuantity = document.querySelector(".ProductQuantity");
const ProductDescription = document.querySelector(".ProductDescription");
const Search = document.querySelector("#search");
const FormBtn = document.querySelector(".btnForm");
const btnUopdate = document.querySelector(".btn-update");

if (localStorage.getItem("products") !== null) {
    products = JSON.parse(localStorage.getItem("products"));
    DisplayProudcts();
}
function AddNewProduct() {
    if (
        ProductName.value.trim() === "" &&
        ProductCategory.value.trim() === "" &&
        ProductPrice.value.trim() === "" &&
        ProductDescont.value.trim() === "" &&
        ProductQuantity.value.trim() === "" &&
        ProductDescription.value.trim() === ""
    ) {
        return;
    }

    const Proudct = {
        Id: products.length + 1,
        Name: ProductName.value,
        Category: ProductCategory.value,
        Price: ProductPrice.value,
        Descont: ProductDescont.value,
        Quantity: ProductQuantity.value,
        Description: ProductDescription.value,
    };
    products.push(Proudct);
    localStorage.setItem("products", JSON.stringify(products));
    DisplayProudcts();
}
FormBtn.addEventListener("click", AddNewProduct);

function DisplayProudcts() {
    let html = ``;
    for (let i = 0; i < products.length; i++) {
        html += `
        <tr>
        <td>${products[i].Id}</td>
        <td>${products[i].Name}</td>
        <td>${products[i].Category}</td>
        <td>${products[i].Price}</td>
        <td>${products[i].Descont}</td>
        <td>${products[i].Quantity}</td>
        <td>${products[i].Description}</td>
        <td class="update" onclick="uplodeProductUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i></td>
        <td class="delete" onclick="DeleteProduct(${Id, i})"><i class="fa-solid fa-trash"></i></td>
      </tr>
        `
    }
    document.getElementById("tbody").innerHTML = html

    clearForm()
}
function clearForm() {
    ProductName.value = "";
    ProductCategory.value = "";
    ProductPrice.value = "";
    ProductDescont.value = "";
    ProductQuantity.value = "";
    ProductDescription.value = "";
}

function DeleteProduct(i) {
    products.splice(i, 1);
    for (let i = 0; i < products.length; i++) {
        products[i].Id = i + 1;
    }
    localStorage.setItem("products", JSON.stringify(products));
    DisplayProudcts();
}

function SearcProduct(value) {
    let html = ``;
    for (let i = 0; i < products.length; i++) {
        if (products[i].Name.toLowerCase().includes(value) || products[i].Category.toLowerCase().includes(value) || products[i].Description.toLowerCase().includes(value) || products[i].Price.toLowerCase().includes(value) || products[i].Descont.toLowerCase().includes(value) || products[i].Quantity.toLowerCase().includes(value)) {
            html += `
            <tr>
            <td>${products[i].Id}</td>
            <td>${products[i].Name}</td>
            <td>${products[i].Category}</td>
            <td>${products[i].Price}</td>
            <td>${products[i].Descont}</td>
            <td>${products[i].Quantity}</td>
            <td>${products[i].Description}</td>
            <td class="update" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i></td>
            <td class="delete" onclick="DeleteProduct(${Id, i})"><i class="fa-solid fa-trash"></i></td>
          </tr>
            `
        } else {
        }
    }
    document.getElementById("tbody").innerHTML = html
}
Search.addEventListener("input", () => {
    SearcProduct(Search.value)
})

let indexProduct = 0;
function uplodeProductUpdate(i) {
    indexProduct = i;
    btnUopdate.classList.remove("d-none");
    FormBtn.classList.add("d-none");
    ProductName.value = products[i].Name;
    ProductCategory.value = products[i].Category;
    ProductPrice.value = products[i].Price;
    ProductDescont.value = products[i].Descont;
    ProductQuantity.value = products[i].Quantity;
    ProductDescription.value = products[i].Description;
}

function DisplayProudctsUpdate(i) {
    products[indexProduct].Name = ProductName.value;
    products[indexProduct].Category = ProductCategory.value;
    products[indexProduct].Price = ProductPrice.value;
    products[indexProduct].Descont = ProductDescont.value;
    products[indexProduct].Quantity = ProductQuantity.value;
    products[indexProduct].Description = ProductDescription.value;
    localStorage.setItem("products", JSON.stringify(products));
    DisplayProudcts();
    clearForm()
    btnUopdate.classList.add("d-none");
    FormBtn.classList.remove("d-none");

}
btnUopdate.addEventListener("click", () => {
    DisplayProudctsUpdate()
})