from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
from tensorflow.keras.models import load_model 
from tensorflow.keras.preprocessing import image
import numpy as np
import io
import json

app = Flask(__name__)
CORS(app)
# Load your .h5 model file
model = tf.keras.models.load_model('food21.hdf5')

# Load recipe data from the recipedata.json file
with open('recipedata.json', 'r') as file:
    recipedata = json.load(file)
print("Inside backend")

@app.route('/predict', methods=['POST'])
def predict():
    print("triggered")
    if 'imageFile' not in request.files:
        return "No file part", 400
    try:
        print("trying")
        # Get the image file from the request
        image_file = request.files['imageFile']
        print("got the image")
        # Load and preprocess the image
    #     try:
    #         img = image.load_img(image_file, target_size=(224, 224))
    # # Rest of your image processing code
    #     except Exception as e:
    #         print("An error occurred during image processing:", str(e))

    #     img = image.load_img(image_file, target_size=(224, 224))  # Adjust target size as needed

        img_bytes = image_file.read()
        img = Image.open(io.BytesIO(img_bytes))

        # Resize the image to the target size
        img = img.resize((224, 224))  # Adjust target size as needed

        print("1") 
        img_array = image.img_to_array(img)
        print("2") 
        img_array = np.expand_dims(img_array, axis=0)
        print("3") 
        img_array /= 255.  # Normalize the image data
        print("pre processed")

        # Make predictions
        predictions = model.predict(img_array)
        print("I think Predictions are done")
        # Decode the predictions (specific to your problem)
        # Example: Get the class with the highest probability
        # class_labels = ['Apple Pie', 'class2', 'pizza']  # Update with your class labels
        class_labels = ['APPLE_PIE',
 'BABY_BACK_RIBS',
 'BAKLAVA',
 'BEEF_CARPACCIO',
 'BEEF_TARTARE',
 'BEET_SALAD',
 'BEIGNETS',
 'BIBIMBAP',
 'BREAD_PUDDING',
 'BREAKFAST_BURRITO',
 'BRUSCHETTA',
 'CAESAR_SALAD',
 'CANNOLI',
 'CAPRESE_SALAD',
 'CARROT_CAKE',
 'CEVICHE',
 'CHEESECAKE',
 'CHEESE_PLATE',
 'CHICKEN_CURRY',
 'CHICKEN_QUESADILLA']
        print(class_labels)
        predicted_class = class_labels[np.argmax(predictions)-1]
        print(predicted_class)
        return jsonify({'prediction': predicted_class})
    except Exception as e:
        print("OH NO")
        return jsonify({'error': str(e)})
    
@app.route('/get-recipe', methods=['POST'])
def get_recipe():
    try:
        data = request.form
        prediction = data.get('prediction', '').strip()

        if prediction in recipedata:
            recipe = recipedata[prediction]
            return jsonify({"recipe": recipe})
        else:
            return jsonify({"error": "Recipe not found"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
