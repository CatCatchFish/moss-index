(() => {
  const shots = [
    { src: "./site/assets/shot-01-map.png", caption: "五大区域 18 关手绘像素大地图与闯关推进" },
    { src: "./site/assets/shot-02-mire.png", caption: "第五章「泥炭孤岛」双桥登岛与毒沼攻防" },
    { src: "./site/assets/shot-03-frost.png", caption: "第四章「冰脊哨台」风雪积雪与多线布防" },
    { src: "./site/assets/shot-04-mine.png", caption: "第三章「绞盘矿廊」三层折返矿轨与迎面矿车" },
    { src: "./site/assets/shot-05-loadout.png", caption: "11 塔 + 4 拦截建筑，5 槽自由搭配出战编队" },
    { src: "./site/assets/shot-06-boss.png", caption: "首领战「凛冬麋王」寒域法阵与连点破冰" },
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
})();
