(() => {
  const shots = [
    { src: "./site/assets/shot-01-frost.png", caption: "暴风雪逐塔积雪 · 燧火暖区融雪护塔与天气化学联动" },
    { src: "./site/assets/shot-02-mine.png", caption: "弃采矿道风沙激战 · 十塔齐射与迎面运矿车破阵" },
    { src: "./site/assets/shot-03-mire.png", caption: "瘴雾毒沼三路防线 · 回流闸与沼泽信标机关联动" },
    { src: "./site/assets/shot-04-atlas.png", caption: "炮塔图谱一览 · 16 座防御建筑与 32 条四级专精分支" },
    { src: "./site/assets/shot-05-map.png", caption: "五大生态 18 关手绘像素大地图与主线闯关推进" },
    { src: "./site/assets/shot-06-talents.png", caption: "营地微光加护 · 6 条星辉天赋路线随时免费重置" },
  ];

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  let current = 0;

  function showShot(index) {
    current = (index + shots.length) % shots.length;
    const item = shots[current];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = `${current + 1} / ${shots.length} · ${item.caption}`;
    if (!lightbox.open) lightbox.showModal();
  }

  document.querySelectorAll(".shot-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-shot") || "0");
      showShot(index);
    });
  });

  lightboxClose?.addEventListener("click", () => lightbox.close());
  lightboxPrev?.addEventListener("click", () => showShot(current - 1));
  lightboxNext?.addEventListener("click", () => showShot(current + 1));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  window.addEventListener("keydown", (event) => {
    if (!lightbox?.open) return;
    if (event.key === "ArrowLeft") showShot(current - 1);
    if (event.key === "ArrowRight") showShot(current + 1);
  });

  const qrModal = document.getElementById("qr-modal");
  const qrClose = document.getElementById("qr-modal-close");
  for (const id of ["hero-qr-trigger", "download-qr-trigger"]) {
    document.getElementById(id)?.addEventListener("click", () => {
      if (!qrModal.open) qrModal.showModal();
    });
  }
  qrClose?.addEventListener("click", () => qrModal.close());
  qrModal?.addEventListener("click", (event) => {
    if (event.target === qrModal) qrModal.close();
  });

  const copyBtn = document.getElementById("copy-sha256");
  const hashEl = document.getElementById("apk-sha256");
  copyBtn?.addEventListener("click", async () => {
    const text = hashEl?.textContent?.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "已复制";
      window.setTimeout(() => {
        copyBtn.textContent = "复制";
      }, 1800);
    } catch {
      copyBtn.textContent = "复制失败";
    }
  });

  const showcaseVideo = document.getElementById("showcase-video");
  const chapterButtons = Array.from(document.querySelectorAll(".chapter-btn"));
  if (showcaseVideo && chapterButtons.length) {
    const chapters = chapterButtons.map((btn) => ({
      btn,
      time: Number(btn.getAttribute("data-seek") || "0"),
    }));
    const setActiveChapter = (activeBtn) => {
      for (const { btn } of chapters) btn.classList.toggle("is-active", btn === activeBtn);
    };
    for (const { btn, time } of chapters) {
      btn.addEventListener("click", () => {
        showcaseVideo.currentTime = time;
        setActiveChapter(btn);
        void showcaseVideo.play().catch(() => {});
      });
    }
    showcaseVideo.addEventListener("timeupdate", () => {
      const t = showcaseVideo.currentTime;
      let currentChapter = chapters[0];
      for (const item of chapters) {
        if (t + 0.15 >= item.time) currentChapter = item;
      }
      setActiveChapter(currentChapter.btn);
    });
  }
})();
