wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    ans_C: [[]], //分了类的答案
    percentage: 0,
    questions: [[]],
    categories: [],
    numCategory: 0,
    QaA: [[]]
  },

  /**
   * 读取所有题目
   */
  loadQuestions: async function (id) {
    const MAX_LIMIT = 20
    const countResult = await db.collection('160Questions').count()
    const total = countResult.total
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('160Questions').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 把所有题目分类，存储
   */
  onLoad: function (options) {
    let id = options.id
    db.collection("CompanyGrades").where({ _id: id }).get().then(res => {
      this.setData({
        data: res.data[0],
        percentage: (res.data[0].grade / 159 * 100).toFixed(2),
      })
      this.loadQuestions(id).then(res => {
        let questions = []
        let categories = []
        for (let i = 0; i < res.data.length; i++) {
          let q = res.data[i].question
          let c = res.data[i].category
          questions.push({ question: q, category: c })
          categories.push(res.data[i].category)
        }
        let uniqueCategories = [...new Set(categories)]
        this.setData({
          categories: uniqueCategories,
          numCategory: uniqueCategories.length,
        })
        for (let i = 0; i < this.data.numCategory; i++) {
          let q = []
          for (let j = 0; j < questions.length; j++) {
            if (questions[j].category === this.data.categories[i]) {
              q.push(questions[j].question)
            }
          }
          let key = 'questions[' + i + ']'
          this.setData({
            [key]: q,
          })
        }
        let count = 0
        let temp = [[]]
        for (let j = 0; j < this.data.numCategory; j++) {
          temp[j] = []
          for (let k = 0; k < this.data.questions[j].length; k++) {
            temp[j].push(this.data.data.Answer[count])
            count++
          }
        }
        this.setData({
          ans_C: temp
        })
        temp = [[]]
        for (let i = 0; i < this.data.numCategory; i++) {
          temp[i] = []
          for (let j = 0; j < this.data.ans_C[i].length; j++) {
            let q = this.data.questions[i][j]
            let a = this.data.ans_C[i][j]
            temp[i].push({question: q, answer: a})
          }
        }
        this.setData({
          QaA: temp,
        })
        console.log(this.data.QaA)
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