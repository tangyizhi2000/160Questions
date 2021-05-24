// pages/grades/grades.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comName: "",
    grade: "",
    dataList: []
  },

  // CNinput: function(e){
  //   this.setData({
  //     comName: e.detail.value
  //   });
  // },

  // onQuery: function(value){
  //   this.setData({
  //     comName: value
  //   })
  //   var that = this
  //   const dbg = db.collection('CompanyGrades');
  //   console.log("你要查询的是："+this.data.comName);
  //   dbg.where({Company_Name:that.data.comName}).get({
  //     success: res => {
  //       console.log("找到数据库中成绩为："+res.data[0].G);
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon:'none',
  //         title:'查询失败'
  //       });
  //       console.error("未找到匹配成绩");
  //     }
  //   });
  // },

  /**
   *  查询所输入的公司名称成绩
   */
  search: function (value) {
    return new Promise((resolve, reject) => {
      let result = []
      wx.cloud.callFunction({
        name: "fuzzySearch",
        data: {
          value: value
        }
      }).then(res => {
        let array = res.result.data
        let temp = []
        array.forEach(element => {
          temp.push(element.Company_Name)
        });
        temp = temp.filter((v, i, a) => a.indexOf(v) === i);
        temp.forEach(element => {
          result.push({text: element})
        })
        if (result.length == 0) {
          result = [{ text: "未找到结果" }]
        }
        resolve(result)
      })
    })
  },

  /**
   *  用户选择搜索结果
   */
  selectResult: function (e) {
    console.log('select result', e.detail)
  },

  /**
   *  数据库中从第page+1个数据开始，显示num个成绩
   */
  displayGrades: function (num = 1, page = 0) {
    wx.cloud.callFunction({
      name: "getNumGrades",
      data: {
        num: num,
        page: page
      }
    }).then(res => {
      var oldData = this.data.dataList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        dataList: newData
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.displayGrades(1, 0);
    this.setData({
      search: this.search.bind(this)
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
    var page = this.data.dataList.length
    this.displayGrades(1, page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})