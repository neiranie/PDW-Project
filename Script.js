// ============================================================
// script.js — JavaScript Eksternal (Modul 4: Eksternal JS)
// Berisi: animasi bintang, tanggal, fungsi alert, dan event listener
// ============================================================


// ---- 1. MENAMPILKAN TANGGAL HARI INI (Modul 4: JavaScript Date) ----

// Membuat objek Date baru → mendapatkan tanggal saat ini
// Perhatian: harus huruf kapital Date(), bukan date()
let tanggal = new Date();

// Format tanggal agar tampil lebih rapi menggunakan toLocaleDateString
// locale 'id-ID' = format Indonesia (hari, tanggal bulan tahun)
let opsiTanggal = {
  weekday: 'long',  // nama hari: Senin, Selasa, dst.
  year: 'numeric',  // tahun: 2025
  month: 'long',    // nama bulan: Januari, Februari, dst.
  day: 'numeric'    // angka tanggal: 1, 2, dst.
};

// Mengambil format tanggal Indonesia
let tanggalFormatted = tanggal.toLocaleDateString('id-ID', opsiTanggal);

// Menampilkan tanggal di elemen dengan id="tanggalHariIni" (di hero)
// innerHTML: memasukkan teks ke dalam elemen HTML
document.getElementById("tanggalHariIni").innerHTML = "✦ " + tanggalFormatted + " ✦";

// Menampilkan tanggal juga di footer
document.getElementById("tanggalFooter").innerHTML = tanggalFormatted;


// ---- 2. FUNGSI ALERT INFO BINTANG (Modul 4: Fungsi JavaScript) ----

// Fungsi ini dipanggil saat tombol "Lihat Info Lengkap" di klik
// onclick="tampilkanInfo()" di HTML memanggil fungsi ini
function tampilkanInfo() {
  // alert() menampilkan kotak popup dengan pesan (Modul 4: Alert Box)
  alert(
    "ℹ️ INFO BINTANG\n\n" +
    "• Bintang terbentuk dari awan gas dan debu antarbintang.\n" +
    "• Proses pembentukan disebut nebula.\n" +
    "• Bintang menghasilkan energi melalui fusi hidrogen menjadi helium.\n" +
    "• Matahari kita akan menjadi Raksasa Merah dalam ~5 miliar tahun lagi.\n\n" +
    "Sumber: NASA & ESA"
  );
}


// ---- 3. FUNGSI FAKTA ACAK (Modul 4: Fungsi JavaScript) ----

// Array berisi daftar fakta bintang
// Array adalah kumpulan data dalam satu variabel
let daftarFakta = [
  "🌟 Matahari menghasilkan energi setara 386 miliar megawatt setiap detik!",
  "💫 Cahaya Matahari membutuhkan 8 menit 20 detik untuk sampai ke Bumi.",
  "🔭 Bintang Sirius 25 kali lebih terang dari Matahari kita.",
  "🌌 Di Bima Sakti, ada sekitar 100-400 miliar bintang.",
  "⭐ Inti bintang bisa mencapai suhu 15 juta derajat Celsius.",
  "🌠 Bintang neutron memiliki massa lebih besar dari Matahari dalam ukuran kota kecil!",
  "✨ Bintang yang 'jatuh' (meteor) sebenarnya bukan bintang, melainkan batuan luar angkasa.",
  "🔴 Bintang merah lebih tua dan lebih dingin dari bintang biru muda.",
];

// Fungsi menampilkan fakta acak saat tombol diklik
function tampilkanFakta() {
  // Math.random() → angka acak antara 0 sampai 1
  // Math.floor() → membulatkan ke bawah
  // Dikali panjang array → dapat indeks acak
  let indeksAcak = Math.floor(Math.random() * daftarFakta.length);

  // Ambil fakta berdasarkan indeks acak
  let faktaTerpilih = daftarFakta[indeksAcak];

  // Tampilkan fakta dalam alert popup (Modul 4: Alert)
  alert("✨ FAKTA BINTANG HARI INI\n\n" + faktaTerpilih);
}


// ---- 4. EVENT LISTENER PADA MEDIA (Modul 7: JavaScript Event) ----

// addEventListener mendengarkan event "click" pada elemen video
// Saat video di-klik, akan muncul alert
let elemenVideo = document.getElementById("videoCard");
if (elemenVideo) {
  // Event listener: fungsi yang jalan saat event terjadi
  elemenVideo.addEventListener("click", function video() {
    // Alert popup saat video diklik
    alert("🎬 Ini adalah video demonstrasi galaksi.\nNikmati keindahan alam semesta! 🌌");
  });
}

// addEventListener pada elemen audio
let elemenAudio = document.getElementById("audioCard");
if (elemenAudio) {
  elemenAudio.addEventListener("click", function audio() {
    alert("🎵 Ini adalah audio demonstrasi.\nBayangkan suara kosmik dari luar angkasa! 🔊");
  });
}


// ---- 5. ANIMASI BINTANG BERTEBARAN DI BACKGROUND (JavaScript Canvas) ----

// Mengambil elemen canvas dari HTML
let canvas = document.getElementById("starCanvas");

// Mengambil context 2D untuk menggambar di canvas
let ctx = canvas.getContext("2d");

// Array untuk menyimpan semua bintang
let stars = [];

// Jumlah bintang yang akan dibuat
let jumlahBintang = 200;

// Fungsi untuk menyesuaikan ukuran canvas dengan ukuran jendela browser
function aturUkuranCanvas() {
  canvas.width  = window.innerWidth;   // Lebar canvas = lebar jendela
  canvas.height = window.innerHeight;  // Tinggi canvas = tinggi jendela
}

// Panggil fungsi ini pertama kali saat halaman dimuat
aturUkuranCanvas();

// Jalankan lagi setiap kali ukuran jendela berubah (responsive)
window.addEventListener("resize", aturUkuranCanvas);


// Fungsi membuat bintang dengan posisi, ukuran, dan kecepatan kedip acak
function buatBintang() {
  return {
    x: Math.random() * canvas.width,         // Posisi horizontal acak
    y: Math.random() * canvas.height,        // Posisi vertikal acak
    radius: Math.random() * 1.5 + 0.3,       // Ukuran bintang: 0.3 - 1.8 px
    opacity: Math.random(),                   // Tingkat transparansi acak
    kecepatan: Math.random() * 0.008 + 0.002, // Kecepatan kedip
    fase: Math.random() * Math.PI * 2        // Fase awal kedip (agar tidak sinkron)
  };
}

// Membuat semua bintang dan menyimpannya dalam array
for (let i = 0; i < jumlahBintang; i++) {
  stars.push(buatBintang());
}

// Waktu untuk animasi kedip
let waktu = 0;

// Fungsi animasi — berjalan terus menerus dengan requestAnimationFrame
function animasiBintang() {
  // Hapus semua gambar sebelumnya di canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar setiap bintang
  stars.forEach(function(bintang) {
    // Hitung opacity dengan fungsi sinus → efek kedip halus
    let opacitySekarang = 0.3 + 0.7 * Math.abs(Math.sin(waktu * bintang.kecepatan + bintang.fase));

    // Mulai menggambar
    ctx.beginPath();

    // Gambar lingkaran kecil sebagai bintang
    ctx.arc(bintang.x, bintang.y, bintang.radius, 0, Math.PI * 2);

    // Warna bintang: putih dengan opacity yang berkedip
    ctx.fillStyle = `rgba(200, 220, 255, ${opacitySekarang})`;
    ctx.fill();

    // Efek glow pada bintang yang lebih besar
    if (bintang.radius > 1) {
      ctx.beginPath();
      ctx.arc(bintang.x, bintang.y, bintang.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 180, 255, ${opacitySekarang * 0.15})`;
      ctx.fill();
    }
  });

  // Tambah waktu untuk animasi berikutnya
  waktu++;

  // Panggil fungsi ini lagi di frame berikutnya → animasi berjalan terus
  requestAnimationFrame(animasiBintang);
}

// Mulai animasi bintang
animasiBintang();


// ---- 6. ANIMASI SCROLL REVEAL (JavaScript DOM) ----

// Mengambil semua elemen dengan class "section"
let semuaSection = document.querySelectorAll(".section");

// IntersectionObserver: mendeteksi kapan elemen terlihat di layar
let observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    // Jika elemen terlihat di viewport (layar)
    if (entry.isIntersecting) {
      // Tambahkan class visible → trigger animasi CSS
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 }); // Trigger saat 10% elemen terlihat

// Daftarkan setiap section untuk diobservasi
semuaSection.forEach(function(section) {
  // Atur opacity awal → akan diubah saat visible
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(section);
});

// Ketika class "visible" ditambahkan → elemen muncul
document.addEventListener("DOMContentLoaded", function() {
  // Menggunakan MutationObserver untuk mendeteksi perubahan class
  let mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.classList.contains("visible")) {
        mutation.target.style.opacity = "1";
        mutation.target.style.transform = "translateY(0)";
      }
    });
  });

  semuaSection.forEach(function(section) {
    mutationObserver.observe(section, { attributes: true, attributeFilter: ["class"] });
  });
});