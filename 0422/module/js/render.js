// 受け取った引数を<li></li>の形にして生成して戻す関数の定義
function createWorkItem(work) {
    return `<li>${work.title} / ${work.category}</li>`;
}