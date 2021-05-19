// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
  },
  gotoExam: function(){
    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  },
  gotoGrades: function(){
    wx.navigateTo({
      url: '/pages/grades/grades',
    })
  }
})
