from os import system as sys
from time import sleep as slp
import curses
import os
import sys
def s(str):
  for letter in str:
    sys.stdout.write(letter)
    sys.stdout.flush()
    slp(0.05)
  print()
def slow(str):
  for letter in str:
    sys.stdout.write(letter)
    sys.stdout.flush()
    slp(0.005)
  print()

def cr():
		print("\033c",end="",flush=True)

def t():
	slp(1.5)
	cr()

#keep this comment or else I'll report you: made by IndyRishi and Wilke000
s("Hello! Welcome to my quiz!")
import tkinter as tk
class Application(tk.Frame):
		def __init__(self, master=None):
				super().__init__(master)
				self.master = master
				self.pack()
				self.createWidgets()
			
		def createWidgets(self):
				self.hello = tk.Button(self)
				self.hello["text"] = "Quiz Rules"
				self.hello["command"] = self.sayHello
				self.hello.pack(side="top")
			
				self.quit = tk.Button(self,text="START QUIZ",command=self.master.destroy)
				self.quit.pack(side="bottom")
		def sayHello(self):
				self.display = tk.Label(self,text="I will say the definition, you say the word lowercase, no spaces.\n If you put the wrong answer three times you go to the next question. Spelling counts.")
				self.display.pack()


root = tk.Tk()
app = Application(master=root)
app.mainloop()
scoreboardxyz = 0
s("I will say the definition, you say the word lowercase, no spaces. If you put the wrong answer three times you go to the next question. Spelling counts")
q1 = input("definition:\t\n")
if q1 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	q1 = input("definition:\t\n")
	if q1 == "word":
		s("Correct!\n")
		t()

		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		q1 = input("definition:\t\n")
		if q1 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()

q2 = input("definition:\t\n")
if q2 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q2 = input("definition:\t\n")
	if q2 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q2 = input("definition:\t\n")
		if q2 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()

q3 = input("definition::\t\n")
if q3 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q3 = input("definition::\t\n")
	if q3 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q3 = input("definition::\t\n")
		if q3 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()

q4 = input("definition:\t\n")
if q4 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
		s("Incorrect. Try again.\n")
		t()
		q4 = input("definition\t\n")
		if q4 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. Last chance!\n")
			t()
			q4 = input("definition:\t")
		if q4 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
				s("Incorrect. The correct answer was word. Next question.\n")
				t()

q5 = input("definition:\t\n")
if q5 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q5 = input("definition:\t\n")
	if q5 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q5 = input("definition:\t\n")
		if q5 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q6 = input("definition:\t\n")
if q6 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q6 = input("definition:\t\n")
	if q6 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q6 = input("definition:\t\n")
		if q6 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q7 = input("definition:\t\n")
if q7 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q7 = input("definition:\t\n")
	if q7 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q7 = input("definition:\t\n")
		if q7 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q8 = input("definition:\t\n")
if q8 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q8 = input("definition:\t\n")
	if q8 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q8 = input("definition:\t\n")
		if q8 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q9 = input("definition:\t\n")
if q9 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q9 = input("definition:\t\n")
	if q9 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q9 = input("definition:\t\n")
		if q9 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q10 = input("definition:\t\n")
if q10 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	q10 = input("definition:\t\n")
	if q10 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q10 = input("definition:\t\n")
		if q10 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()

q11 = input("definition:\t\n")
if q11 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q11 = input("definition:\t\n")
	if q11 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q11 = input("definition:\t\n")
		if q11 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q12 = input("definition:\t\n")
if q12 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q12 = input("definition:\t\n")
	if q12 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q12 = input("definition:\t\n")
		if q12 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q13 = input("definition:\t\n")
if q13 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q13 = input("definition:\t\n")
	if q13 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q13 = input("definition:\t\n")
		if q13 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q14 = input("definition:\t\n")
if q14 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q14 = input("definition:\t\n")
	if q14 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q14 = input("definition:\t\n")
		if q14 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q15 = input("definition:\t\n")
if q15 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q15 = input("definition:\t\n")
	if q15 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q15 = input("definition:\t\n")
		if q15 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q16 = input("definition:\t\n")
if q16 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q16 = input("definition:\t\n")
	if q16 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q16 = input("definition:\t\n")
		if q16 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q17 = input("definition:\t\n")
if q17 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q17 = input("definition:\t\n")
	if q17 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q17 = input("definition:\t\n")
		if q17 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q18 = input("definition:\t\n")
if q18 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q18 = input("definition:\t\n")
	if q18 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q18 = input("definition:\tt\n")
		if q18 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q19 = input("definition:\t\n")
if q19 == "word":
	s("Correct!\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
else:
	s("Incorrect. Try again.\n")
	t()
	q19 = input("definition:\t\n")
	if q19 == "word":
		s("Correct!\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
	else:
		s("Incorrect. Last chance!\n")
		t()
		q19 = input("definition:\t\n")
		if q19 == "word":
			s("Correct!\n")
			t()
			scoreboardxyz = scoreboardxyz + 1
		else:
			s("Incorrect. The correct answer was word. Next question.\n")
			t()
q20 = input("definition:\t\n")
if q20 == "word":
	s("Correct! Thank you for playing.\n")
	t()
	scoreboardxyz = scoreboardxyz + 1
	print("Your score was",scoreboardxyz,"out of 20.")
else:
	s("Incorrect. Try again.\n")
	t()
	q20 = input("definition:\t\n")
	if q20 == "word":
		s("Correct! Thank you for playing.\n")
		t()
		scoreboardxyz = scoreboardxyz + 1
		s("Your score was",scoreboardxyz,"out of 20.")
	else:
		s("Incorrect. Last chance!\n")
		t()
		q20 = input("definition:\t\n")
		if q20 == "word":
			s("Correct! Thank you  for playing.\n")
			t()
			slp(1)
			t()
			scoreboardxyz = scoreboardxyz + 1
			print("Your score was",scoreboardxyz,"out of 20.")
		else:
			s("Incorrect. The correct answer was word. Thank you for playing.\n")
			t()
			print("Your score was",scoreboardxyz,"out of 20.")

print('Made with python 3.8.2')
slow("""

          .?77777777777777$.            
          777..777777777777$+           
         .77    7777777777$$$           
         .777 .7777777777$$$$           
         .7777777777777$$$$$$           
         ..........:77$$$$$$$           
  .77777777777777777$$$$$$$$$.=======.  
 777777777777777777$$$$$$$$$$.========  
7777777777777777$$$$$$$$$$$$$.========= 
77777777777777$$$$$$$$$$$$$$$.========= 
777777777777$$$$$$$$$$$$$$$$ :========+.
77777777777$$$$$$$$$$$$$$+..=========++~
777777777$$..~=====================+++++
77777777$~.~~~~=~=================+++++.
777777$$$.~~~===================+++++++.
77777$$$$.~~==================++++++++: 
 7$$$$$$$.==================++++++++++. 
 .,$$$$$$.================++++++++++~.  
         .=========~.........           
         .=============++++++           
         .===========+++..+++           
         .==========+++.  .++           
          ,=======++++++,,++,           
          ..=====+++++++++=.    
""")