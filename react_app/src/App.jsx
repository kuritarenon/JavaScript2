import { useState } from "react";
import Greeting from "./components/Greeting.jsx";
// コンポーネントの宣言
import ColorCircle from "./components/ColorCircle.jsx";

export default function App() {
  // 状態を持つ
  const [color, setColor] = useState("red");

  return (
    // インスタンス
    <main>
      <button onClick={() => setColor("red")}>赤</button>
      <button onClick={() => setColor("blue")}>青</button>
      <button onClick={() => setColor("green")}>緑</button>
      {/* propsなので、ColorCircleに引かれる */}
      <ColorCircle color={color} />
    </main>
  )

}

// 条件分岐
// JSXの中では、if文が使えない。for文も使えない。
// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   return (
//     <main>
//       <h1>マイページ</h1>
//       {/* 論理演算子（かつ、and） */}
//       {/* 左側trueだったら、右側の値が表示される特性を活かした書き方 */}
//       {/* {isLoggedIn && <p>ようこそ！</p>} */}
//       {/* 三項演算子、条件演算子　A?B：C　A　がtrueだったらB、falseだったらC */}
//       {isLoggedIn ? <p>ようこそ！</p> : <p>ログインしてください</p>}

//     </main>
//   );
// }

// useStateを使う
// export default function App() {
//   // 分割代入
//   // useState()は初期値なので、最初はcountに0が入っている
//   // setCountっていうのは、countの値を変更したい時に変数の代入として入れる
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>カウント：{count}</p>
//       {/* setCountの値を変化させるとcountが変わる */}
//       {/* onClickとは */}
//       <button onClick={() => setCount(count + 1)}>+1</button>
//     </div>
//   );
// }

// 新しいApp宣言（大文字なので、コンポーネント）
// export default function App() {
//   return (
//     <main>
//       {/* nameが関数で言う引数だけど、コンポーネントのときはpropと呼ぶ。 */}
//       <Greeting name="太郎" />
//       <Greeting name="花子" />
//       <Greeting name="次郎" />
//     </main>
//   );
// }

/* export default function App() {
  //変数nameを作る
  const name = "太郎";

  // すでにjsx
  // jsxは一つの要素しか返せない
  return (
    <>
      <h1>タイトル</h1>
      <p>本文</p>
    </>
  );
} */
