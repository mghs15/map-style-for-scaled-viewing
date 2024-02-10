# map-style-for-scaled-viewing
拡大・縮小した地図に合わせて文字サイズ・線幅を調整したスタイル

Mapbox Style Spec/MapLibre Style Spec 用です。

## 変換ツール

`convert.js` が変換ツールです。変換元・変換先の `style.json` （Mapbox Style Spec/MapLibre Style Spec 準拠）のパスはハードコードされています。

```
node convert.js
```

## デモサイト
* 拡大縮小なし https://mghs15.github.io/map-style-for-scaled-viewing/?style=org#11/37.1439/136.8506
* 文字サイズ・線幅等を2倍へ拡大 https://mghs15.github.io/map-style-for-scaled-viewing/#11/37.1439/136.8506
* 文字サイズ・線幅等を2倍へ拡大（別スタイル） https://mghs15.github.io/map-style-for-scaled-viewing/?style=basicl#11/37.1439/136.8506

## 参考
データ及びもとにしたスタイル：[国土地理院 最適化ベクトルタイル](https://github.com/gsi-cyberjapan/optimal_bvmap)



