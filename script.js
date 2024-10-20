let addItems;
onload();

function onload(){
  let bagItemStr = localStorage.getItem("addItems");
  addItems = bagItemStr?JSON.parse(bagItemStr):[];
  displayItems();
  displayBagIcon();
}

function addButton(id){
  addItems.push(id);
  localStorage.setItem("addItems",JSON.stringify(addItems))
  displayBagIcon();
}

function displayBagIcon(){
  const bagItemCount = document.querySelector(".bag-item-count");
  if(addItems.length>0){
    bagItemCount.innerText = addItems.length;
    bagItemCount.style.visibility ="visible";
  }
  else{
    bagItemCount.style.visibility ="hidden";
  }
}

function displayItems(){
  for (let i = 0; i < itemList.length; i++) {
    const {id,src,rating,companyName,itemName,originalPrice,discount} = itemList[i];
  const itemsContainer = document.querySelector(".items-container");
  if(!itemsContainer){
    return;
  }
  let currentPrice = (originalPrice * (discount.replace("% OFF","")))/100;
  currentPrice = originalPrice - currentPrice;
  
  itemsContainer.innerHTML +=`<div
  class="item-container">
  <img class="item-image" src=${src} alt="image">
  <div class="rating">
  ${rating.star} ⭐ | ${rating.reviews>1000?rating.reviews/1000+"k":rating.reviews}
  </div>
  <div class="company-name">${companyName}</div>
  <div class="item-name">${itemName}</div>
  <div class="prices">
  <span class="current-price">${currentPrice.toFixed(0)}</span>
  <span class="original-price">${originalPrice}</span>
  <span class="discount">(${discount})</span>
  </div>
  <button class="btn-add-bag" onclick="addButton(${id})">Add to Bag</button>
  </div>`
}
}