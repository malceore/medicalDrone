cmake_minimum_required(VERSION 3.2.2)
project(medicalDrone)

## Add support for C++11, supported in ROS Kinetic and newer
add_definitions(-std=c++11)

find_package(catkin REQUIRED COMPONENTS
  urdf
  rospy
  gazebo_ros
)
catkin_package(
  DEPENDS
    rospy
    gazebo_ros
)

link_directories(${GAZEBO_LIBRARY_DIRS})

include_directories(
  ${catkin_INCLUDE_DIRS}
  ${GAZEBO_INCLUDE_DIRS}
  
)

catkin_install_python(PROGRAMS 
  scripts/command_node.py scripts/drive_node.py scripts/two_wheel_driver.py
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

