## Medical Drone

Basic idea is to recreate Zipline's remote drone air drop medical supplies in Gazebo using ROS. A team project by Brandon Wood and Oswald Jones.

## Getting Started

Please start by installed ros-desktop-full and Gazebo simulator. Then download this directory into your catkin workspace's src directory and from root workspace run 'catkin_make'.

## Launch Commands

To launch an empty Gazebo simulation world(Note, all my simulations start paused for performance considerations):

To launch a simulation populated by randomly distributed soda cans run(Note, in my experience Gazebos model server is broken, but you can download the models locally and place them in the Gazebo model directory): roslaunch medicalDrone soda_cans.launch

To spawn a two wheeled robot into your simulation run: roslaunch medicalDrone two_wheeled.launch
