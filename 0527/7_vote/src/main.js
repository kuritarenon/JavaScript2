// main.js
import { animate, inView, stagger } from 'motion';
import { vote, getRates } from './candidates';

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
