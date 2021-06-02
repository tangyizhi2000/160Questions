wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command

async function fuzzySearch(value) {
  if (value == "") {
    return await db.collection("CompanyGrades").where({
      Company_Name: value
    }).get()
  } else {
    return await db.collection("CompanyGrades").where({
      Company_Name: {
        $regex: '.*' + value,
        $options: 'i'
      }
    }).get()
  }
}

async function getNumGrades(num, page, name) {
  if (name == "") {
    return await db.collection("CompanyGrades").skip(page).limit(num).get()
  } else {
    return await db.collection("CompanyGrades").where({ Company_Name: name }).orderBy("time", "desc").skip(page).limit(num).get()
  }
}
module.exports.fuzzySearch = fuzzySearch
module.exports.getNumGrades = getNumGrades