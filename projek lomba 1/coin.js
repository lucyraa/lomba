
if (!localStorage.getItem("coins")) {
    localStorage.setItem("coins", "6000");
}

let coins = parseInt(localStorage.getItem("coins")) || 0;

function updateCoinDisplay() {
    const coinSpan = document.getElementById("coinDisplay");
    if (coinSpan) {
        coinSpan.textContent = coins.toLocaleString("id-ID");
    }
}

updateCoinDisplay();

function beliHewan(halamanTujuan, nama, harga) {
    if (coins >= harga) {
        coins -= harga;
        localStorage.setItem("coins", coins);
        updateCoinDisplay();

        const koleksi = JSON.parse(localStorage.getItem("koleksiPet") || "[]");
        if (!koleksi.includes(nama)) {
            koleksi.push(nama);
            localStorage.setItem("koleksiPet", JSON.stringify(koleksi));
        }

        window.location.href = halamanTujuan;
    } else {
        alert("Koin kamu tidak cukup!");
    }
    return false;
}

async function connectPlug() {
    const btn = document.getElementById("walletBtn"); // ambil tombolnya

    if (window.ic && window.ic.plug) {
        const connected = await window.ic.plug.requestConnect();
        if (connected) {
            const principalId = await window.ic.plug.getPrincipal();
            console.log("Connected to Plug:", principalId);

            // Setelah connect berhasil, ubah tombol jadi Top Up
            btn.textContent = "Top Up";
            btn.onclick = showTopUpModal; // pas diklik munculin modal topup
        } else {
            alert("Gagal connect ke Plug Wallet.");
        }
    } else {
        alert("Plug Wallet belum terpasang!");
    }
}



function showTopUpModal() {
    document.getElementById("topUpModal").classList.remove("hidden");
}

function closeTopUpModal() {
    document.getElementById("topUpModal").classList.add("hidden");
}

function topUp(amount) {
    coins += amount;
    localStorage.setItem("coins", coins);
    updateCoinDisplay();
    closeTopUpModal();
    alert(`Top up berhasil! Kamu mendapat ${amount} coin.`);
}





