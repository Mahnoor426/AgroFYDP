# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle
# import numpy as np
# import pandas as pd
# import logging

# app = Flask(__name__)
# CORS(app)  # Enable CORS
# logging.basicConfig(level=logging.DEBUG)  # Set logging level to debug



# # Load the trained models and other necessary objects
# with open('crop_pipeline.pkl', 'rb') as f:
#     forest_crop_model = pickle.load(f)
# with open('yield_pipeline.pkl', 'rb') as f:
#     forest_yield_model = pickle.load(f)
# with open('scaler (1).pkl', 'rb') as f:
#     scaler = pickle.load(f)
# with open('label_encoders (1).pkl', 'rb') as f:
#     label_encoders = pickle.load(f)


# # # Load the trained models and other necessary objects
# # with open('forest_crop_model.pkl', 'rb') as f:
# #     forest_crop_model = pickle.load(f)
# # with open('forest_yield_model.pkl', 'rb') as f:
# #     forest_yield_model = pickle.load(f)
# # with open('scaler.pkl', 'rb') as f:
# #     scaler = pickle.load(f)
# # with open('label_encoders.pkl', 'rb') as f:
# #     label_encoders = pickle.load(f)


# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.json
#         logging.debug(f"Received data: {data}")

#         # Validate and convert input data
#         try:
#             division_name = data['division_name']
#             district_name = data['district_name']
#             year = float(data['year'])
#             temperature_max = float(data['temperature_max'])
#             temperature_min = float(data['temperature_min'])
#             rainfall_in_mm = float(data['rainfall_in_mm'])
#             area = float(data['area'])
#             ph = float(data['ph'])
            
#         except (KeyError, ValueError) as e:
#             logging.error(f"Data validation error: {e}")
#             return jsonify({'error': f"Invalid input data: {e}"}), 400

#         # Encode the categorical variables
#         try:
#             division_name_encoded = label_encoders['Division_Name'].transform([division_name])[0]
#             district_name_encoded = label_encoders['District_Name'].transform([district_name])[0]
#         except Exception as e:
#             logging.error(f"Encoding error: {e}")
#             return jsonify({'error': f"Encoding error: {e}"}), 400

#         # Prepare the features as a DataFrame with correct column names
#         features = pd.DataFrame({
#             'Division_Name': [division_name_encoded],
#             'District_Name': [district_name_encoded],
#             'Crop_Year': [year],  # Assuming this was the original name used for year
#             'Temperature (MAX)': [temperature_max],  # Adjust based on original names
#             'Temperature (MIN)': [temperature_min],  # Adjust based on original names
#             'Rainfall': [rainfall_in_mm],  # Adjust based on original names
#             'area': [area],
#             'pH': [ph] # Adjust based on original names
#         })

#         logging.debug(f"Prepared features: {features}")

#         # Scale the features
#         try:
#             # Ensure features columns match X.columns order and names
#             features_scaled = scaler.transform(features)
#         except Exception as e:
#             logging.error(f"Scaling error: {e}")
#             return jsonify({'error': f"Scaling error: {e}"}), 400

#         # Make a prediction for the crop
#         try:
#             crop_prediction_encoded = forest_crop_model.predict(features_scaled)[0]
#             crop_prediction = label_encoders['Crop'].inverse_transform([crop_prediction_encoded])[0]
#         except Exception as e:
#             logging.error(f"Crop prediction error: {e}")
#             return jsonify({'error': f"Crop prediction error: {e}"}), 400

#         # Make a prediction for the yield
#         try:
#             yield_prediction = forest_yield_model.predict(features_scaled)[0]
#         except Exception as e:
#             logging.error(f"Yield prediction error: {e}")
#             return jsonify({'error': f"Yield prediction error: {e}"}), 400

#         return jsonify({'predicted_crop': crop_prediction, 'predicted_yield': yield_prediction})

#     except Exception as e:
#         logging.error(f"Unhandled error: {e}")
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)


# AFTER ADDING PH LOGIC MANUALLY


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle
# import numpy as np
# import pandas as pd
# import logging

# app = Flask(__name__)
# CORS(app)  # Enable CORS
# logging.basicConfig(level=logging.DEBUG)  # Set logging level to debug

# # Load the trained models and other necessary objects
# with open('crop_pipeline.pkl', 'rb') as f:
#     crop_pipeline = pickle.load(f)
# with open('yield_pipeline.pkl', 'rb') as f:
#     yield_pipeline = pickle.load(f)
# with open('scaler.pkl', 'rb') as f:
#     scaler = pickle.load(f)
# with open('label_encoders.pkl', 'rb') as f:
#     label_encoders = pickle.load(f)

# def apply_custom_rule(pH):
#     if 6.0 <= pH <= 6.3:
#         return 'rape seed'
#     elif 6.3 < pH <= 6.5:
#         return 'barley'
#     elif 6.5 < pH <= 7.0:
#         return 'wheat'
#     elif 7.0 < pH <= 7.1:
#         return 'fodder crop'
#     elif 7.1 < pH <= 7.5:
#         return 'mustard seed'
#     elif 7.5 < pH <= 8.5:
#         return 'gram'
#     else:
#         return "unknown"
    

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.json
#         logging.debug(f"Received data: {data}")

#         # Validate and convert input data
#         try:
#             division_name = data['division_name']
#             district_name = data['district_name']
#             year = float(data['year'])
#             temperature_max = float(data['temperature_max'])
#             temperature_min = float(data['temperature_min'])
#             rainfall_in_mm = float(data['rainfall_in_mm'])
#             area = float(data['area'])
#             ph = float(data['ph'])
#         except (KeyError, ValueError) as e:
#             logging.error(f"Data validation error: {e}")
#             return jsonify({'error': f"Invalid input data: {e}"}), 400

#         # Apply custom rule for pH
#         custom_rule_result = apply_custom_rule(ph)


#         if custom_rule_result == "unknown":
#             return jsonify({'predicted_crop': "No Rabi Crop grow in this pH value", 'predicted_yield': "No Yield"})


#         elif custom_rule_result != "unknown":
#             crop_prediction = custom_rule_result

#             # Define a default features_scaled for yield prediction when custom rule applies
#             features = pd.DataFrame({
#                 'Division_Name': [0],  # Placeholder value
#                 'District_Name': [0],  # Placeholder value
#                 'Crop_Year': [year],
#                 'Temperature (MAX)': [temperature_max],
#                 'Temperature (MIN)': [temperature_min],
#                 'Rainfall': [rainfall_in_mm],
#                 'area': [area],
#                 'pH': [ph]
#             })

#             logging.debug(f"Prepared features for custom rule: {features}")

#             # Scale the features
#             try:
#                 features_scaled = scaler.transform(features)
#             except Exception as e:
#                 logging.error(f"Scaling error: {e}")
#                 return jsonify({'error': f"Scaling error: {e}"}), 400

#         else:
#             # Encode the categorical variables
#             try:
#                 division_name_encoded = label_encoders['Division_Name'].transform([division_name])[0]
#                 district_name_encoded = label_encoders['District_Name'].transform([district_name])[0]
#             except Exception as e:
#                 logging.error(f"Encoding error: {e}")
#                 return jsonify({'error': f"Encoding error: {e}"}), 400

#             # Prepare the features
#             features = pd.DataFrame({
#                 'Division_Name': [division_name_encoded],
#                 'District_Name': [district_name_encoded],
#                 'Crop_Year': [year],
#                 'Temperature (MAX)': [temperature_max],
#                 'Temperature (MIN)': [temperature_min],
#                 'Rainfall': [rainfall_in_mm],
#                 'area': [area],
#                 'pH': [ph]
#             })

#             logging.debug(f"Prepared features: {features}")

#             # Scale the features
#             try:
#                 features_scaled = scaler.transform(features)
#             except Exception as e:
#                 logging.error(f"Scaling error: {e}")
#                 return jsonify({'error': f"Scaling error: {e}"}), 400

#             # Predict crop
#             try:
#                 crop_prediction_encoded = crop_pipeline.named_steps['svm_crop'].predict(features_scaled)[0]
#                 crop_prediction = label_encoders['Crop'].inverse_transform([crop_prediction_encoded])[0]
#             except Exception as e:
#                 logging.error(f"Crop prediction error: {e}")
#                 return jsonify({'error': f"Crop prediction error: {e}"}), 400

#         # Predict yield
#         try:
#             yield_prediction = yield_pipeline.predict(features_scaled)[0]
#         except Exception as e:
#             logging.error(f"Yield prediction error: {e}")
#             return jsonify({'error': f"Yield prediction error: {e}"}), 400

#         return jsonify({'predicted_crop': crop_prediction, 'predicted_yield': yield_prediction})

#     except Exception as e:
#         logging.error(f"Unhandled error: {e}")
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS
logging.basicConfig(level=logging.DEBUG)  # Set logging level to debug

# Load the trained models and other necessary objects
with open('crop_pipeline.pkl', 'rb') as f:
    crop_pipeline = pickle.load(f)
with open('yield_pipeline.pkl', 'rb') as f:
    yield_pipeline = pickle.load(f)
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)
with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

def apply_custom_rule(pH):
    if 6.0 <= pH <= 6.3:
        return 'rape seed'
    elif 6.3 < pH <= 6.5:
        return 'barley'
    elif 6.5 < pH <= 7.0:
        return 'wheat'
    elif 7.0 < pH <= 7.1:
        return 'fodder crop'
    elif 7.1 < pH <= 7.5:
        return 'mustard seed'
    elif 7.5 < pH <= 8.5:
        return 'gram'
    else:
        return "unknown"

# def adjust_yield_based_on_area(predicted_yield, area):
#     if area < 200:
#         return predicted_yield / 2
#     elif area > 500:
#         return predicted_yield * 2
#     else:
#         return predicted_yield

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        logging.debug(f"Received data: {data}")

        # Validate and convert input data
        try:
            division_name = data['division_name']
            district_name = data['district_name']
            year = float(data['year'])
            temperature_max = float(data['temperature_max'])
            temperature_min = float(data['temperature_min'])
            rainfall_in_mm = float(data['rainfall_in_mm'])
            area = float(data['area'])
            ph = float(data['ph'])
        except (KeyError, ValueError) as e:
            logging.error(f"Data validation error: {e}")
            return jsonify({'error': f"Invalid input data: {e}"}), 400

        # Apply custom rule for pH
        custom_rule_result = apply_custom_rule(ph)

        if custom_rule_result == "unknown":
            return jsonify({'predicted_crop': "No Rabi Crop grow in this pH value", 'predicted_yield': "No Yield"})

        elif custom_rule_result != "unknown":
            crop_prediction = custom_rule_result

            # Define a default features_scaled for yield prediction when custom rule applies
            features = pd.DataFrame({
                'Division_Name': [0],  # Placeholder value
                'District_Name': [0],  # Placeholder value
                'Crop_Year': [year],
                'Temperature (MAX)': [temperature_max],
                'Temperature (MIN)': [temperature_min],
                'Rainfall': [rainfall_in_mm],
                'area': [area],
                'pH': [ph]
            })

            logging.debug(f"Prepared features for custom rule: {features}")

            # Scale the features
            try:
                features_scaled = scaler.transform(features)
            except Exception as e:
                logging.error(f"Scaling error: {e}")
                return jsonify({'error': f"Scaling error: {e}"}), 400

        else:
            # Encode the categorical variables
            try:
                division_name_encoded = label_encoders['Division_Name'].transform([division_name])[0]
                district_name_encoded = label_encoders['District_Name'].transform([district_name])[0]
            except Exception as e:
                logging.error(f"Encoding error: {e}")
                return jsonify({'error': f"Encoding error: {e}"}), 400

            # Prepare the features
            features = pd.DataFrame({
                'Division_Name': [division_name_encoded],
                'District_Name': [district_name_encoded],
                'Crop_Year': [year],
                'Temperature (MAX)': [temperature_max],
                'Temperature (MIN)': [temperature_min],
                'Rainfall': [rainfall_in_mm],
                'area': [area],
                'pH': [ph]
            })

            logging.debug(f"Prepared features: {features}")

            # Scale the features
            try:
                features_scaled = scaler.transform(features)
            except Exception as e:
                logging.error(f"Scaling error: {e}")
                return jsonify({'error': f"Scaling error: {e}"}), 400

            # Predict crop
            try:
                crop_prediction_encoded = crop_pipeline.named_steps['svm_crop'].predict(features_scaled)[0]
                crop_prediction = label_encoders['Crop'].inverse_transform([crop_prediction_encoded])[0]
            except Exception as e:
                logging.error(f"Crop prediction error: {e}")
                return jsonify({'error': f"Crop prediction error: {e}"}), 400

        # Predict yield
        try:
            yield_prediction = yield_pipeline.predict(features_scaled)[0]
            # yield_prediction = adjust_yield_based_on_area(yield_prediction, area)
        except Exception as e:
            logging.error(f"Yield prediction error: {e}")
            return jsonify({'error': f"Yield prediction error: {e}"}), 400

        return jsonify({'predicted_crop': crop_prediction, 'predicted_yield': yield_prediction})

    except Exception as e:
        logging.error(f"Unhandled error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
