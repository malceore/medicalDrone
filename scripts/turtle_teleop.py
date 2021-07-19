#!/usr/bin/env python
import rospy
from geometry_msgs.msg import Twist
import sys, select, termios, tty
# rostopic pub -1 //differ_drive_controller/cmd_vel geometry_msgs/Twist '[-22.0, 0.0, 0.0]' '[0.0, 0.0, 0.0]'
twist = Twist()
last_twist = None
msg = """
Reading from the keyboard and publishing to /command!
---------------------------
Moving around:
i
j k l
,
CTRL-C to quit
"""

def talker():
	global twist
	global last_twist
        last_twist=twist
	#pub = rospy.Publisher('cmd_vel', Twist, queue_size=1)
	pub = rospy.Publisher('/turtle1/cmd_vel', Twist, queue_size=1)
	rospy.init_node('keyb_commander', anonymous=True)
	rate = rospy.Rate(10) # 10hz
	print(msg)
	while not rospy.is_shutdown():
                last_k = None
		key_timeout = 0.6 # Seconds
		k = getKey(key_timeout)
		if k == "i":
			print('forward')
                        twist.linear.x = +1
		elif k == ",":
			print('backward')
                        twist.linear.x = -1
		elif k == "j":
			print('left')
                        twist.angular.z = -1
		elif k == "l":
			print('right')
                        twist.angular.z = 1
		elif k == "k":
			print('stop')
                        twist.linear.x = 0
                        twist.angular.z = 0
		elif k == '\x03': # To detect CTRL-C
			break
		if k != last_k:
                        print("publishing!")
			last_k = k
			pub.publish(twist)
			rate.sleep()

def getKey(key_timeout):
	tty.setraw(sys.stdin.fileno())
	rlist, _, _ = select.select([sys.stdin], [], [], key_timeout)
	if rlist:
		key = sys.stdin.read(1)
	else:
		key = ''
	termios.tcsetattr(sys.stdin, termios.TCSADRAIN, settings)
	return key

if __name__ == '__main__':
	settings = termios.tcgetattr(sys.stdin)
try:
	talker()
except rospy.ROSInterruptException:
	pass

