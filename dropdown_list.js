//Списки при регистрации (день, месяц, год рождения)
document.addEventListener("DOMContentLoaded", function() {
  const daysInput = document.querySelector('input[placeholder="День"]');
  const monthsInput = document.querySelector('input[placeholder="Месяц"]');
  const yearsInput = document.querySelector('input[placeholder="Год"]');

  const daysList = document.getElementById("days");
  const monthsList = document.getElementById("months");
  const yearsList = document.getElementById("years");

  // Заполняем дни 1-31
  for(let i=1; i<=31; i++){
    const div = document.createElement("div");
    div.textContent = i;
    div.addEventListener("click", ()=> {
      daysInput.value = i;
      daysList.style.display = "none";
    });
    daysList.appendChild(div);
  }

  // Заполняем месяцы
  const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
  months.forEach(month=>{
    const div = document.createElement("div");
    div.textContent = month;
    div.addEventListener("click", ()=> {
      monthsInput.value = month;
      monthsList.style.display = "none";
    });
    monthsList.appendChild(div);
  });

  // Заполняем годы, например 2020-2030
  for(let y=2020; y<=2030; y++){
    const div = document.createElement("div");
    div.textContent = y;
    div.addEventListener("click", ()=> {
      yearsInput.value = y;
      yearsList.style.display = "none";
    });
    yearsList.appendChild(div);
  }

  // показываем/скрываем список при клике на input
  daysInput.addEventListener("click", ()=> {
    daysList.style.display = daysList.style.display === "block" ? "none" : "block";
  });
  monthsInput.addEventListener("click", ()=> {
    monthsList.style.display = monthsList.style.display === "block" ? "none" : "block";
  });
  yearsInput.addEventListener("click", ()=> {
    yearsList.style.display = yearsList.style.display === "block" ? "none" : "block";
  });

  // скрываем при клике вне
  document.addEventListener("click", (e)=>{
    if(!daysInput.contains(e.target) && !daysList.contains(e.target)) daysList.style.display="none";
    if(!monthsInput.contains(e.target) && !monthsList.contains(e.target)) monthsList.style.display="none";
    if(!yearsInput.contains(e.target) && !yearsList.contains(e.target)) yearsList.style.display="none";
  });
});

//таймер аукциона
const auctionDate = new Date("2026-03-07T00:18:00");

function addZero(number){
  return number < 10 ? "0" + number : number;
}

function updateTimer(){

  const now = new Date();
  const diff = auctionDate - now;

  if(diff <= 0){
    document.getElementById("auction_timer").textContent = "00:00:00:00";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff/(1000*60*60)) % 24);
  const minutes = Math.floor((diff/(1000*60)) % 60);
  const seconds = Math.floor((diff/1000) % 60);

  document.getElementById("auction_timer").textContent =
    `${addZero(days)}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

setInterval(updateTimer, 1000);
updateTimer();

//слайдер в карточке товара аукциона
const images = [
"/photo/auctuion_peace_1.png",
"/photo/auctuion_peace_2.png",
"/photo/auctuion_peace_3.png"
];

let current = 0;

const slider = document.getElementById("slider_image");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.onclick = function(){
  current++;
  if(current >= images.length){
    current = 0;
  }
  slider.src = images[current];
}

prev.onclick = function(){
  current--;
  if(current < 0){
    current = images.length - 1;
  }
  slider.src = images[current];
}

//модальное окно
// Получаем элементы
const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');

// Открытие модалки
openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.classList.add('show');
});

// Закрытие модалки
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.classList.remove('show');
});

// Закрытие по клику на затемнённый фон
modal.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
});

//профиль
function openTab(tabNumber){

    let tabs = document.querySelectorAll(".content_block");

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById("tab"+tabNumber).classList.add("active");
}