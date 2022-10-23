const MusicCards = [];

var MusicCardArrs = "";

const handleMusicFetchAgain = async () => {
  try {
    const res = await fetch("/music/fetch", {
      method: "POST",
      body: JSON.stringify({
        loadded: "Page loaded",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    let MusicArr = "";

    if (data.music) {
      MusicArr = data.music;
      MusicCardArrs = MusicArr;
    }

    if (MusicArr.length > 0) {
      MusicArr.forEach((music, key) => {
        MusicCards.push({
          name: music.title,
          artist: music.artist,
          url: `files/${music.filename}`,
          cover: findAlbumArt(key),
        });
      });

      const ap = new APlayer({
        container: document.getElementById("aplayer"),
        listFolded: true,
        audio: MusicCards,
      });

      $(".music-card").on("click", function (e) {
        var dataSwitchId = $(this).attr("data-switch");

        ap.list.switch(dataSwitchId);

        ap.play();

        $("#aplayer").addClass("showPlayer");
      });
    }
  } catch (error) {
    let err = error;
  }
};

handleMusicFetchAgain();

function findAlbumArt(key) {
  let album = "";

  const musicCards = [
    ...document.querySelectorAll("section.sec-2 .music-cards .music-card"),
  ];

  for (let i = 0; i < musicCards.length; i++) {
    if (key == parseInt(musicCards[i].getAttribute("data-target"))) {
      album = musicCards[i].querySelector("img").getAttribute("src");
    }
  }

  return album;
}
