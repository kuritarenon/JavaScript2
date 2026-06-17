// main.js
import { animate, inView, stagger } from 'motion';
import { vote, getRates, resetCandidates } from './candidates';
//ここに入っているのは関数名＝関数の定義、ということは関数の実行が必要
// 全カードのバーを得票率に合わせてアニメーションさせる
const animateBars = () => {
  getRates().forEach(({ id, rate }) => {
    const bar = document.querySelector(`[data-id="${id}"] .bar`);
    animate(bar, { width: `${rate}%` }, { duration: 0.4, easing: 'ease-out' });
  });
};

document.querySelectorAll('.card').forEach((card) => {
  const id = Number(card.dataset.id);
  const btn = card.querySelector('.vote-btn');

  btn.addEventListener('click', () => {
    vote(id);
    animate(btn, { scale: [1, 1.3, 1] }, { duration: 0.3 });
    animateBars();
  });
});

animate('.card', { opacity: 0, y: 40 });

inView('#voteList', () => {
  animate(
    '.card',
    {
      opacity: [0, 1],
      y: [40, 0]
    },
    {
      duration: 0.5,
      delay: stagger(0.2),
      easing: 'ease-out'
    }
  );
});

inView('.voteList', () => {
  animate('.card', { opacity: [0, 1], y: [40, 0] }, { duration: 0.1, delay: stagger(2) });
});

// ⬇ 末尾に追加
const resetButton = document.querySelector("#resetBtn");
resetButton.addEventListener("click", () => {
  //confirmをキャンセルしたら、returnするとその下のプログラムは走らない
  if (!confirm("票数をリセットしますか？")) return;
  resetCandidates();
  animateBars();          // ← リセット後にバーも初期状態へ戻す
});

// ⬇ 末尾に追加：起動時に、読み込んだ得票率でバーを描画する
animateBars();
