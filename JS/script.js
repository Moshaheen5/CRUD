var productNameInput = document.getElementById("ProductName");
var productPriceInput = document.getElementById("ProductPrice");
var productCategoryInput = document.getElementById("ProductCategory");
var productDescInput = document.getElementById("ProductDesc");
var productImageInput = document.getElementById("ProductImage");
var productElement = document.getElementById("productElement");
var addbutton =document.getElementById("addbutton");
var imgp = document.getElementById("imgp");
var updatebutton =document.getElementById("updatebutton");
var productList =[];
var updateProductIndex ;
var productNameRegex= /^[A-Z].+$/;
var productPriceRegex=/^\d+$/;
var productCategoryRegex=/^Mobile Phone|TV|Laptop|Camera|Printer$/;
var productDescRegex=/^.{3,}$/;
if(localStorage.getItem("ourproducts")!=null){
    productList= JSON.parse(localStorage.getItem("ourproducts"));
    display(productList);
}
function addProduct(){
    if( isValid(productNameRegex,productNameInput) &
    isValid(productPriceRegex,productPriceInput) &
    isValid(productCategoryRegex,productCategoryInput) &
    isValid(productDescRegex, productDescInput) & vaildImage() ){

        var product = {
            ProductName: productNameInput.value  ,
            ProductPrice: productPriceInput.value,
            ProductCategory :productCategoryInput.value,
            ProductDesc :productDescInput.value,
            ProductImage:productImageInput.files[0].name
        }
        productList.push(product);
        localStorage.setItem("ourproducts", JSON.stringify(productList));
        resetProductInputs ();
        display(productList);
    }
}
function resetProductInputs() {
    productNameInput.value = null;
    productPriceInput .value = null ;
    productCategoryInput.selected= true;
    productDescInput.value = null ;
    productImageInput.value = null ; 
    productNameInput.classList.remove("is-valid","is-invalid");
    productCategoryInput.classList.remove("is-valid","is-invalid");
    productPriceInput.classList.remove("is-valid","is-invalid");
    productDescInput.classList.remove("is-valid","is-invalid");
    productImageInput.classList.remove("is-valid","is-invalid");
}
function display (arr){
    var containerElements =``;
for(i =0 ; i< arr.length ; i++){
        containerElements += `  <div class="col">
                                    <div class="border p-2 shadow-sm">
                                       <div class="imgg  pb-3">
                                          <img class="w-100 h-100 object-fit-contain" src="./images/${ arr[i].ProductImage}" alt="">
                                        </div>
                                        <h3 class="fs-5">${arr[i].ProductName}</h3>
                                        <p class="fs-6 text-secondary ">${arr[i].ProductDesc}</p>
                                        <p class="text-secondary"><span class="fw-semibold text-dark">category: </span> ${arr[i].ProductCategory}</p>
                                        <div class="down d-flex justify-content-between pe-3">
                                            <p>${arr[i].ProductPrice} EGP</p>
                                            <div class="icons">
                                                <i onclick="deleteproduct(${i})" class="fa-solid fa-trash-can text-danger fs-5 "></i>
                                                <i onclick="moveProductUp(${i})" class="fa-solid fa-pen-to-square text-success fs-5"></i>
                                            </div>
                                        </div>
                                    </div>
                             </div>`
    }
    productElement.innerHTML=containerElements;
}
function deleteproduct(deleteditem){
    productList.splice(deleteditem,1);
    localStorage.setItem("ourproducts" , JSON.stringify(productList))
    display(productList);
}
function searchByroductName (term){
    var filteredProducts=[] ;
    for(var i=0; i<productList.length ; i++){
        if(productList[i].ProductName.toLowerCase().includes(term.toLowerCase())==true){
            filteredProducts.push(productList[i]);
        }
    }
    display(filteredProducts);
}
function moveProductUp(index){
    productNameInput.value = productList[index].ProductName ;
    productPriceInput .value =productList[index].ProductPrice ;
    productCategoryInput.selected=productList[index].ProductCategory ;
    productDescInput.value = productList[index].ProductDesc ;
    addbutton.classList.replace("d-block", "d-none");
    updatebutton.classList.replace( "d-none","d-block");
    updateProductIndex= index ;
}
function updateProduct(){
    if( isValid(productNameRegex,productNameInput) && 
    isValid(productPriceRegex,productPriceInput) && 
    isValid(productCategoryRegex,productCategoryInput) && 
    isValid(productDescRegex, productDescInput) && vaildImage() ){

        productList[updateProductIndex].ProductName =productNameInput.value;
        productList[updateProductIndex].ProductPrice =productPriceInput.value;
        productList[updateProductIndex].ProductCategory =productCategoryInput.value;
        productList[updateProductIndex].ProductDesc =productDescInput.value;
        if(productImageInput.files[0]!=undefined){
            productList[updateProductIndex].ProductImage=productImageInput.files[0].name;    
        }
        display(productList);
        localStorage.setItem("ourproducts", JSON.stringify(productList));
        resetProductInputs();
        updatebutton.classList.replace("d-block", "d-none");
        addbutton.classList.replace( "d-none","d-block");
    }
}
function isValid(regex,element)
{
   if(regex.test(element.value)==true){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block","d-none");
    return true;
    
   }else{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none","d-block");
    return false;
   }
}
function vaildImage(){
    if(productImageInput.files.length!=0){
        imgp.classList.remove("d-block","d-none");
        return true;
    }else{
        imgp.classList.remove("d-none","d-block");
        return false;
    }
}