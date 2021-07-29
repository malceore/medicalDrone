#!/usr/bin/env python3
import rospy
from std_msgs.msg import String
received_command = ''
last_received_command = ''

def listener():
	rospy.init_node('motor_driver', anonymous=True)
	rospy.Subscriber('/command', String, commandCallback)
	rospy.spin()

def commandCallback(message):
	global received_command
	global last_received_command
	received_command = message.data
	if received_command == 'forward':
		forward()
	elif received_command == 'backward':
		backward()
	elif received_command == 'left':
		left()
	elif received_command == 'right':
		right()
	elif received_command == 'stop':
		stopMotors()
	else:
		print('Unknown command!')
	if received_command != last_received_command:
		print('Received command: ' + received_command)
		last_received_command = received_command

def stopMotors():
	# Here goes the code for stopping the motors
	pass

def forward():
	# Here goes the code for driving the motors forward
	pass

def backward():
	# Here goes the code for driving the motors backward
	pass

def left():
	# Here goes the code for driving the motors left
	pass

def right():
	# Here goes the code for driving the motors right
	pass

if __name__ == '__main__':
	print('Ready to receive commands!')
	listener()
	print('Node is shutting down, stopping motors')
	stopMotors()
