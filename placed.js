function date(){

  let date =new Date()
  let year = date.getFullYear()
  let month = date.getMonth()+1;
  let day = date.getDate()+10;
  let tarikh = `${day}/${month}/${year}`;
  
  month = day > 31 ? month+1 : month; 
  day = day > 31 ? 5 : day;
  let placedDate = document.querySelector(".placedDate");
  placedDate.innerText = `${day}/${month}/${year}`
}
date();