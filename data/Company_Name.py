# the structure of Company_Name database
import json

file = open("database_export-IEWlZWcJIr7E.json", "r")
i = 1

with open("Company_Name.txt", 'a', encoding='utf-8') as f:
	for line in file.readlines():
		data = json.dumps(line, ensure_ascii=False)

		structure = {}
		structure['count'] = i
		i = i + 1
		if "TF" in data:
			structure['type'] = 'TF'
			structure['choice'] = -1
			structure['ans'] = 'None'
		if "FR" in data:
			structure['type'] = 'FR'
			structure['choice'] = -1
			structure['ans'] = ''


		f.write(json.dumps(structure))
		f.write(',')