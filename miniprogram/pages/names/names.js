wx.cloud.init()
const db = wx.cloud.database()
var util = require('../../utils/util.js')
// pages/names/names.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_name: "",
    _id: "",
  },

  ready: function () {
    if (this.data.company_name !== "") {
      //TODO: 如果已经有重复名字的，查询数据库 (不确定是否要增加这一个功能)
      // 如果没有再创建新的库
      let time = util.formatTime(new Date())
      db.collection('CompanyGrades').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          Company_Name: this.data.company_name,
          grade: 0,
          time: time,
          Answer: [{ "count": 1, "type": "FR", "choice": -1, "ans": "" }, { "count": 2, "type": "FR", "choice": -1, "ans": "" }, { "count": 3, "type": "FR", "choice": -1, "ans": "" }, { "count": 4, "type": "FR", "choice": -1, "ans": "" }, { "count": 5, "type": "FR", "choice": -1, "ans": "" }, { "count": 6, "type": "FR", "choice": -1, "ans": "" }, { "count": 7, "type": "FR", "choice": -1, "ans": "" }, { "count": 8, "type": "FR", "choice": -1, "ans": "" }, { "count": 9, "type": "TF", "choice": -1, "ans": "None" }, { "count": 10, "type": "TF", "choice": -1, "ans": "None" }, { "count": 11, "type": "TF", "choice": -1, "ans": "None" }, { "count": 12, "type": "TF", "choice": -1, "ans": "None" }, { "count": 13, "type": "TF", "choice": -1, "ans": "None" }, { "count": 14, "type": "TF", "choice": -1, "ans": "None" }, { "count": 15, "type": "TF", "choice": -1, "ans": "None" }, { "count": 16, "type": "FR", "choice": -1, "ans": "" }, { "count": 17, "type": "FR", "choice": -1, "ans": "" }, { "count": 18, "type": "FR", "choice": -1, "ans": "" }, { "count": 19, "type": "TF", "choice": -1, "ans": "None" }, { "count": 20, "type": "FR", "choice": -1, "ans": "" }, { "count": 21, "type": "FR", "choice": -1, "ans": "" }, { "count": 22, "type": "FR", "choice": -1, "ans": "" }, { "count": 23, "type": "FR", "choice": -1, "ans": "" }, { "count": 24, "type": "FR", "choice": -1, "ans": "" }, { "count": 25, "type": "FR", "choice": -1, "ans": "" }, { "count": 26, "type": "FR", "choice": -1, "ans": "" }, { "count": 27, "type": "FR", "choice": -1, "ans": "" }, { "count": 28, "type": "FR", "choice": -1, "ans": "" }, { "count": 29, "type": "FR", "choice": -1, "ans": "" }, { "count": 30, "type": "FR", "choice": -1, "ans": "" }, { "count": 31, "type": "FR", "choice": -1, "ans": "" }, { "count": 32, "type": "FR", "choice": -1, "ans": "" }, { "count": 33, "type": "TF", "choice": -1, "ans": "None" }, { "count": 34, "type": "FR", "choice": -1, "ans": "" }, { "count": 35, "type": "FR", "choice": -1, "ans": "" }, { "count": 36, "type": "FR", "choice": -1, "ans": "" }, { "count": 37, "type": "FR", "choice": -1, "ans": "" }, { "count": 38, "type": "FR", "choice": -1, "ans": "" }, { "count": 39, "type": "FR", "choice": -1, "ans": "" }, { "count": 40, "type": "FR", "choice": -1, "ans": "" }, { "count": 41, "type": "FR", "choice": -1, "ans": "" }, { "count": 42, "type": "FR", "choice": -1, "ans": "" }, { "count": 43, "type": "FR", "choice": -1, "ans": "" }, { "count": 44, "type": "FR", "choice": -1, "ans": "" }, { "count": 45, "type": "FR", "choice": -1, "ans": "" }, { "count": 46, "type": "FR", "choice": -1, "ans": "" }, { "count": 47, "type": "TF", "choice": -1, "ans": "None" }, { "count": 48, "type": "TF", "choice": -1, "ans": "None" }, { "count": 49, "type": "TF", "choice": -1, "ans": "None" }, { "count": 50, "type": "FR", "choice": -1, "ans": "" }, { "count": 51, "type": "FR", "choice": -1, "ans": "" }, { "count": 52, "type": "FR", "choice": -1, "ans": "" }, { "count": 53, "type": "FR", "choice": -1, "ans": "" }, { "count": 54, "type": "FR", "choice": -1, "ans": "" }, { "count": 55, "type": "FR", "choice": -1, "ans": "" }, { "count": 56, "type": "FR", "choice": -1, "ans": "" }, { "count": 57, "type": "FR", "choice": -1, "ans": "" }, { "count": 58, "type": "FR", "choice": -1, "ans": "" }, { "count": 59, "type": "TF", "choice": -1, "ans": "None" }, { "count": 60, "type": "FR", "choice": -1, "ans": "" }, { "count": 61, "type": "FR", "choice": -1, "ans": "" }, { "count": 62, "type": "TF", "choice": -1, "ans": "None" }, { "count": 63, "type": "FR", "choice": -1, "ans": "" }, { "count": 64, "type": "FR", "choice": -1, "ans": "" }, { "count": 65, "type": "FR", "choice": -1, "ans": "" }, { "count": 66, "type": "FR", "choice": -1, "ans": "" }, { "count": 67, "type": "FR", "choice": -1, "ans": "" }, { "count": 68, "type": "FR", "choice": -1, "ans": "" }, { "count": 69, "type": "FR", "choice": -1, "ans": "" }, { "count": 70, "type": "FR", "choice": -1, "ans": "" }, { "count": 71, "type": "TF", "choice": -1, "ans": "None" }, { "count": 72, "type": "TF", "choice": -1, "ans": "None" }, { "count": 73, "type": "TF", "choice": -1, "ans": "None" }, { "count": 74, "type": "TF", "choice": -1, "ans": "None" }, { "count": 75, "type": "TF", "choice": -1, "ans": "None" }, { "count": 76, "type": "FR", "choice": -1, "ans": "" }, { "count": 77, "type": "FR", "choice": -1, "ans": "" }, { "count": 78, "type": "FR", "choice": -1, "ans": "" }, { "count": 79, "type": "TF", "choice": -1, "ans": "None" }, { "count": 80, "type": "TF", "choice": -1, "ans": "None" }, { "count": 81, "type": "FR", "choice": -1, "ans": "" }, { "count": 82, "type": "FR", "choice": -1, "ans": "" }, { "count": 83, "type": "FR", "choice": -1, "ans": "" }, { "count": 84, "type": "TF", "choice": -1, "ans": "None" }, { "count": 85, "type": "TF", "choice": -1, "ans": "None" }, { "count": 86, "type": "FR", "choice": -1, "ans": "" }, { "count": 87, "type": "TF", "choice": -1, "ans": "None" }, { "count": 88, "type": "TF", "choice": -1, "ans": "None" }, { "count": 89, "type": "TF", "choice": -1, "ans": "None" }, { "count": 90, "type": "TF", "choice": -1, "ans": "None" }, { "count": 91, "type": "TF", "choice": -1, "ans": "None" }, { "count": 92, "type": "TF", "choice": -1, "ans": "None" }, { "count": 93, "type": "TF", "choice": -1, "ans": "None" }, { "count": 94, "type": "TF", "choice": -1, "ans": "None" }, { "count": 95, "type": "TF", "choice": -1, "ans": "None" }, { "count": 96, "type": "TF", "choice": -1, "ans": "None" }, { "count": 97, "type": "TF", "choice": -1, "ans": "None" }, { "count": 98, "type": "TF", "choice": -1, "ans": "None" }, { "count": 99, "type": "TF", "choice": -1, "ans": "None" }, { "count": 100, "type": "TF", "choice": -1, "ans": "None" }, { "count": 101, "type": "TF", "choice": -1, "ans": "None" }, { "count": 102, "type": "TF", "choice": -1, "ans": "None" }, { "count": 103, "type": "TF", "choice": -1, "ans": "None" }, { "count": 104, "type": "TF", "choice": -1, "ans": "None" }, { "count": 105, "type": "TF", "choice": -1, "ans": "None" }, { "count": 106, "type": "TF", "choice": -1, "ans": "None" }, { "count": 107, "type": "TF", "choice": -1, "ans": "None" }, { "count": 108, "type": "TF", "choice": -1, "ans": "None" }, { "count": 109, "type": "TF", "choice": -1, "ans": "None" }, { "count": 110, "type": "TF", "choice": -1, "ans": "None" }, { "count": 111, "type": "TF", "choice": -1, "ans": "None" }, { "count": 112, "type": "TF", "choice": -1, "ans": "None" }, { "count": 113, "type": "TF", "choice": -1, "ans": "None" }, { "count": 114, "type": "TF", "choice": -1, "ans": "None" }, { "count": 115, "type": "TF", "choice": -1, "ans": "None" }, { "count": 116, "type": "TF", "choice": -1, "ans": "None" }, { "count": 117, "type": "TF", "choice": -1, "ans": "None" }, { "count": 118, "type": "TF", "choice": -1, "ans": "None" }, { "count": 119, "type": "TF", "choice": -1, "ans": "None" }, { "count": 120, "type": "TF", "choice": -1, "ans": "None" }, { "count": 121, "type": "TF", "choice": -1, "ans": "None" }, { "count": 122, "type": "TF", "choice": -1, "ans": "None" }, { "count": 123, "type": "TF", "choice": -1, "ans": "None" }, { "count": 124, "type": "TF", "choice": -1, "ans": "None" }, { "count": 125, "type": "TF", "choice": -1, "ans": "None" }, { "count": 126, "type": "TF", "choice": -1, "ans": "None" }, { "count": 127, "type": "TF", "choice": -1, "ans": "None" }, { "count": 128, "type": "TF", "choice": -1, "ans": "None" }, { "count": 129, "type": "TF", "choice": -1, "ans": "None" }, { "count": 130, "type": "TF", "choice": -1, "ans": "None" }, { "count": 131, "type": "TF", "choice": -1, "ans": "None" }, { "count": 132, "type": "TF", "choice": -1, "ans": "None" }, { "count": 133, "type": "TF", "choice": -1, "ans": "None" }, { "count": 134, "type": "TF", "choice": -1, "ans": "None" }, { "count": 135, "type": "TF", "choice": -1, "ans": "None" }, { "count": 136, "type": "TF", "choice": -1, "ans": "None" }, { "count": 137, "type": "TF", "choice": -1, "ans": "None" }, { "count": 138, "type": "TF", "choice": -1, "ans": "None" }, { "count": 139, "type": "TF", "choice": -1, "ans": "None" }, { "count": 140, "type": "TF", "choice": -1, "ans": "None" }, { "count": 141, "type": "TF", "choice": -1, "ans": "None" }, { "count": 142, "type": "TF", "choice": -1, "ans": "None" }, { "count": 143, "type": "TF", "choice": -1, "ans": "None" }, { "count": 144, "type": "TF", "choice": -1, "ans": "None" }, { "count": 145, "type": "TF", "choice": -1, "ans": "None" }, { "count": 146, "type": "TF", "choice": -1, "ans": "None" }, { "count": 147, "type": "TF", "choice": -1, "ans": "None" }, { "count": 148, "type": "TF", "choice": -1, "ans": "None" }, { "count": 149, "type": "TF", "choice": -1, "ans": "None" }, { "count": 150, "type": "TF", "choice": -1, "ans": "None" }, { "count": 151, "type": "TF", "choice": -1, "ans": "None" }, { "count": 152, "type": "TF", "choice": -1, "ans": "None" }, { "count": 153, "type": "TF", "choice": -1, "ans": "None" }, { "count": 154, "type": "TF", "choice": -1, "ans": "None" }, { "count": 155, "type": "TF", "choice": -1, "ans": "None" }, { "count": 156, "type": "TF", "choice": -1, "ans": "None" }, { "count": 157, "type": "TF", "choice": -1, "ans": "None" }, { "count": 158, "type": "TF", "choice": -1, "ans": "None" }, { "count": 159, "type": "TF", "choice": -1, "ans": "None" }]
        }
      }).then(res => {
        this.setData({
          _id : res._id
        })
        console.log(this.data._id)
        //跳转到下一页面
        wx.navigateTo({
          url: '/pages/exam/exam?id=' + this.data._id,
        })
      })
    }
  },
  //FR题答案记录
  name_input: function (e) {
    this.setData({
      company_name: e.detail.value
    })
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

  }
})