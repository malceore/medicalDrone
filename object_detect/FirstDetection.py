from imageai.Detection import ObjectDetection
import os

input_image_file = "houses_and_tractors_west_virginia_coal_mtn_top.png"
input_model_file = "resnet50_coco_best_v2.1.0.h5"
output_image_file = "output_image.jpg"

execution_path = os.getcwd()

detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , input_model_file))
detector.loadModel()
detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , input_image_file), output_image_path=os.path.join(execution_path , output_image_file))

for eachObject in detections:
    print(eachObject["name"] , " : " , eachObject["percentage_probability"] )