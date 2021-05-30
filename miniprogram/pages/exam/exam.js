wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
let next_question = ""
let next_type = ""

// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    //TrueFalse题Radio
    TF: [
      { value: 'T', name: '是' },
      { value: 'F', name: '否' },
      { value: '?', name: '不知道', checked: 'true' },
    ],
    //FreeResponse题Radio
    FR: [
      { value: 'T', name: '知道' },
      { value: '?', name: '不知道', checked: 'true' },
    ],
    //目前题目题号
    current_question_number: 0,
    //目前题目本身
    current_question: "使用说明: 点击按钮后，上一个题目的答案会被保存",
    //题目类型，TF / FR
    current_type: "",
    //FR题答案
    FR_ans: "",
    //选择选项
    choice: -1,
    //判分规则
    grading: 1
  },
  //TF题RadioChange
  TFChange(e) {
    console.log('TF: radio发生change事件，携带value值为：', e.detail.value)
    //将选择选项存储
    this.setData({
      choice: e.detail.value
    })
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
    //将选择选项存储
    this.setData({
      choice: e.detail.value
    })
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
    console.log(options)
    console.log(options.id)
    this.setData({
      id: options.id,
    })
  },

  nextQuestion: function () {
    //TODO: 储存当前问题答案，覆盖之前的答案
    // 存储答案
    let currCount = this.data.current_question_number
    if (currCount != 0) {
      let answer = "Answer." + (currCount - 1)
      let type = this.data.current_type
      let count = currCount
      let r = this.data.choice
      console.log(r)
      let choice = -1
      let grade = 0
      if (r == "T") {
        choice = 1
      } else if (r == "?") {
        choice = -1
      } else {
        choice = 2
      }
      console.log(choice)
      let grading = this.data.grading
      if (grading == 0) {
        grade = 1
      } else if (grading == 1 && choice == 1) {
        grade = 1
      } else if (grading == 2 && choice == 2) {
        grade = 1
      }
      console.log(grade)
      db.collection('CompanyGrades').doc(this.data.id).update({
        data: {
          [answer]: {
            ans: this.data.FR_ans,
            choice: choice,
            count: count,
            type: type
          },
          grade: _.inc(grade),
        }
      })
    }
    // 答完了，跳转结果页
    currCount += 1
    if (currCount > 159) {
      wx.navigateTo({
        url: '../result/result?id=' + this.data.id,
      })
    } else {
      //读取下一个问题的题目
      // 获取题目
      db.collection('160Questions').where({
        count: currCount
      }).get().then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        next_question = res.data[0]['question']
        next_type = res.data[0]['type']
        let grading = res.data[0]['grading']
        this.setData({
          current_question_number: this.data.current_question_number + 1,
          current_question: next_question,
          current_type: next_type,
          FR_ans: "",
          grading: grading,
        })
      })
    }

    //TODO: 读取下一个问题之前的答案if any，并显示到上面
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