#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created by Ashish Patel
Copyright © 2017 ashish.me
ashishsushilpatel@gmail.com
"""

"""
Given the meal price (base cost of a meal), tip percent (the percentage of the meal price being added as tip),
and tax percent (the percentage of the meal price being added as tax) for a meal, find and print the meal's total cost.
"""

if __name__ == "__main__":
    meal_cost = float(input().strip())
    tip_percent = int(input().strip())
    tax_percent = int(input().strip())

    tip = meal_cost * (tip_percent / 100)
    tax = meal_cost * (tax_percent / 100)
    total_cost = meal_cost + tip + tax
    print("The total meal cost is {0} dollars.".format(int(round(total_cost))))
