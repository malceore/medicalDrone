# Object Detect

Code taken from here: https://towardsdatascience.com/object-detection-with-10-lines-of-code-d6cb4d86f606

This python script takes an input image file and marks any detected objects using YOLO open source library.

## Install

To run script you must first install these requirements. 

Python 3.7 is required because 3.8 is not supported by TensorFlow. Once you know your `python --version` is a 3.7.x version you can run these 3 pip installations:

```pip install tensorflow==2.4.0```

```pip install keras==2.4.3 numpy==1.19.3 pillow==7.0.0 scipy==1.4.1 h5py==2.10.0 matplotlib==3.3.2 opencv-python keras-resnet==0.2.0```

```pip install imageai --upgrade```

## Run
Make sure FirstDetection.py is referencing the image file you want to process. Then run:

```python FirstDetection.py```

A new image with any discovered annotations will be generated as the designated output image file defined in FirstDetection.py script.