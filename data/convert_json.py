import pandas as pd 
import json 


structured_field_data = [
    {"name": "Writing Stage", "category": "task"},
    {"name": "Writing Context", "category": "task"},
    {"name": "Purpose", "category": "task"},
    {"name": "Specificity", "category": "task"},
    {"name": "Audience", "category": "task"},
    {"name": "Demographic Profile - Design", "category": "user"},
    {"name": "Demographic Profile - Evaluation", "category": "user"},
    {"name": "System Output Preferences - Design", "category": "user"},
    {"name": "System Output Preferences - Evaluation", "category": "user"},
    {"name": "Relationship to System - Design", "category": "user"},
    {"name": "Relationship to System - Evaluation", "category": "user"},
    {"name": "User Capabilities - Design", "category": "user"},
    {"name": "User Capabilities - Evaluation", "category": "user"},
    {"name": "Data - Source", "category": "technology"},
    {"name": "Data - Size", "category": "technology"},
    {"name": "Model - Type", "category": "technology"},
    {"name": "Model - External Resource Access", "category": "technology"},
    {"name": "Learning - Problem", "category": "technology"},
    {"name": "Learning - Algorithm", "category": "technology"},
    {"name": "Learning - Training and Adaptation", "category": "technology"},
    {"name": "Evaluation - Evaluator", "category": "technology"},
    {"name": "Evaluation - Focus", "category": "technology"},
    {"name": "Scalability", "category": "technology"},
    {"name": "User - Steering the System", "category": "interaction"},
    {"name": "User - Integrating System Output", "category": "interaction"},
    {"name": "UI - Interface Paradigm", "category": "interaction"},
    {"name": "UI - Layout", "category": "interaction"},
    {"name": "UI - Visual Differentiation", "category": "interaction"},
    {"name": "UI - Interaction Metaphor", "category": "interaction"},
    {"name": "UI - Initiation", "category": "interaction"},
    {"name": "System - Output Type", "category": "interaction"},
    {"name": "System - Curation Type", "category": "interaction"},
    {"name": "System - User Data Access", "category": "interaction"},
    {"name": "Digital Infrastructure", "category": "ecosystem"},
    {"name": "Social Factors", "category": "ecosystem"},
    {"name": "Locale", "category": "ecosystem"},
    {"name": "Access Model", "category": "ecosystem"},
    {"name": "Norms & Rules", "category": "ecosystem"},
    {"name": "Change Over Time", "category": "ecosystem"},
]


df = pd.read_csv("annotated_papers.csv")

necessary_fields = ['Paper', 'URL', 'Year']
other_fields = [ele for ele in df.columns if ele not in necessary_fields]

for field in other_fields:
    df[field] = df[field].apply(lambda x: [ele.strip() for ele in x.split(",")] if isinstance(x, str) else [])

for field in structured_field_data:
    all_values = list(set(sum(df[field['name']].dropna().tolist(), [])))
    field['values'] = [{"value": ele, "label": ele} for ele in all_values]

df['ID'] = [f"{i}" for i in range(len(df))]
df.to_json("../src/app/papers/papers.json", orient="records", indent=4)

with open("../src/app/papers/structured_fields.json", "w") as f:
    json.dump(structured_field_data, f, indent=4)