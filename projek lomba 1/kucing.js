const petImage = document.getElementById("petImage");
const happyBar = document.getElementById("happyBar");
const hungryBar = document.getElementById("hungryBar");

let happy = 80;
let hungry = 20;
let ekspresiTimeout = null;

function updateBars() {
    happyBar.style.width = happy + "%";
    hungryBar.style.width = hungry + "%";

    if (happy <= 20 && hungry <= 20) {
        showExpression("sad");
    } else if (!ekspresiTimeout) {
        showExpression("normal");
    }
}

function showExpression(type, duration = 0) {
    if (ekspresiTimeout) {
        clearTimeout(ekspresiTimeout);
        ekspresiTimeout = null;
    }

    if (type === "love") {
        petImage.src = "kucing senang.png";

        ekspresiTimeout = setTimeout(() => {
            ekspresiTimeout = null;
            if (happy <= 20 && hungry <= 20) {
                showExpression("sad");
            } else {
                showExpression("normal");
            }
        }, duration);
    } else if (type === "sad") {
        petImage.src = "kucing nangis.png";
    } else {
        petImage.src = "kucing123.png";
    }
}

function bounceOnce() {
    petImage.classList.remove("animate-bounce");
    void petImage.offsetWidth; // reset trick
    petImage.classList.add("animate-bounce");

    setTimeout(() => {
        petImage.classList.remove("animate-bounce");
    }, 1500);
}

petImage.addEventListener("click", () => {
    if (hungry <= 20 && happy <= 20) return;

    happy = Math.min(happy + 10, 100);
    updateBars();
    showExpression("love", 1500);
    bounceOnce();
});

function feedPet() {
    hungry = Math.min(hungry + 20, 100);
    updateBars();
    showExpression("love", 1500);
    bounceOnce(); // bounce saat makan juga
}

setInterval(() => {
    hungry = Math.min(hungry + 10, 100);
    happy = Math.max(happy - 5, 0);
    updateBars();
}, 10000);


function petPet() {
  const hint = document.getElementById("petHint");
  
  // Hilangkan tulisan saat dipat
  hint.style.opacity = "0";

  // Boleh munculin lagi setelah beberapa detik (opsional)
  setTimeout(() => {
    hint.style.opacity = "1";
  }, 1500); // muncul lagi setelah 3 detik
}