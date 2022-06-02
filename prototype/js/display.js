let reader = new Vue({
  el: '#reader',
  data: {
    camera_on: false
  },
  computed: {
    instruction: function () {
      if (this.camera_on)
        return "二次元コードをカメラに映してください";
      else
        return "";
    },
    button: function () {
      if (this.camera_on)
        return "images/scan_off.png";
      else
        return "images/scan_on.png";
    }
  },
  methods: {
    click_button: function () {
      this.camera_on = !this.camera_on;
    }
  }
})

let read_data = new Vue({
  el: '#read_data',
  data: {
    qr_data: ""
  },
  updated: function () {
    default_display.update(this.qr_data);
  }
})

let default_display = new Vue({
  el: '#display',
  data: {
    display: false,
    name: "",
    manufacturer: "",
    limit: "",
    allergy: [],
    coupon: []
  },
  methods: {
    update: function (read_data) {
      const split_data = read_data.split(':')
      let data_found = true;
      if (split_data.length < 3)
        data_found &= false;
      if (split_data[0] !== "kosen-intercollege" || split_data[2] !== "from_group-E")
        data_found &= false;

      if (parseInt(split_data[1]) >= 10000000) {
        const user = parseInt(split_data[1]) - 10000000;
        if (user === 0)
          login_data.reset();
        else
          login_data.load(user)
        return;
      }

      const data = "data_" + String(parseInt(split_data[1]));
      if (!database[data])
        data_found &= false;

      if (!data_found) {
        this.display = false;
        return;
      }

      this.display = true;
      this.name = database[data].name;
      this.manufacturer = database[data].manufacturer;
      this.limit = database[data].limit;
      this.allergy = database[data].allergy;
      this.coupon = database[data].coupon;
    }
  }
})

let option_datas = {
  display: false,
  login: false,
  login_name: "user1",
  login_password: "pass",
  name: "",
  coupon: {},
  allergy: {}
}

let login_data = new Vue({
  el: '#login_display',
  data: option_datas,
  computed: {
    display_user_name: function () {
      if (this.login)
        return "「" + this.name + "」でログイン中";
      else
        return "ログインしていません";
    },
    display_button: function () {
      if (this.display)
        return "images/login_off.png";
      else
        return "images/login_on.png";
    },
    login_button: function () {
      if (this.login)
        return "ログアウト";
      else
        return "ログイン";
    },
    isCoupon: function () {
      if (this.coupon.display)
        return "クーポン：表示する"
      else
        return "クーポン：表示しない"
    }
  },
  methods: {
    click_display_button: function () {
      this.display = !this.display;
    },
    click_login_button: function () {
      this.display = false;
      if (this.login) {
        this.reset();
        return;
      }
      let user_num = -1;
      for (let i = 1; i < user_datas.length; i++)
        if (user_datas[i].name === this.login_name)
          if (user_datas[i].password === this.login_password)
            user_num = i;

      if (user_num > 0) {
        this.load(user_num);
      } else {
        alert("パスワードかユーザー名が違います！");
        this.reset();
      }
    },
    load: function (user_num) {
      const datas = user_datas[user_num];
      this.login = (user_num > 0);
      this.name = datas.name;
      this.coupon = datas.coupon;
      this.allergy = datas.allergy;
    },
    reset: function () {
      this.login_name = "";
      this.login_password = "";
      this.load(0);
    }
  }
})

let option_display = new Vue({
  el: '#option_display',
  data: option_datas,
  computed: {
    isDisplay: function () {
      return default_display.display & (this.coupon.display | this.allergy.display);
    },
    isCoupon: function () {
      let coupons = [];
      if (!this.coupon.display)
        return coupons;
      if (default_display.coupon.length <= 0)
        return coupons;

      for (const item of default_display.coupon)
        coupons.push(item);

      return coupons;
    },
    isAllergy: function () {
      let message = "";
      if (!this.allergy.display)
        return message;
      if (default_display.allergy.length <= 0)
        return message;
      if (this.allergy.items.length <= 0)
        return message;
      let warning_items = [];
      for (const item of this.allergy.items)
        for (const data of default_display.allergy)
          if (item === data)
            warning_items.push(item);

      if (warning_items.length <= 0)
        return message;

      message = "注意！この商品には";

      for (const item of warning_items)
        message += "「" + item + "」と";

      message = message.slice(0, message.length - 1) + "が含まれています！";
      return message;
    }
  },
  methods: {
  }
})

login_data.load(0);
