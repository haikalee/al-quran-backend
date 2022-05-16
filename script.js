class Api {
  constructor() {
    this.allSurahUrl =
      "https://al-quran-8d642.firebaseio.com/data.json?print=pretty";
    this.surah = "https://api.npoint.io/99c279bb173a6e28359c/surat";
  }

  getAllSurah() {
    return new Promise((resolve, reject) => {
      fetch(this.allSurahUrl)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  getSurah(id) {
    return new Promise((resolve, reject) => {
      fetch(this.surah + "/" + id)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

class App {
  constructor() {
    this.api = new Api();
  }

  getAllSurah() {
    this.api
      .getAllSurah()
      .then((data) => {
        data.forEach((surah) => {
          const li = this.createList(
            surah.nama,
            () => {
              this.getSurah(surah.nomor);
            },
            {
              cursor: "pointer",
            }
          );
          listSurah.appendChild(li);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getSurah(id) {
    listAyat.style.display = 'block';
    this.api
      .getSurah(id)
      .then((data) => {
        listSurah.style.display = "none";

        data.forEach((ayat) => {
          const li = this.createList(ayat.ar, null, {
            fontSize: "30px",
          });
          listAyat.appendChild(li);
        });
        listAyat.appendChild(this.createBackButton());
      })
      .catch((e) => {
        console.log(e);
      });
  }

  createList(text, clickEvent = null, style = null) {
    const li = document.createElement("li");
    if (clickEvent) {
      li.addEventListener("click", clickEvent);
    }
    if (style) {
      Object.keys(style).forEach((item) => {
        li.style[item] = style[item];
      });
    }
    li.innerHTML = text;

    return li;
  }

  createBackButton() {
    const a = document.createElement("a");
    a.href = "#";
    a.innerHTML = "Kembali";

    a.addEventListener("click", () => {
      listSurah.style.display = "block";
      listAyat.innerHTML = "";
      listAyat.style.display = "none";
    })


    return a;
  }
}

const app = new App();
const listSurah = document.getElementById("listSurah");
const listAyat = document.getElementById("listAyat");
app.getAllSurah();
