// miniprogram/pages/login/login.js

const db = wx.cloud.database().collection('loginCode');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /** input出差呢查询码*/
  getPassword: function (e) {
    var value = e.detail.value;
    this.setData({
      password: value,
    });
    console.log("密码更新" + value);

  },
  /**登录到查询系统 */
  loginAction: function () {
    var passwords = this.data.password;
    var that = this;
    if (passwords == "") {
      wx.showModal({
        title: "提示",
        content: "查询码不能为空",
        showCancel: false,
        curation: 1000,
        mask: true
      })
      return
    }
    else {
      db.where({ code: passwords }).get().then(res => {
        console.log(res.data);
        if (res.data.length == 1) {
          console.log("跳转至查询页");
          wx.redirectTo({
            url: '/pages/grades/grades',
          })
        } else {
          console.log("查询码无效");
          wx.showModal({
            title: "提示",
            content: "查询码无效",
            showCancel: false,
            curation: 1000,
            mask: true
          })
        }
      });
      // db.where({ code: passwords }).get({
      //   success(res) {
      //     console.log(res.data);
      //     console.log(123123)
      //     if (passwords == res.data[0].code) {
      //       console.log("跳转至查询页");
      //       wx.redirectTo({
      //         url: '/pages/grades/grades',
      //       })
      //     }
      //     console.log(1)
      //     if (passwords != res.data[0].code) {
      //       console.log("查询码无效");
      //       wx.showModal({
      //         title: "提示",
      //         content: "查询码无效",
      //         showCancel: false,
      //         curation: 1000,
      //         mask: true
      //       })
      //     }
      //   }
      // });
    }
  }
})
