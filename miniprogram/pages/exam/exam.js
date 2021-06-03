wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
let grades = 0

// pages/exam/exam.js
Page({
  data: {
    id: "", //这份答卷的unique identifier
    choice: [], // 所有选择题的选项
    choice_selected: [],
    content: [], // 所有FR题的回答
    current_page_number: 0, //现在的页数
    current_page_content: [], //现在页的内容
    number_questions_per_page: [8, 7, 5, 15, 18, 10, 11, 22, 39, 7, 9, 8], //每一页多少道题
  },
   //RadioChange
   radioChange(e) {
    // 记录下来各个题目的答案
    let temp_choice_selected = this.data.choice_selected
    let temp_select = 0
    if(e.detail.value == "T"){
      temp_select = 0
    } else if (e.detail.value == "F"){
      temp_select = 1
    } else {
      temp_select = -1
    }
    // 记录答案
    temp_choice_selected[e.currentTarget.dataset.number] = temp_select
    this.setData({
      choice_selected: temp_choice_selected
    })
    console.log(this.data.choice_selected)
  },
  //FR题答案记录
  FRInput: function (e) {
    let temp_content = this.data.content
    temp_content[e.currentTarget.dataset.number] = e.detail.value
    this.setData({
      content: temp_content
    })
    console.log(this.data.content)
  },
  nextPage: function () {
    // 把答案存进数据库
    var that = this
    // for-loop 一道题一道题的存，丑陋的代码，但没有办法
    that.data.current_page_content.forEach(function(item, index, array) {
      if(that.data.current_page_content[index].grading === 1 && that.data.choice_selected[index] === 0){
        grades = grades + 1
      } else if(that.data.current_page_content[index].grading === 2 && that.data.choice_selected[index] === 1){
        grades = grades + 1
      } else if(that.data.current_page_content[index].grading === 3){
        if (that.data.choice_selected[index] === 1 || that.data.choice_selected[index] === 2){
          grades = grades + 1
        }
      }
      let dataset_number = "Answer." + (item.count - 1)
      if (item.type === "TF"){ // 如果是 TF, 没有FR答案，为None
        db.collection('CompanyGrades').doc(that.data.id).update({
          data: {
            [dataset_number]: {
              ans: "None",
              choice: that.data.choice_selected[index],
            }
          }
        })
      } else {
        if (that.data.choice_selected[index] === 0){//只有用户选择“知道”才记录答案
          db.collection('CompanyGrades').doc(that.data.id).update({ 
            data: {
              [dataset_number]: {
                ans: that.data.content[index],
                choice: that.data.choice_selected[index],
              }
            }
          })
        } else {
          db.collection('CompanyGrades').doc(that.data.id).update({
            data: {
              [dataset_number]: {
                ans: "None",
                choice: that.data.choice_selected[index],
              }
            }
          })
        }
      }

    })
    this.setData({ // 页数+1显示下一页
      current_page_number: this.data.current_page_number + 1,
      choice: [],
      choice_selected: [],
      content: [],
    })
    if(this.data.current_page_number > 12){
      db.collection('CompanyGrades').doc(this.data.id).update({
        data: {
          grade: grades,
        }
      })
      wx.navigateTo({
        url: '../result/result?id=' + this.data.id,
      })
    }
    //for(let i = 0; i < this.data.number_questions_per_page[this.data.current_page_number - 1]; ++i){
    db.collection('160Questions').where({ // 从数据库读取下一页的内容
      page: this.data.current_page_number,
    })
    .get()
    .then(res => {
      this.setData({ // 更新这一页的内容
        current_page_content: res.data,
      })
      //如果大于20条内容，再fetch一遍
      if (this.data.number_questions_per_page[this.data.current_page_number - 1] > 20){
        let temp_current_page_content = this.data.current_page_content
        db.collection('160Questions').where({ // 从数据库读取下一页的内容
          page: this.data.current_page_number,
        })
        .skip(20)
        .get()
        .then(res => {
          temp_current_page_content = temp_current_page_content.concat(res.data)
          this.setData({ // 更新这一页的内容
            current_page_content: temp_current_page_content,
          })
        }).then(res => {
          console.log(this.data.current_page_content)
          let temp_choice = []
          let temp_content = []
          let temp_choice_selected = []
          this.data.current_page_content.forEach(function(item, index, array) {
            temp_content.push("None")
            temp_choice_selected.push(2)
            if (item.type === "TF"){
              temp_choice.push([{value: 'T', name: '是'}, {value: 'F', name: '否'}, {value: '?', name: '不知道', checked: 'true'}])
            } else {
              temp_choice.push([{value: 'T', name: '知道'}, {value: '?', name: '不知道', checked: 'true'}])
            }
          })
          this.setData({
            choice: temp_choice, // 把这一页所有的选项放进choices
            content: temp_content,
            choice_selected: temp_choice_selected,
          })
        })
      } else {
        console.log(this.data.current_page_content)
        let temp_choice = []
        let temp_content = []
        let temp_choice_selected = []
        this.data.current_page_content.forEach(function(item, index, array) {
          temp_content.push("None")
          temp_choice_selected.push(2)
          if (item.type === "TF"){
            temp_choice.push([{value: 'T', name: '是'}, {value: 'F', name: '否'}, {value: '?', name: '不知道', checked: 'true'}])
          } else {
            temp_choice.push([{value: 'T', name: '知道'}, {value: '?', name: '不知道', checked: 'true'}])
          }
        })
        this.setData({
          choice: temp_choice, // 把这一页所有的选项放进choices
          content: temp_content,
          choice_selected: temp_choice_selected,
        })
      }
    })
    //}

  },
  onLoad: function (options) {
    console.log(options)
    console.log(options.id)
    this.setData({
      id: options.id,
    })
  },
})