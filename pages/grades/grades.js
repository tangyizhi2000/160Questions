// pages/grades/grades.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    comName:"",
    grade:""
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
  /**
   *  查询所输入的公司名称成绩
   */
  CNinput: function(e){
    this.setData({
      comName: e.detail.value
    });
  },
  onQuery: function(){
    var that = this
    const db= wx.cloud.database();
    const dbg = db.collection('CompanyGrades');
    console.log("你要查询的是："+this.data.comName);
    dbg.where({Company_Name:that.data.comName}).get({
      success: res => {
        console.log("找到数据库中成绩为："+res.data[0].G);
      },
      fail: err => {
        wx.showToast({
          icon:'none',
          title:'查询失败'
        });
        console.error("未找到匹配成绩");
      }
      
    });
    
  }
})