// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
// event.num: number of results to return
// event.page: number of results to skip
exports.main = async (event, context) => {
  var num = event.num;
  var page = event.page;
  return await db.collection("CompanyGrades").skip(page).limit(num).get()
}