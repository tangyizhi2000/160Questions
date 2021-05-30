// pages/singleGradesResult/singleGradesResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    percentage: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    wx.cloud.callFunction({
      name: "searchGradeByID",
      data: { id: id }
    }).then(res => {
      this.setData({
        data: res.result.data[0],
        percentage: (res.result.data[0].grade / 159 * 100).toFixed(2),
      })
      
    })
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

  }
})