import './style.css';
import { animate, inView } from 'motion';
//3つのAPIを取得
import { getPokemon, getSpecies, loadJpDict } from "./api.js";
import { renderPokemon, showError, setLoading } from './view.js';

animate(document.querySelector('.spinner'), { rotate: [0, 360] }, { duration: 1, repeat: Infinity, ease: 'linear' });

let controller;

const load = async (name) => {
  if (controller) controller.abort();
  controller = new AbortController();

  setLoading(true);

  try {
    // 1. 日本語入力なら辞書でIDに変換、それ以外はそのまま使う
    const dict = await loadJpDict();
    //null合体演算子
    const query = dict[name] ?? name.toLowerCase();

    // 2. ★ 2つのAPIを並行取得
    const [pokemon, species] = await Promise.all([
      getPokemon(query, controller.signal),
      getSpecies(query, controller.signal),
    ]);

    // 3. species から日本語名を取り出して renderPokemon に渡す
    const jpName = species.names.find((n) => n.language.name === "ja")?.name;
    renderPokemon(pokemon, jpName);

    const card = document.querySelector('.card');
    if (card) {
      animate(
        card,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, ease: 'ease-out' }
      );
    }

  } catch (err) {
    if (err.name === 'AbortError') return;
    console.error(err);
    showError('見つかりませんでした');
  } finally {
    setLoading(false);
  }
};

document.querySelector('#searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  load(document.querySelector("#keyword").value.trim());
});
