wx.cloud.init()
const db = wx.cloud.database();
let next_question = ""

// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: 'T', name: '是'},
      {value: 'F', name: '否', checked: 'true'},
    ],
    current_question_number: 0,
    current_question: "使用说明，每个问题会自动保存",
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  nextQuestion: function(){
    db.collection('160Questions').where({
      count: this.data.current_question_number + 1
    })
    .get()
    .then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        next_question = res.data[0]['question']
        console.log(next_question)
        this.setData({
          current_question_number: this.data.current_question_number + 1,
          current_question: next_question
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