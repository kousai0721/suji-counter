import React, { useState } from "react";
import "./App.css";
import manzuImage from "./assets/manzu.png";
import pinzuImage from "./assets/pinzu.png";
import sozuImage from "./assets/sozu.png";

const SujiCounter = () => {
  const sujiGroups = [
    {
      type: "萬子",
      values: ["1-4", "2-5", "3-6", "4-7", "5-8", "6-9"],
      image: manzuImage,
    },
    {
      type: "筒子",
      values: ["1-4", "2-5", "3-6", "4-7", "5-8", "6-9"],
      image: pinzuImage,
    },
    {
      type: "索子",
      values: ["1-4", "2-5", "3-6", "4-7", "5-8", "6-9"],
      image: sozuImage,
    },
  ];

  const totalSuji = sujiGroups.reduce(
    (acc, group) => acc + group.values.length,
    0
  ); // 全筋の数（18本）
  const [selectedSuji, setSelectedSuji] = useState({
    萬子: [],
    筒子: [],
    索子: [],
  });
  const [isCenterActive, setIsCenterActive] = useState(false); // 真ん中ボタンの状態

  // 選択された筋の数を計算
  const getSelectedCount = () => {
    return Object.values(selectedSuji).reduce(
      (total, group) => total + group.length,
      0
    );
  };

  const toggleSuji = (type, suji) => {
    setSelectedSuji((prev) => ({
      ...prev,
      [type]: prev[type].includes(suji)
        ? prev[type].filter((item) => item !== suji) // 選択解除
        : [...prev[type], suji], // 選択追加
    }));
  };

  // 全ての選択状態をリセット
  const resetSuji = () => {
    setSelectedSuji({
      萬子: [],
      筒子: [],
      索子: [],
    });
    setIsCenterActive(false); // 真ん中ボタンもリセット
  };

  const selectedCount = getSelectedCount(); // 現在選択されている筋の数
  const numerator = isCenterActive ? 2 : 1; // 真ん中ボタンで分子を切り替え
  const remainingSuji = totalSuji - selectedCount; // 残りの筋の数
  const probability = (numerator / remainingSuji) * 100; // 確率計算

  return (
    <div className="container">
      <h1>筋カウンター</h1>
      <p>
        現在の確率: {numerator}/{remainingSuji} ({probability.toFixed(2)}%)
      </p>
      <button
        className={`center-button ${isCenterActive ? "active" : ""}`}
        onClick={() => setIsCenterActive(!isCenterActive)}
      >
        中筋ボタン（456）
      </button>
      <button className="reset-button" onClick={resetSuji}>
        リセット
      </button>
      {sujiGroups.map((group, index) => (
        <div key={index} className="group">
          <h2 className="title-with-image">
            <img src={group.image} alt={group.type} className="group-icon" />
            {group.type}
          </h2>
          <div className="button-grid">
            {group.values.map((suji, idx) => (
              <button
                key={idx}
                className={`suji-button ${
                  selectedSuji[group.type].includes(suji) ? "selected" : ""
                }`}
                onClick={() => toggleSuji(group.type, suji)}
              >
                {suji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SujiCounter;
