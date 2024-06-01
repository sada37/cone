"use strict";

/* ---------- ハンバーガーメニューの実装
・背景のスクロール固定
・画面幅が変わると閉じる
・ブレイクポイントでtransitionが効かないよう設定
・フリック操作で一定の量右から左に動かすと閉じるよう設定
----------- */
{
  // ハンバーガーを開く時に使うボタン、ナビリスト、背景、ボタンのテキストの取得
  const gnavBg = document.querySelector(".l-gnav-bg");
  const gnavList = document.querySelector(".l-gnav-list");
  const gnavButton = document.querySelector(".l-gnav-button");
  const gnavButtonText = document.querySelector(".l-gnav-button-text");
  // ボタンの三本線の取得
  const lineTop = document.querySelector(".l-icon-line-top");
  const lineMiddle = document.querySelector(".l-icon-line-middle");
  const lineBottom = document.querySelector(".l-icon-line-bottom");
  // 背景のスクロールを停止させるためにbody要素の取得
  const body = document.querySelector("body");

  const fullWidth = window.innerWidth;
  const inWidth = document.documentElement.clientWidth;
  const scrollBarWidth = fullWidth - inWidth;

  let currentScrollY = 0;
  currentScrollY = body.getBoundingClientRect().top;
  window.addEventListener("scroll", () => {
    currentScrollY = body.getBoundingClientRect().top;
  });

  // ナビリストと背景にtransitionを設定する関数を宣言
  function transitionIn() {
    gnavBg.style.transitionDuration = "0.5s";
    gnavList.style.transitionDuration = "0.5s";
  }
  //ナビリストと背景からtransitionを外す関数を宣言
  function transitionOut() {
    gnavBg.style.transitionDuration = "0s";
    gnavList.style.transitionDuration = "0s";
  }
  // ボタンのテキストをメニューに変える関数を宣言
  function textChangeMenu() {
    gnavButtonText.textContent = "メニュー";
  }

  /* ボタンを押すたび、背景とナビリストの出現切り替え */
  gnavButton.addEventListener("click", () => {
    // transitionを設定
    transitionIn();
    // 背景とナビリストの出現する動きと背景のスクロール固定の切り替え
    gnavBg.classList.toggle("l-gnav--active-bg");
    gnavList.classList.toggle("l-gnav-list--active");
    body.style.position = "fixed";
    body.style.top = `${currentScrollY}px`;
    body.style.right = 0;
    body.style.left = 0;
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }
    // ボタンの三本線をバツと切り替え
    lineTop.classList.toggle("l-icon-line-top--active");
    lineMiddle.classList.toggle("l-icon-line-middle--active");
    lineBottom.classList.toggle("l-icon-line-bottom--active");
    // ボタンのテキストを「メニュー」と「閉じる」に切り替え
    if (gnavButtonText.textContent === "メニュー") {
      gnavButtonText.textContent = "閉じる";
    } else {
      textChangeMenu();
      body.style.position = "";
      body.style.paddingRight = 0;
      window.scrollTo(0, currentScrollY * -1);
    }

    // gnavListのtransitionが終わったらtransitionを0sにする
    gnavList.addEventListener("transitionend", () => {
      transitionOut();
    });
  });

  // 画面幅が変わった時とスマホのフリック操作で閉じるように各クラスを除外する関数の宣言
  function removeClass() {
    gnavBg.classList.remove("l-gnav--active-bg");
    gnavList.classList.remove("l-gnav-list--active");
    lineTop.classList.remove("l-icon-line-top--active");
    lineMiddle.classList.remove("l-icon-line-middle--active");
    lineBottom.classList.remove("l-icon-line-bottom--active");
  }

  const mediaQuery = window.matchMedia('(min-width: 1024px)');
  function listener(event){
    if (event.matches) {
      removeClass();
    transitionOut();
    body.style.position = "";
    body.style.paddingRight = 0;
    window.scrollTo(0, currentScrollY * -1);
    textChangeMenu();
    }
  };
    mediaQuery.addEventListener("change", listener);
    listener(mediaQuery);
  /* スマホ時にフリック操作で左からか右にある程度操作すると閉じる動きの実装 */

  // タッチ時とタッチしている間のX座標を入れておく変数の宣言
  let startX = 0;
  let nowX = 0;

  //gnav-listをタッチしたときのX座標を変数startXに代入
  gnavList.addEventListener("touchstart", (start) => {
    startX = start.touches[0].pageX;
  });

  //gnav-listをタッチしてから右に80pxタッチしつづけたらナビを閉じる
  gnavList.addEventListener("touchmove", (now) => {
    //現在のX座標の取得
    nowX = now.changedTouches[0].pageX;

    // もし現在のX座標からタッチ時のX座標を引いて80px以上になったら閉じる
    if (startX - nowX > 80) {
      transitionIn();
      removeClass();
      body.style.position = "";
      body.style.paddingRight = 0;
      window.scrollTo(0, currentScrollY * -1);
      textChangeMenu();
      gnavBg.addEventListener("transitionend", () => {
        transitionOut();
      });
    }
  });
  // ハンバーガーメニュー実装終わり
}

{
  //header
  const header = document.querySelector(".js-header");
  window.addEventListener("scroll", (event) => {
    if (window.scrollY > 400) {
      header.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
    }
  });
}

{
  const sections = document.querySelectorAll(".js-section-animation");

  function sectionFunc(section, obs) {
    if (section[0].isIntersecting) {
      section[0].target.animate(
        {
          opacity: [0, 1],
        },
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-out",
        }
      );
      obs.unobserve(section[0].target);
    }
  }

  sections.forEach((section) => {
    section.style.opacity = 0;
    const sectionOb = new IntersectionObserver(sectionFunc, {
      threshold: 0.7,
    });
    sectionOb.observe(section);
  });
}
