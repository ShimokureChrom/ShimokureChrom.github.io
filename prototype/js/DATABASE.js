const database = {
  data_0: {
    name: "おいしい天然の水",
    manufacturer: "アサシ飲料",
    limit: "2022/12/31",
    allergy: [],
    coupon: ["10%OFF!", "ポイント2倍進呈！"]
  },
  data_1: {
    name: "厚皮クリームパン",
    manufacturer: "ヤマギシパン",
    limit: "2021/12/15",
    allergy: ["小麦", "卵", "乳成分", "大豆"],
    coupon: ["3つ購入で198円！", "10円引き（モバイルクーポン）"]
  },
  data_2: {
    name: "炭火焼き鳥　皮串（たれ）",
    manufacturer: "トッピングバリュー",
    limit: "2022/11/5",
    allergy: ["小麦", "大豆", "鶏肉", "卵"],
    coupon: ["新商品！", "ポイント5倍！"]
  }
};

const user_datas = [
  {
    name: "user_0",
    password: "",
    coupon: {
      display: false
    },
    allergy: {
      display: false
    }
  },
  {
    name: "user1",
    password: "pass",
    coupon: {
      display: true
    },
    allergy: {
      display: true,
      items: ["小麦", "卵", "乳成分"]
    }
  },
  {
    name: "user2",
    password: "ぱすわーど",
    coupon: {
      display: false
    },
    allergy: {
      display: true,
      items: ["卵", "鶏肉"]
    }
  }
];
