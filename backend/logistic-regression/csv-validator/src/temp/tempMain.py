import pandas as pd
from flask import Flask
from pandas import CategoricalDtype
from sklearn.model_selection import train_test_split

#  __name__ means this current file
app = Flask(__name__)

pd.set_option('display.max_rows', None)

col_list = ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC",
            "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS", "NObeyesdad"]
df = pd.read_csv('../../../../../csvData/obesity.csv', usecols=col_list, index_col=False)
gender_type = CategoricalDtype(categories=['Female', 'Male'], ordered=True)
family_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
FAVC_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
CAEC_type = CategoricalDtype(categories=['no', 'Sometimes', 'Frequently', 'Always'], ordered=True)
SMOKE_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
SCC_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
CALC_type = CategoricalDtype(categories=['no', 'Sometimes', 'Frequently', 'Always'], ordered=True)
MTRANS_type = CategoricalDtype(categories=['Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking'], ordered=True)
NObeyesdad_type = CategoricalDtype(categories=['Insufficient_Weight', 'Normal_Weight', 'Overweight_Level_I', 'Overweight_Level_II', 'Obesity_Type_I', 'Obesity_Type_II', 'Obesity_Type_III'], ordered=True)

df["Gender"] = df["Gender"].astype(gender_type).cat.codes
df["family_history_with_overweight"] = df["family_history_with_overweight"].astype(family_type).cat.codes
df["FAVC"] = df["FAVC"].astype(FAVC_type).cat.codes
df["CAEC"] = df["CAEC"].astype(CAEC_type).cat.codes
df["SMOKE"] = df["SMOKE"].astype(SMOKE_type).cat.codes
df["SCC"] = df["SCC"].astype(SCC_type).cat.codes
df["CALC"] = df["CALC"].astype(CALC_type).cat.codes
df["MTRANS"] = df["MTRANS"].astype(MTRANS_type).cat.codes
# d = dict(enumerate(df["Gender"].astype("category").cat.categories))
# print(d)
df["NObeyesdad"] = df["NObeyesdad"].astype(NObeyesdad_type).cat.codes

X = df[["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC", "SMOKE",
        "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS"]]
Y = df[['NObeyesdad']]

X_train, X_test, y_train, y_test = train_test_split(X, Y.values.ravel(), test_size=0.01)

X_test_new = [['Female', 22, 1.7, 65, 'no', 'no', 5, 4, 'Sometimes', 'no', 2, 'yes', 3, 8, 'Frequently', 'Bike']]
col_list_new = ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC",
            "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS"]
df_new = pd.DataFrame(data=X_test_new, columns=col_list_new)
df_new["Gender"] = df_new["Gender"].astype(gender_type).cat.codes
df_new["CALC"] = df_new["CALC"].astype(CALC_type).cat.codes
print(df_new)
print(df_new['Gender'].eq(-1).any())
# LogReg = LogisticRegression(max_iter=10000, solver='saga')
# LogReg.fit(X_train, y_train)
# y_pred = LogReg.predict(X_test)
# print(y_pred)
# print(y_test)

#  when start script, python assigns the __main__ to the script executed
# if __name__ == "__main__":
#    app.run(host='0.0.0.0', debug=True, port=5000)
