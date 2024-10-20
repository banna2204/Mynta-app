let deliveryCharge = 99;
let bagItemObjects;
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  if(bagItemObjects.length<1){
    deliveryCharge = 0;
  }

  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.originalPrice;
    totalDiscount += bagItem.originalPrice * ((bagItem.discount.replace("% OFF",""))/100) ;
  });
  
  let finalPayment = totalMRP - totalDiscount + deliveryCharge;
   
  bagSummaryElement.innerHTML = `
        <div class="detail">Price details (Item ${totalItem}) </div>
        <div class="justify"><span>Total MRP</span><span class="mrp">Rs ${totalMRP}</span></div>
        <div class="justify"><span>discount MRP</span><span class="discount-MRP">-Rs ${totalDiscount.toFixed(0)}</span></div>
        <div class="justify"><span>Delivery charge</span><span class="delivery">Rs ${deliveryCharge}</span></div>

        <div class="line"></div>

        <div class="justify"><span class="amount">Total amount</span><span class="total amount">Rs ${finalPayment.toFixed(0)}</span></div> 

    <a href="placed.html"><button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
      </button></a>
  `;
}

function loadBagItemObjects() {
  bagItemObjects = addItems.map(itemId => {
    for (let i = 0; i < itemList.length; i++) {
      if (itemId == itemList[i].id) {
        return itemList[i];
      }
    }
  });
  console.log(bagItemObjects)
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHtml(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  addItems = addItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('addItems', JSON.stringify(addItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHtml(item){
  let currentPrice = (item.originalPrice * (item.discount.replace("% OFF","")))/100;
  currentPrice = item.originalPrice - currentPrice;

    let date =new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1;
    let day = date.getDate();
    let tarikh = `${day}/${month}/${year}`;


  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="img" src="../${item.src}">
    </div>
    <div class="item-right-part">
      <div class="company-name">${item.companyName}</div>
      <div class="item-name">${item.itemName}</div>
      <div class="prices">
        <span class="current-price">Rs ${currentPrice.toFixed(0)}</span>
        <span class="original-price">Rs ${item.originalPrice}</span>
        <span class="discount">(${item.discount})</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${tarikh}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
  } 

