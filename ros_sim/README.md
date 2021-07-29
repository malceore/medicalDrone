## Medical Drone
Basic idea is to recreate Zipline's remote drone air drop medical supplies in Gazebo using ROS. A team project by Brandon Wood, Mitch Sozio and Oswald Jones.

## Getting Started
Please start by installed ros-desktop-full and Gazebo simulator. Then download this directory into your catkin workspace's src directory and from root workspace run 'catkin_make'.

## Launch Commands
To launch an empty Gazebo simulation world(Note, all my simulations start paused for performance considerations): roslaunch medicalDrone empty_world.launch

To spawn our drone into your simulation run: roslaunch medicalDrone drone.launch

## Running turtle launch
To output a 2d user interface with a turtle please run the below commands, it sohuld output keys that you canuse to control the velocity of the turtle.
roslaunch medicalDrone turtle_teleop.launch
