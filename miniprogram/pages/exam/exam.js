wx.cloud.init()
const db = wx.cloud.database()
let next_question = ""
let next_type = ""

// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //TrueFalse题Radio
    TF: [
      {value: 'T', name: '是'},
      {value: 'F', name: '否'},
      {value: '?', name: '不知道', checked: 'true'},
    ],
    //FreeResponse题Radio
    FR: [
      {value: 'T', name: '知道'},
      {value: 'F', name: '不知道', checked: 'true'},
    ],
    //目前题目题号
    current_question_number: 0,
    //目前题目本身
    current_question: "使用说明，每个问题会自动保存",
    //题目类型，TF / FR
    current_type: "",
    //FR题答案
    FR_ans: "芜湖起飞",
  },
  //TF题RadioChange
  TFChange(e) {
    console.log('TF: radio发生change事件，携带value值为：', e.detail.value)

    const TF = this.data.TF
    for (let i = 0, len = TF.length; i < len; ++i) {
      TF[i].checked = TF[i].value === e.detail.value
    }

    this.setData({
      TF
    })
  },
  //FR题RadioChange
  FRChange(e) {
    console.log('FR: radio发生change事件，携带value值为：', e.detail.value)

    const FR = this.data.FR
    for (let i = 0, len = FR.length; i < len; ++i) {
      FR[i].checked = FR[i].value === e.detail.value
    }

    this.setData({
      FR
    })
  },
  //FR题答案记录
  FRInput: function (e) {
    this.setData({
      FR_ans: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  nextQuestion: function(){
    //储存当前问题答案    


    //读取下一个问题的题目
    db.collection('160Questions').where({
      count: this.data.current_question_number + 1
    })
    .get()
    .then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        next_question = res.data[0]['question']
        next_type = res.data[0]['type']
        console.log(next_type)
        this.setData({
          current_question_number: this.data.current_question_number + 1,
          current_question: next_question,
          current_type: next_type,
          FR_ans: "",
        })
    })
    //读取下一个问题之前的答案if any
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