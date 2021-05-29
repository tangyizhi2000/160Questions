// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
// event.num: number of results to return
// event.page: number of results to skip
// event.name: name of the company
exports.main = async (event, context) => {
  var num = event.num;
  var page = event.page;
  var name = event.name;
  console.log(event)
  if (name == "") {
    return await db.collection("CompanyGrades").skip(page).limit(num).get()
  } else {
    return await db.collection("CompanyGrades").where({ Company_Name: name }).orderBy("time", "desc").skip(page).limit(num).get()
  }
}