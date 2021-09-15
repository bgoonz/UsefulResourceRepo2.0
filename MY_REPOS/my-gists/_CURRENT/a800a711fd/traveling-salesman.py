#!/usr/bin/python
import string
import math
import random
from xmlrpc.client import MAXINT

cityNum = None
cityArr = []
actions = []
builtStates = []



class State :
    name = ""
    visited = 0

class Action :
    act = ""

class Problem :

    def input(self) :
        global cityNum
        global cityArr
        global builtStates
        cityNum = int(input('Enter number of cities: '))

        mylist =[]
        for n in range (0,cityNum) :
            x = input('Enter the %d line : ' % n)
            y=x.split()
            mylist.append(y)

        cityArr=mylist

    def initial(self):
        global cityNum
        global builtStates
        list=[]
        s = ""
        for i in range (0,int(cityNum)):
          s += str(i)

        initialState=State()
        initialState.name=s
        list.append(initialState)
        builtStates=list
        return initialState

    def actions(self,state):
        global actions
        global cityNum
        global builtStates
        if len(actions) == 0 :
            list = []
            global cityNum
            for i in range (0,cityNum) :
                for j in range (0,cityNum) :
                    if(i<j) :
                        newAct=Action()
                        newAct.act =str(i) + str(j)
                        list.append(newAct)
            actions=list[:]
            return actions
        else :
            return actions


    def randomAction(self,state):
        global actions
        global cityNum
        global builtStates
        a=0
        b=0
        while(a==b):
            a=int(random.random() *cityNum)
            b=int(random.random()*cityNum)

        newStr=str(a)+str(b)
        randAct=Action()
        randAct.act=newStr
        return randAct

    def randomState(self):
        global cityNum
        randStr=""

        data=random.sample(range(0, cityNum), cityNum )
        random.shuffle(data)
        for datum in data :
            randStr += str(datum)

        randState=State()
        randState.name = randStr
        return randState

    def result (self,state ,action) :
        global builtStates
        global cityNum
        global cityArr
        first=action.act[0]
        second=action.act[1]

        oldstr=state.name
        newstr=""

        for i in range (0,len(oldstr)):
            if(i==int(first)):
                newstr+=oldstr[int(second)]
            elif (i==int(second)):
                newstr += oldstr[int(first)]
            else :
                newstr+=oldstr[i]

        for x in builtStates:
            if x.name==newstr :
                return x

        resultState=State()
        resultState.name=newstr
        builtStates.append(resultState)
        return resultState


    # def stepCost(state,action):

    # def pathCost(state,action):
    #
    #
    # def goalTest(state):
    #



    def heuristic(self,state):
        global cityArr
        global cityNum
        stateValue=0
        for i in range (0,len(state.name)-1):
            stateValue = stateValue + int(cityArr[int(state.name[i])][int(state.name[i+1])])

        stateValue = stateValue + int(cityArr[int(state.name[len(state.name)-1])][int(state.name[0])])

        return stateValue
