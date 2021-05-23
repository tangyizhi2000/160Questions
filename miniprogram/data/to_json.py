# convert 160 questions to json format
# then we can put it into our database
import json

file = open("160.txt", "r")
i = 1

with open("160.json", 'a', encoding='utf-8') as f:
	for line in file.readlines():
		temp_dict = {}
		temp_dict['question'] = line.strip()
		temp_dict['type'] = 'TF'
		temp_dict['count'] = i
		i = i + 1
		json.dump(temp_dict, f, ensure_ascii=False)