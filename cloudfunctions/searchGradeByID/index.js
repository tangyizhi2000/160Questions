// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
// event.id: id of the grade
exports.main = async (event, context) => {
  let id = event.id
  return await db.collection("CompanyGrades").where({ _id: id }).get()
}